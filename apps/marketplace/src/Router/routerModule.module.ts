import { Module } from '@nestjs/common';
import { DatabaseModule } from '../config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Users , CategoryProduct, Product} from '../entities';
import { CategoryProductModule } from '../category-product/category-product.module';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';
import { OrdersModule } from '../orders/orders.module';
import { Orders } from '../entities/orders.entity';
import { OrderProduct } from '../entities/orderProduct.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL_MARKETPLACE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([Users,CategoryProduct,Product,Orders,OrderProduct]),
    CategoryProductModule,
    ProductsModule,
    UserModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class RouterModule {}
