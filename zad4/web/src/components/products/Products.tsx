import React, {useCallback, useEffect, useState} from 'react';
import Table from "../table/Table";
import styles from "./Products.module.css";
import TextField from '@mui/material/TextField';
import {MenuItem} from "@mui/material";
import ShoppingCart from "./shopping-cart.svg";
import {Product, ProductProps} from "./ProductsTypes";
import Button from "@mui/material/Button";

function Products({title, headerRow, products, categories, onBuy}: ProductProps) {
    const [shownRowsCount, setShownRowsCount] = useState(10);
    const [shownRows, setShownRows] = useState(null);
    const [shownHeaderRow, setShownHeaderRow] = useState(null);
    const [category, setCategory] = useState("Wszystkie");
    const [name, setName] = useState("");

    const areMoreProductsToShow = shownRowsCount < products.length;
    const rowsInitialized = shownHeaderRow && shownRows;

    const buyButton = useCallback((product: Product) => {
        return <img className={styles.shoppingCart} src={ShoppingCart} alt="Kup"
                    onClick={() => onBuy(product.name, product.id, product.price, 1)}></img>
    }, [onBuy]);

    const getProductRow = useCallback((product: Product) => [...getProductDataToView(product), buyButton(product)], [buyButton]);
    const showMore = () => setShownRowsCount(shownRowsCount + 10);
   
    
    useEffect(() => {
        const updateRows = () => {
            const foundProducts = products.filter((product: Product) => {
                return checkName(product.name, name) && checkCategory(product.category, category);
            });
            setShownRows(foundProducts.map((product: Product) => getProductRow(product)));
        };
        updateRows();

    }, [category, getProductRow, name, products])

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
                               setName(e.target.value);
                           }}/>
                <TextField
                    style={{width: 150}}
                    id="outlined-select-currency"
                    select
                    label="Kategoria"
                    defaultValue="Wszystkie"
                    onChange={(event) => setCategory(event.target.value)}
                >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            {rowsInitialized && <Table headerRow={shownHeaderRow} columnSizes={[2, 4, 2, 1]}
                                       rows={shownRows.slice(0, shownRowsCount)}/>}
            {areMoreProductsToShow &&
                <div style={{marginTop: 20}}><Button variant="contained" onClick={() => showMore()}>
                    Pokaż więcej</Button></div>}
            <div className={styles.results}>Liczba znalezionych: {shownRows?.length},
                Widocznych: {shownRows?.length > shownRowsCount ? shownRowsCount : shownRows?.length}</div>
        </div>
    )
}

export default Products;

function checkName(phrase: string, query: string) {
    for (let x = 0; x < query.length; x++) {
        if (query[x] !== phrase[x]) {
            return false;
        }
    }
    return true;
}

function getProductDataToView(product: Product) {
    return [product.name, product.description, product.price + " zł"];
}

function checkCategory(productCategory: string, currentCategory: string) {
    if (currentCategory === "Wszystkie")
        return true;

        return productCategory === currentCategory;
}
