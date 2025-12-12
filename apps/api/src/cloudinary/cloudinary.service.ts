import { BadRequestException, Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import toStream from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'tonberry-cafe' },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) return reject(error);

          if (!result) {
            return reject(
              new BadRequestException(
                'Cloudinary upload failed: No result returned',
              ),
            );
          }

          resolve(result.secure_url);
        },
      );

      toStream.createReadStream(file.buffer).pipe(upload);
    });
  }
}
