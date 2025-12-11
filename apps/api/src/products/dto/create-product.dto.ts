import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Define the schema for creating a product
const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  // Ensure price is a positive number
  price: z.number().min(0, 'Price must be a positive number'),
  // Restrict category to specific values matches your frontend
  category: z.enum(['Beverage', 'Cake', 'Dessert', 'Pastry', 'Meal']),
  // Ensure image is a valid URL string
  image: z.url('Image must be a valid URL'),
});

// Create the DTO class based on the schema
export class CreateProductDto extends createZodDto(CreateProductSchema) {}
