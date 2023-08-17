import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config'

/*
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:v8BZKV1uuadPb8O0@cluster-guiv.1lyhd.mongodb.net/sradmbackend?retryWrites=true&w=majority'),
    // os códigos abaixo não são mais necessários na versão Mongoose 6:
    //, { useNewUrlparser: true, userCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    MongooseModule.forFeature([
      { name: 'Categoria', schema: CategoriaSchema },
      { name: 'Jogador', schema: JogadorSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}*/

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:v8BZKV1uuadPb8O0@cluster-guiv.1lyhd.mongodb.net/sradmbackend?retryWrites=true&w=majority'),
    CategoriasModule,
    JogadoresModule,
    ConfigModule.forRoot({isGlobal: true}),
],
  controllers: [],
  providers: [],
})
export class AppModule {}

