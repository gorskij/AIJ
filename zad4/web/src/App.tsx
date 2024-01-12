import './App.css';
import React, {useState} from 'react';
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import {OnProductBuy, Product} from "./components/products/ProductsTypes";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CartProduct, OnCreateOrder} from "./components/cart/CartTypes";

const categories = ["Wszystkie", "Kategoria1", "Kategoria2"];

const products: Product[] = [
    {
        id: "1",
        category: "Kategoria1",
        name: "Testowy produkt",
        description: "Testowy opis Testowy opis Testowy opis Testowy opis Testowy opis",
        price: "100",
    },
    {
        id: "2",
        category: "Kategoria1",
        name: "Testowy produkt 2",
        description: "aaa",
        price: "5",
    }
];
function App() {
    const [cartProducts, setCartProducts] = useState<CartProduct[] >([]);
    const addToCart: OnProductBuy = (name, id, price, amount) => {
        const newProduct: CartProduct = {id, name, price: parseInt(price), amount};
        const productIndex = cartProducts.findIndex((product) => product.id === id);
        if(productIndex === -1)
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
        console.log(products);
        console.log(customerData);
        return {
            status: 200,
            message: "Order created successfully.",
        };
    }

    return (
        <div className="App">
            <ToastContainer/>
            <Cart products={cartProducts} onCreateOrder={onCreateOrder}/>
            <div className="centering-div">
                <Products title={"Produkty"} headerRow={["Nazwa", "Opis", "Cena"]} products={products}
                          categories={categories} onBuy={addToCart}/>
            </div>
        </div>

    );
}

export default App;
