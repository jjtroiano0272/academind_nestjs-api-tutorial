import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        id: string;
    }>;
    getAllProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getProduct(prodId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    editProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        msg: string;
    }>;
    removeProduct(prodId: string): Promise<{
        msg: string;
    }>;
}
