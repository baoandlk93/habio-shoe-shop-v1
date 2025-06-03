export interface User {
    id: string;
    name: string;
    password: string;
    role: string;
    username: string;
    
}

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
}

export interface Order {
    id: number;
    userId: string;
    productId: number;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
}
