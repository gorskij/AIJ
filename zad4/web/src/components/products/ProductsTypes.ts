export type onProductBuy = (id: string, price: string, amount: number) => void;

export type Product = {
    id: string;
    category: string;
    name: string;
    description: string;
    price: string;
}

export type ProductProps = {
    title: string;
    headerRow: string[];
    products: Product[]
    onBuy: onProductBuy
}


