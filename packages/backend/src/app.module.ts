import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url_shortener/url_shortener.module';

@Module({
  imports: [UrlShortenerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
