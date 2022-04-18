import { Product } from './product.model';
import { Model } from 'mongoose';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    addProduct(title: string, desc: string, price: number): Promise<string>;
    getAllProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getProduct(productId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    editProduct(productId: string, title: string, desc: string, price: number): Promise<void>;
    deleteProduct(prodId: string): Promise<void>;
    private findProduct;
}
