import React, {useCallback, useEffect, useState} from 'react';
import Table from "../table/Table";
import styles from "./Products.module.css";
import TextField from '@mui/material/TextField';
import {MenuItem} from "@mui/material";
import ShoppingCart from "./shopping-cart.svg";
import {Product, ProductProps} from "./ProductsTypes";

const categories = [
    {
        value: "Wszystkie",
        label: "Wszystkie"
    },
    {
        value: "Kategoria1",
        label: "Kategoria1"
    },
    {
        value: "Kategoria2",
        label: "Kategoria2"
    }
]

function Products({title, headerRow, products, onBuy}: ProductProps) {
    const [shownRowsCount, setShownRowsCount] = useState(10);
    const [shownRows, setShownRows] = useState(null);
    const [shownHeaderRow, setShownHeaderRow] = useState(null);

    const areMoreProductsToShow = shownRowsCount < products.length;

    const rowsInitialized = shownHeaderRow && shownRows;

    const buyButton = useCallback((product: Product) => {
        return <img className={styles.shoppingCart} src={ShoppingCart} alt="Kup"
             onClick={() => onBuy(product.name, product.id, product.price, 1)}></img>
    }, [onBuy]);

    const getProductRow = useCallback((product: Product) => [...getProductDataToView(product), buyButton(product)], [buyButton]);
    const showMore = () => setShownRowsCount(shownRowsCount + 10);
    const updateRowsByName = (name: string) => {
        if (name === "") {
            setShownRows(products.map((product) => getProductRow(product)));
            return;
        }
        const foundProducts = products.filter((product: Product) => compare(product.name, name));
        setShownRows(foundProducts.map((product: Product) => getProductRow(product)));
    };

    useEffect(() => {
        setShownHeaderRow([...headerRow, "Kup"]);
    }, [headerRow])

    useEffect(() => {
        const rows = products.map((product) => {
            return getProductRow(product);
        });

        setShownRows(rows);

    }, [getProductRow, onBuy, products]);


    return (
        <div className={styles.centeringContainer}>
            <h2>{title}</h2>
            <div className={styles.filters}>
                <TextField style={{marginRight: 10, width: 150}} label="Nazwa" variant="outlined"
                           onChange={(e) => {
                               updateRowsByName(e.target.value);
                           }}/>
                <TextField
                    style={{width: 150}}
                    id="outlined-select-currency"
                    select
                    label="Kategoria"
                    defaultValue="Wszystkie"
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            {rowsInitialized && <Table rows={[shownHeaderRow, ...shownRows.slice(0, shownRowsCount)]}/>}
            {areMoreProductsToShow && <button onClick={() => showMore()}>Pokaż więcej</button>}
            <div className={styles.results}>Liczba znalezionych: {shownRows?.length},
                Widocznych: {shownRows?.length > shownRowsCount ? shownRowsCount : shownRows?.length}</div>
        </div>
    )
}

export default Products;

function compare(phrase: string, query: string) {
    for (let x = 0; x < query.length; x++) {
        if (query[x] !== phrase[x]) {
            return false;
        }
    }
    return true;
}

function getProductDataToView(product: Product) {
    return [product.name, product.description, product.price];
}
