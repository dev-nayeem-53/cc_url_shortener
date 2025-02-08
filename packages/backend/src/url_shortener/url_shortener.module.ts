import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url_shortener.service';
import { UrlShortenerController } from './url_shortener.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService, PrismaService],
})
export class UrlShortenerModule {}
