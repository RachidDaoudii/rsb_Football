import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards,Res} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
import { Response } from 'express';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard,RoleGuard)
  // @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post('delivered/:id')
  // @UseGuards(AuthGuard,RoleGuard)
  // @Roles(RoleEnum.Admin)
  async delivered(@Param('id') id: string,@Res() res: Response) {
    const result = await this.ordersService.delivered(+id);
    return res.status(200).json(result
    );
  }

  @Post('paid/:id')
  // @UseGuards(AuthGuard,RoleGuard)
  // @Roles(RoleEnum.Admin)
  async paid(@Param('id') id: string) {
    const result = await  this.ordersService.paid(+id);
    return result;
  }
}
