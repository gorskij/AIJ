import './App.css';
import React, { useState, useEffect } from 'react';
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Order from "./components/order/Order";  // Import the Order component
import { onBuy, Product } from "./components/products/ProductsTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProduct, OnCreateOrder } from "./components/cart/CartTypes";
import { StatusCodes } from 'http-status-codes';

function App() {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/categories')
            .then(response => response.json())
            .then(data => setCategories(data.map((category) => category.name)))
            .catch(error => console.error('Error fetching categories:', error));

        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));

        fetch('http://localhost:8080/orders')
            .then(response => response.json())
            .then(data => setAllOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const addToCart: onBuy = (name, id, price, amount) => {
        const newProduct: CartProduct = { id, name, price: parseInt(price), amount };
        const productIndex = cartProducts.findIndex((product) => product?.id === id);

        if (productIndex === -1)
            setCartProducts([...cartProducts, newProduct]);
        else
            cartProducts[productIndex].amount += 1;

        toast.success(name + " dodany!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const onCreateOrder: OnCreateOrder = (products, customerData) => {
        const orderData = {
            userName: customerData.name,
            approvalDate: new Date().toISOString(),
            email: customerData.email,
            phoneNumber: customerData.phoneNumber,
            orderStatus: "NIEZATWIERDZONE",
            products: products.map((product) => ({
                productId: product.id,
                quantity: product.amount,
            })),
        };

        return fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === StatusCodes.CREATED) {
                    setCartProducts([]);
                    toast.success("Order created successfully!", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error(`Failed to create order: ${data.message}`, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

                return {
                    status: data.status,
                    message: data.message,
                };
            })
            .catch(error => {
                console.error('Error creating order:', error);
                toast.error('Error creating order', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                return {
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error',
                };
            });
    };

    return (
        <div className="App">
            <ToastContainer />
            <Cart products={cartProducts} onCreateOrder={onCreateOrder} />
            <div className="centering-div">
                <Products
                    title={"Produkty"}
                    headerRow={["Nazwa", "Opis", "Cena"]}
                    products={products}
                    categories={["Wszystkie", ...categories]}
                    onBuy={addToCart}
                />
            </div>

            {/* Display the Order component */}
            <div className="centering-div">
                <Order orders={allOrders} />
            </div>
        </div>
    );
}

export default App;
