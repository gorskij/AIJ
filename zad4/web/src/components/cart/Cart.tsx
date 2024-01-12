import React, {useState} from 'react';
import {CartProps} from "./CartTypes";
import CartIcon from "./shopping-cart-2.svg";
import styles from "./Cart.module.css";
import CartDetails from "./CartDetails";

function Cart({products, onCreateOrder}: CartProps) {
    const [showCartDetails, setShowCartDetails] = useState(false);

    return (
        <>
            <div className={styles.cart} onClick={() => setShowCartDetails(true)}>
                <img className={styles.icon} src={CartIcon} alt="Koszyk"/>
                <div className={styles.amount}>{products.length}</div>
            </div>
            {showCartDetails && <CartDetails products={products} onCreateOrder={onCreateOrder}
                                             onClickAway={() => setShowCartDetails(false)}/>}

        </>
    );
}

export default Cart;
