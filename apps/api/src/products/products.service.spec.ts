import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductsService } from './products.service';

// Mock Prisma Client methods
const mockPrismaService = {
  product: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product attached to a user', async () => {
      const userId = 1;
      const createDto = {
        name: 'Test Cake',
        description: 'Delicious test cake',
        price: 10.5,
        category: 'Cake' as const,
        image: 'http://image.url',
      };

      const expectedResult = { id: 1, ...createDto, userId };

      mockPrismaService.product.create.mockResolvedValue(expectedResult);

      const result = await service.create(userId, createDto);

      expect(result).toEqual(expectedResult);
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: { ...createDto, userId },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        { id: 1, name: 'Cake 1' },
        { id: 2, name: 'Cake 2' },
      ];
      mockPrismaService.product.findMany.mockResolvedValue(products);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = { id: 1, name: 'Existing Product' };
      mockPrismaService.product.findUnique.mockResolvedValue(product);

      const result = await service.findOne(1);
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const existingProduct = { id: 1, name: 'Old Name' };
      const updateDto = { name: 'New Name' };
      const updatedProduct = { ...existingProduct, ...updateDto };

      // Mock finding the product first (since service.update calls service.findOne)
      mockPrismaService.product.findUnique.mockResolvedValue(existingProduct);
      // Mock the update
      mockPrismaService.product.update.mockResolvedValue(updatedProduct);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedProduct);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
    });

    it('should throw error if trying to update non-existent product', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const product = { id: 1, name: 'To Delete' };

      // Mock finding first
      mockPrismaService.product.findUnique.mockResolvedValue(product);
      // Mock delete
      mockPrismaService.product.delete.mockResolvedValue(product);

      const result = await service.remove(1);

      expect(result).toEqual(product);
      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
