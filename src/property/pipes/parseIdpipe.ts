import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    const val = parseInt(value);

    if (isNaN(value)) {
      throw new BadRequestException('id must be a number');
    }

    if (val <= 0) {
      throw new BadRequestException('id must be positive');
    }

    return val;
  }
}
