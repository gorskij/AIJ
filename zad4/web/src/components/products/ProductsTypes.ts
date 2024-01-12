export type OnProductBuy = (name: string, id: string, price: string, amount: number) => void;

export type Product = {
    id: string;
    category: string;
    name: string;
    description: Element | string;
    price: string;
}

export type ProductProps = {
    title: string;
    headerRow: string[];
    products: Product[]
    onBuy: OnProductBuy
}


