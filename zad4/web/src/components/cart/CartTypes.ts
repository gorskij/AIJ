import {CustomerData} from "../inputForm/InputFormTypes";

export type CartProduct = {
    id: string;
    name: string;
    amount: number;
    price: number;
}

type OrderResult = {
    status: number;
    message: string;
}

export type OnCreateOrder = (products: CartProduct[], formData: CustomerData) => Promise<OrderResult>;

export type CartProps = {
    products: CartProduct[];
    onCreateOrder: OnCreateOrder;
}

export type CartDetailsProps = CartProps & {
    onClickAway: () => void;
    onProductRemove: () => void;
}
