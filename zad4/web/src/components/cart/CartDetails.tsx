import React, {useCallback, useEffect, useState} from 'react';
import styles from "./CartDetails.module.css";
import {CartDetailsProps, CartProduct} from "./CartTypes";
import Table from "../table/Table";
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import InputForm from "../inputForm/InputForm";

function CartDetails({products, onCreateOrder, onClickAway}: CartDetailsProps) {
    const [productRows, setProductRows] = useState([]);
    const [productsData, setProductsData] = useState<CartProduct[]>(products);
    const computeTotalPrice = (products: CartProduct[]) => {
        return products.reduce((total, product) => {
            return total + product.amount * product.price;
        }, 0)
    }
    const [totalPrice, setTotalPrice] = useState<number>(computeTotalPrice(products));

    const updateAmount = useCallback((id: string, amount: number) => {
        const productIndex = productsData.findIndex(((product) => product.id === id));
        const updateProductsData = productsData.map((product, index) => {
            if (index === productIndex) {
                return {
                    ...product,
                    amount: amount,
                };
            }
            return product;
        });
        setProductsData(updateProductsData);
    }, [productsData]);

    useEffect(() => {
        setProductRows(productsData.map((product) => {
            return [product.name, <>
                <button className={styles.leftButton} style={{opacity: product.amount > 1 ? 1 : 0}} onClick={() => {
                    if (product.amount > 1) updateAmount(product.id, --product.amount)
                }}>-
                </button>
                <span className={styles.amount}>{product.amount}</span>
                <button className={styles.rightButton} onClick={() => updateAmount(product.id, ++product.amount)}>+
                </button>
            </>, product.price + " zł", product.amount * product.price + " zł"];
        }))
        setTotalPrice(computeTotalPrice(productsData));
    }, [productsData, updateAmount]);


    return (
        <>
            <div className={styles.background}/>
            <ClickAwayListener onClickAway={onClickAway}>
                <div className={styles.cartView}>
                    <h1>Twój koszyk</h1>
                    <div className={styles.centeringContainer}>
                    <Table headerRow={["Nazwa", "Ilość", "Cena", "Suma"]} rows={productRows}
                           columnSizes={[3, 2, 4, 3]}/>
                    </div>
                    <h2>Łączna kwota: {totalPrice + " zł"}
                    </h2>
                    <InputForm setData={(formData) => onCreateOrder(productsData, formData)}/>
                </div>
            </ClickAwayListener>
        </>
    );
}

export default CartDetails;
