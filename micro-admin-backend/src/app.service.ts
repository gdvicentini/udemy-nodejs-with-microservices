import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './categorias/interfaces/categoria.interface';
import { Jogador } from './jogadores/interfaces/jogador.interface';


@Injectable()
export class AppService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
  ) {}

  private readonly logger = new Logger(AppService.name)

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria)
      return await categoriaCriada.save()

    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }

  async consultarTodasCategorias(): Promise<Categoria[]> {
    try {
      return await this.categoriaModel.find().exec()
    } catch (error) {
      this.logger.error (`error: ${JSON.stringify(error.message)}`)
      throw new RpcException (error.message)
    }
  }

  async consultarCategoriaPeloId(_id: string): Promise<Categoria> {
    try {
      return await this.categoriaModel.findOne ({ _id }).exec()

    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException (error.message)
    }
  }

  async atualizarCategoria(_id: string, categoria: Categoria): Promise<void> {
    try {
      await this.categoriaModel.findOneAndUpdate({_id}, {$set: categoria}).exec()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify (error.message)}`)
      throw new RpcException(error.message)
    }
  }

}
