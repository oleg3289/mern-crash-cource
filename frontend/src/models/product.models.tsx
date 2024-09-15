export interface Product {
    _id?: string;
    name: string;
    price: number;
    image: string;
}

export interface ProductsState {
    products: Product[];
    setProducts: (products: Product[]) => void;
    createProduct: (newProduct: Product) => Promise<{ success: boolean, message: string }>;
    fetchProducts: () => Promise<void>;
    deleteProduct: (id: string) => Promise<{ success: boolean, message: string }>;
    updateProduct: (updatedProduct: Product) => Promise<{ success: boolean, message: string }>;
}

export interface ResponseApi<T> {
    data: T;
    success: boolean;
    message: string;
}