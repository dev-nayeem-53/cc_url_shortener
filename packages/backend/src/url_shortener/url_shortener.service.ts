import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url_shortener.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'node:crypto';

@Injectable()
export class UrlShortenerService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUrlShortenerDto: CreateUrlShortenerDto, origin: string) {
    const { long_url } = createUrlShortenerDto;

    const KEY = process.env.HASH_SECRET ?? 'aaw2arf465123cx';
    const hash = crypto
      .createHash('shake256', { outputLength: 6 })
      .update(`${long_url}_${KEY}`)
      .digest('hex');

    return this.prisma.url.create({
      data: {
        long_url,
        key: hash,
        short_url: `${origin}/${hash}`,
      },
    });
  }

  findAll() {
    return this.prisma.url.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} urlShortener`;
  }

  remove(id: number) {
    return `This action removes a #${id} urlShortener`;
  }
}
