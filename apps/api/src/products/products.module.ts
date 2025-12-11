import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // Import this
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [CloudinaryModule], // Add to imports
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
