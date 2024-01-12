import './App.css';
import React, {useState} from 'react';
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import {onProductBuy, Product} from "./components/products/ProductsTypes";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

    const [cartProducts, setCartProducts] = useState([]);

    const addToCart: onProductBuy = (name, id, price, amount) => {
        setCartProducts([...cartProducts, ...id]);
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


    return (
        <div className="App">
            <ToastContainer/>
            <Cart products={cartProducts}/>
            <div className="centering-div">
                <Products title={"Produkty"} headerRow={["Nazwa", "Opis", "Cena"]} products={products}
                          onBuy={addToCart}/>
            </div>
        </div>

    );
}

export default App;
