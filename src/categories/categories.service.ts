import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: dto,
    });
  }

  async deleteCategory(dto: DeleteCategoryDto) {
    return this.prisma.category.delete({
      where: dto,
    });
  }

  async findAllCategories() {
    return this.prisma.category.findMany();
  }

  async findAllCategoriesWithProducts() {
    return this.prisma.category.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            frontPrice: true,
            images: true,
          },
        },
      },
    });
  }

  async searchProductsInCategory(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }
}
