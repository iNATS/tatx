import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseBoolPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): boolean {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new BadRequestException(`Validation failed: "${value}" is not a valid boolean`);
  }
}
