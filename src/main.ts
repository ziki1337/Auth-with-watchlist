import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// npm i --save @nestjs/config - команда для установки файлов конфигурации
// npm install --save @nestjs/swagger - команда для установки api swager'а

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  const config = new DocumentBuilder()  //конфиг для api swager'а
    .setTitle('Test api')
    .setDescription('this api for test')
    .setVersion('1.0')
    .addTag('App')
    .build();
  const document = SwaggerModule.createDocument(app, config); //создаем документ
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe) // добавляем валидацию в проект


  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
