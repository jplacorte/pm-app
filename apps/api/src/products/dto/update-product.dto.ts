import { createZodDto } from 'nestjs-zod';
import { CreateProductDto } from './create-product.dto';

// Create a schema where all fields from CreateProductDto are optional
const UpdateProductSchema = CreateProductDto.schema.partial();

export class UpdateProductDto extends createZodDto(UpdateProductSchema) {}
