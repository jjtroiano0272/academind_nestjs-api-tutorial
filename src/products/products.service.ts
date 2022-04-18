import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async addProduct(title: string, desc: string, price: number) {
    // TODO: watch out this can be duplicate
    const prodId = Math.random().toString();
    const newProduct = new this.productModel({
      title,
      description: desc,
      price
    });

    const result = await newProduct.save();

    return result.id as string;
  }

  async getAllProducts() {
    // return { products: this.products };
    const products = await this.productModel.find().exec();

    return products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    }));
  }

  async getProduct(productId: string) {
    const product = await this.findProduct(productId);

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    };
  }

  async editProduct(
    productId: string,
    title: string,
    desc: string,
    price: number
  ) {
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

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find item. Nothing deleted.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Sorry, no product found!');
    }
    if (!product) {
      throw new NotFoundException('Sorry, no product found!');
    }

    return product;
  }
};
