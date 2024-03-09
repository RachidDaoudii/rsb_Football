import { Injectable ,UploadedFile,UseInterceptors} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
@Injectable()
export class UploadS3Service {
    private readonly s3Client = new S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
        },
    
    });
    constructor(private readonly configService:ConfigService) {}

    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file:Express.Multer.File) {
        await this.uploadFileToS3(file.originalname, file.buffer);
        return `https://${this.configService.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/${file.originalname}`;
    }

    async uploadFileToS3(fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: "rsb-football1",
                Key: fileName,
                Body: file,
            })
        )
    }
}
