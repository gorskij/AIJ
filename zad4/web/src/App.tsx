import './App.css';
import React, {useState} from 'react';
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import {onProductBuy, Product} from "./components/products/ProductsTypes";

function App() {
    const products: Product[] = [
        {
            id: "1",
            category: "Kategoria1",
            name: "Test",
            description: "aaa",
            price: "100",
        },
        {
            id: "2",
            category: "Kategoria1",
            name: "Test",
            description: "aaa",
            price: "5",
        }
    ]
    const [cartProducts, setCartProducts] = useState([]);

    const addToCart: onProductBuy = (id, price, amount) => {
        setCartProducts([...cartProducts, ...id]);
    }

  return (
      <div className="App">
          <div className="centering-div">
              <Products title={"Produkty"} headerRow={["Nazwa", "Opis", "Cena"]} products={products} onBuy={addToCart}/>
          </div>
          <Cart products={cartProducts}/>
      </div>

  );
}

export default App;
