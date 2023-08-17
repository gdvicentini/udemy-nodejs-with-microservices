import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongodb+srv://admin:v8BZKV1uuadPb8O0@cluster-guiv.1lyhd.mongodb.net/smartranking?retryWrites=true&w=majority' 
    // os códigos abaixo não são mais necessários na versão Mongoose 6:
    /*, { useNewUrlparser: true, userCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false } */),
    CategoriasModule,
    DesafiosModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
