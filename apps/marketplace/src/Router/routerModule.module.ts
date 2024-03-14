import { Module } from '@nestjs/common';
import { DatabaseModule } from '../config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Users , CategoryProduct, Product} from '../entities';
import { CategoryProductModule } from '../category-product/category-product.module';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL_MARKETPLACE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([Users,CategoryProduct,Product]),
    CategoryProductModule,
    ProductsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class RouterModule {}
