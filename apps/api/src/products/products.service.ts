import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Link creation to userId
  async create(userId: number, createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        userId,
      },
    });
  }

  // Filter by userId
  async findAll(userId: number) {
    return this.prisma.product.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Ensure user owns the product
  async findOne(id: number, userId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.userId !== userId)
      throw new ForbiddenException('Access denied');

    return product;
  }

  async update(id: number, userId: number, updateProductDto: UpdateProductDto) {
    // Check ownership first
    await this.findOne(id, userId);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number, userId: number) {
    // Check ownership first
    await this.findOne(id, userId);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
