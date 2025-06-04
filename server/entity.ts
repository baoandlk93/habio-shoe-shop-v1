export interface IUser {
    id: number;
    name: string;
    password: string;
    role: IRole;
    username: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: ICategory;
    stock: number;
}

export interface IOrder {
    id: number;
    userId: string;
    productId: number;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
}

export interface ICartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}
export interface ICart {
    id: number;
    userId: string;
    cartItems: CartItem[];
    quantity: number;
    totalPrice: number;
}
export enum IRole {
        ADMIN,
        USER,
        MANAGER
}
export enum ICategory {
    SHOE = "Giày",
    BOOT = "Giày boot",
    SANDAL = "Giày dép",
    SNEAKER = "Giày thể thao",
}

