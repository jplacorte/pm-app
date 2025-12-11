import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Create a new product
  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  // Find all products
  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' }, // Optional: sort by newest
    });
  }

  // Find a single product by ID
  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Update a product
  async update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete a product
  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
