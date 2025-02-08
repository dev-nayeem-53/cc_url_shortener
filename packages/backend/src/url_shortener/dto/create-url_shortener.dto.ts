import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateUrlShortenerDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  long_url: string;
}
