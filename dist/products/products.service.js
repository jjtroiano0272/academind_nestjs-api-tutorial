"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async addProduct(title, desc, price) {
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        const result = await newProduct.save();
        return result.id;
    }
    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }));
    }
    async getProduct(productId) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }
    async editProduct(productId, title, desc, price) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }
    async deleteProduct(prodId) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find item. Nothing deleted.');
        }
    }
    async findProduct(id) {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Sorry, no product found!');
        }
        if (!product) {
            throw new common_1.NotFoundException('Sorry, no product found!');
        }
        return product;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
;
//# sourceMappingURL=products.service.js.map