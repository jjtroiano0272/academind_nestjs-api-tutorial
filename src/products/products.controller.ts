import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
  ) {
    const generatedId = await this.productsService.addProduct(prodTitle, prodDesc, prodPrice);

    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  async editProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.editProduct(prodId, prodTitle, prodDesc, prodPrice);
    return { msg: 'Product edited.' };
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return { msg: 'Product deleted.' };
  }
};

