import './App.css';
import React from 'react';
import Products from "./components/products/Products";

function App() {
    const rows = [["aaa", "bbb", "ccc"],  ["bbb", "bbb", "ccc"]];

  return (
      <div className="App">
          <div className="centering-div">
              <Products title={"Produkty"} headerRow={["Nazwa", "Opis", "Cena"]} rows={rows}/>
          </div>
      </div>

  );
}

export default App;
