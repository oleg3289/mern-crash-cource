import {create} from "zustand";
import {Product, ProductsState, ResponseApi} from "../models/product.models.tsx";

export const useProductStore = create<ProductsState>((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct: Product) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill in all fields"};
        }
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const data: ResponseApi<Product> = await res.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product created successfully"};
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products');
        const data: ResponseApi<Product[]> = await res.json();
        set({products: data.data})
    },
    deleteProduct: async (id: string) => {
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        const data: ResponseApi<void> = await res.json();
        if (!data.success) {
            return {success: false, message: data.message};
        }

        set((state) => ({products: state.products.filter((product) => product._id !== id)}));
        return {success: true, message: "Product deleted successfully"};
    },
    updateProduct: async (updatedProduct: Product) => {
        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return {success: false, message: "Please fill in all fields"};
        }
        const res = await fetch(`/api/products/${updatedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data: ResponseApi<Product> = await res.json();
        set((state) => ({
            products: state.products.map((product) => {
                if (product._id === updatedProduct._id) {
                    return data.data;
                }
                return product;
            })
        }));
        return {success: true, message: "Product updated successfully"};
    }
}));