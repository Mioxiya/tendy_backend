import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { generateCombinations } from '../common/utils';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createWithVariants(dto: CreateProductDto) {
    const combinations = generateCombinations(dto.attributes);

    return this.prisma.product.create({
      data: {
        ...dto,
        variants: {
          createMany: {
            data: combinations.map((comb) => ({
              combination: comb,
              basePrice: dto.basePrice,
              frontPrice: dto.frontPrice,
              images: dto.images,
              longImages: dto.longImages,
              urlto: dto.urlto,
            })),
          },
        },
      },
      include: { variants: true },
    });
  }

  async getDetail(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });
  }

  async getVariants(productId: string) {
    return this.prisma.variant.findMany({
      where: { productId },
      select: {
        id: true,
        combination: true,
        frontPrice: true,
        images: true,
      },
    });
  }

  async updateVariant(variantId: string, dto: UpdateVariantDto) {
    return this.prisma.variant.update({
      where: { id: variantId },
      data: dto,
    });
  }

  async deleteProduct(id: string) {
    console.log(id);
    // 使用事务确保原子性

    return await this.prisma.$transaction(async (tx) => {
      // 1. 删除所有关联变体
      await tx.variant.deleteMany({
        where: { productId: id },
      });

      // 2. 删除产品主体
      const deletedProduct = await tx.product.delete({
        where: { id },
        include: { variants: true }, // 包含被删除的变体用于返回信息
      });

      return {
        id: deletedProduct.id,
        name: deletedProduct.name,
      };
    });
  }

  async searchByName(name: string) {
    const products = await this.prisma.product.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
      include: { variants: true },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      frontPrice: p.frontPrice,
      images: p.images,
    }));
  }
}
