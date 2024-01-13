import React, {useEffect, useState} from 'react';
import styles from "./CartDetails.module.css";
import {CartDetailsProps, CartProduct} from "./CartTypes";
import Table from "../table/Table";
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import InputForm from "../inputForm/InputForm";
import Cross from "./cross.svg";
import {CustomerData} from "../inputForm/InputFormTypes";

function CartDetails({products, onCreateOrder, onClickAway, onProductRemove}: CartDetailsProps) {
    const [productRows, setProductRows] = useState([]);
    const [productsData, setProductsData] = useState<CartProduct[]>(products);
    const [orderSent, setOrderSent] = useState(false);
    const [orderSentError, setOrderSentError] = useState("");

    const computeTotalPrice = (products: CartProduct[]) => {
        return products.reduce((total, product) => {
            return total + product.amount * product.price;
        }, 0)
    }
    const [totalPrice, setTotalPrice] = useState<number>(computeTotalPrice(productsData));

    const sendOrder = async (productsData: CartProduct[], formData: CustomerData) => {
        const res = await onCreateOrder(productsData, formData);
        if(res.status === 200) {
            setOrderSent(true);
            setOrderSentError("");
        }
        else {
            setOrderSentError(res.message);
        }
    }
    useEffect(() => {
        const removeProduct = (id: string) => {
            const productIndex = productsData.findIndex((product) => product.id === id);
            if (productIndex === -1)
                return;

            const newProductsData = [...productsData];
            products.splice(productIndex, 1);
            newProductsData.splice(productIndex, 1);

            setProductsData(newProductsData);
            setTotalPrice(computeTotalPrice(productsData));
            onProductRemove();
        };

        const updateAmount = (id: string, amount: number) => {
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
        };

        setProductRows(productsData.map((product) => {
            return [product.name, <>
                <button className={styles.leftButton} style={{opacity: product.amount > 1 ? 1 : 0}} onClick={() => {
                    if (product.amount > 1) updateAmount(product.id, --product.amount)
                }}>-
                </button>
                <span className={styles.amount}>{product.amount}</span>
                <button className={styles.rightButton} onClick={() => updateAmount(product.id, ++product.amount)}>+
                </button>
            </>, product.price + " zł", product.amount * product.price + " zł",
                <img className={styles.cross} src={Cross} alt="Usuń" onClick={() => removeProduct(product.id)}/>];
        }))
        setTotalPrice(computeTotalPrice(productsData));
    }, [onProductRemove, products, productsData]);


    return (
        <>
            <div className={styles.background}/>
            <ClickAwayListener onClickAway={onClickAway}>
                <div className={styles.cartView}>
                    <h1>Twój koszyk</h1>
                    <div className={styles.centeringContainer}>
                        <Table headerRow={["Nazwa", "Ilość", "Cena", "Suma", "Usuń"]} rows={productRows}
                               columnSizes={[3, 2, 4, 3, 1]}/>
                    </div>
                    <h2>Łączna kwota: {totalPrice + " zł"}
                    </h2>
                    {products.length !== 0 &&
                        <InputForm onFormSubmitted={(formData) => {sendOrder(productsData, formData)}}/>}
                    {orderSent && <h2>Zamówienie wysłane!</h2>}
                    {orderSentError && (
                        <>
                        <h2>Wystąpił błąd podczas wysyłania zamówienia</h2>
                        <h3>Przyczyna: {orderSentError}</h3>
                        </>
                    )}
                    <div style={{paddingBottom: 100}}></div>
                </div>
            </ClickAwayListener>
        </>
    );
}

export default CartDetails;
