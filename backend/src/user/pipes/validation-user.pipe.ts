import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class ValidationUserPipe implements PipeTransform<any,UpdateUserDto> {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}