import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post('create')
  create(@Body() dto: CreateCategoryDto) {
    return this.service.createCategory(dto);
  }
  @Post('delete')
  delete(@Body() dto: DeleteCategoryDto) {
    return this.service.deleteCategory(dto);
  }

  @Get()
  findAll() {
    return this.service.findAllCategories();
  }

  @Get('getAll')
  findAllWithProducts() {
    return this.service.findAllCategoriesWithProducts();
  }

  @Get(':id')
  search(@Param('id') id: string) {
    return this.service.searchProductsInCategory(id);
  }
}
