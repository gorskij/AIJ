import './App.css';
import React, {useState} from 'react';
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import {onBuy, Product} from "./components/products/ProductsTypes";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CartProduct, OnCreateOrder} from "./components/cart/CartTypes";

const categories = ["Wszystkie", "Kategoria1", "Kategoria2"];

const products: Product[] = [
    {
        id: "0",
        category: "Kategoria1",
        name: "Testowy produkt 0",
        description: "aaa",
        price: "5",
    },
    {
        id: "1",
        category: "Kategoria1",
        name: "Testowy produkt 1",
        description: "Testowy opis Testowy opis Testowy opis Testowy opis Testowy opis",
        price: "100",
    },
    {
        id: "2",
        category: "Kategoria1",
        name: "Testowy produkt 2",
        description: "aaa",
        price: "5",
    },
    {
        id: "3",
        category: "Kategoria1",
        name: "Testowy produkt 3",
        description: "aaa",
        price: "5",
    },
    {
        id: "4",
        category: "Kategoria1",
        name: "Testowy produkt 4",
        description: "aaa",
        price: "5",
    },
    {
        id: "5",
        category: "Kategoria1",
        name: "Testowy produkt 5",
        description: "aaa",
        price: "5",
    },
    {
        id: "6",
        category: "Kategoria1",
        name: "Testowy produkt 6",
        description: "aaa",
        price: "5",
    },
    {
        id: "7",
        category: "Kategoria1",
        name: "Testowy produkt 7",
        description: "vjjfvd fdvdfjk vfdvddvf",
        price: "5",
    },
    {
        id: "8",
        category: "Kategoria1",
        name: "Testowy produkt 8",
        description: "aaa",
        price: "5",
    },
    {
        id: "9",
        category: "Kategoria1",
        name: "Testowy produkt 9",
        description: "vjjfvd fdvdfjk vfdvddvf",
        price: "5",
    },
    {
        id: "10",
        category: "Kategoria1",
        name: "Testowy produkt 10",
        description: "aaa",
        price: "5",
    },
    {
        id: "11",
        category: "Kategoria1",
        name: "Testowy produkt 7",
        description: "vjjfvd fdvdfjk vfdvddvf",
        price: "5",
    },
];

function App() {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const addToCart: onBuy = (name, id, price, amount) => {
        const newProduct: CartProduct = {id, name, price: parseInt(price), amount};
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
        const res = {
            status: 200,
            message: "Order created successfully.",
        };

        if (res.status !== 200)
            return Promise.resolve({
                status: res.status,
                message: res.message,
            });

        setCartProducts([]);
        return Promise.resolve({
            status: res.status,
            message: res.message,
        });
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
