import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UrlShortenerService } from './url_shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url_shortener.dto';
import { Request } from 'express';
import { PORT } from '../constants';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
    @Req() req: Request,
  ) {
    const origin = req.get('origin') ?? `http://localhost:${PORT}`;

    return this.urlShortenerService.create(createUrlShortenerDto, origin);
  }

  @Get()
  findAll() {
    return this.urlShortenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlShortenerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlShortenerService.remove(+id);
  }
}
