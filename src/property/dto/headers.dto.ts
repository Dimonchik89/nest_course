import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'access-token' }) // заоголовки не чувствительны к регисту. в заголовке должен быть "access-token" и он будет сопоставлен с accessToken
  accessToken: string;

  @IsString()
  @Expose()
  api_key: string;
}
