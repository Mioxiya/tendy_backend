import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { DeleteCategoryDto } from '../categories/dto/delete-category.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('search')
  async searchProducts(@Query() dto: SearchProductDto) {
    return this.service.searchByName(dto.q);
  }

  @Post('create')
  create(@Body() dto: CreateProductDto) {
    return this.service.createWithVariants(dto);
  }

  @Post('delete')
  delete(@Body() dto: DeleteCategoryDto) {
    console.log(dto);
    return this.service.deleteProduct(dto.id);
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.service.getDetail(id);
  }

  @Get(':id/variants')
  getVariants(@Param('id') productId: string) {
    return this.service.getVariants(productId);
  }

  @Patch('variants/:id')
  updateVariant(@Param('id') variantId: string, @Body() dto: UpdateVariantDto) {
    return this.service.updateVariant(variantId, dto);
  }
}
