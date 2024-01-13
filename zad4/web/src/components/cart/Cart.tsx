import React, {useEffect, useState} from 'react';
import {CartProps} from "./CartTypes";
import CartIcon from "./shopping-cart-2.svg";
import styles from "./Cart.module.css";
import CartDetails from "./CartDetails";

function Cart({products, onCreateOrder}: CartProps) {
    const [showCartDetails, setShowCartDetails] = useState(false);
    const [productsAmount, setProductsAmount] = useState(products.length);

    useEffect(() => {
        setProductsAmount(products.length);
    }, [products]);

    return (
        <>
            <div className={styles.cart} onClick={() => setShowCartDetails(true)}>
                <img className={styles.icon} src={CartIcon} alt="Koszyk"/>
                <div className={styles.amount}>{productsAmount}</div>
            </div>
            {showCartDetails && <CartDetails products={products} onCreateOrder={onCreateOrder}
                                             onClickAway={() => setShowCartDetails(false)}
                                             onProductRemove={() => setProductsAmount(products.length)}/>}

        </>
    );
}

export default Cart;
