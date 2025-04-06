import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { LiblibAiModule } from './liblib-ai/liblib-ai.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    CategoriesModule,
    LiblibAiModule,
  ],
  controllers: [AppController, ProductController, CategoriesController],
  providers: [AppService, ProductService, CategoriesService],
})
export class AppModule {}
