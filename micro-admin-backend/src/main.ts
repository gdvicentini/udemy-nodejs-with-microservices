import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import * as momentTimezone from 'moment-timezone'

const logger = new Logger('Main')
const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,

    options: {
      //urls: ['amqp://user:Mw7gQ1ORRhmi@3.95.179.245:5672/smartranking'],
      urls: [`amqp://${configService.get<string>('RABBITMQ_USER')}:${configService.get<string>('RABBITMQ_PASSWORD')}@${configService.get<string>('RABBITMQ_URL')}`],
      noAck: false,
      queue: 'admin-backend'
    },
  });

  Date.prototype.toJSON = function(): any {
    return momentTimezone(this)
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss.SSS")
  }


  //comando comentado no momento para verificar se irá ou não atrapalhar o código posteriormente
  //deixar o comando sem comentar, retorna o seguinte erro: 'aguardando 0 argumentos, mas acabou recebendo 1'
  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();

