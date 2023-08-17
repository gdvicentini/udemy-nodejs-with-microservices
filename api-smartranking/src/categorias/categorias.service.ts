import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>, private readonly jogadoresService: JogadoresService
    ) {}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
            
        if(categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já foi cadastrada!`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save()
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate("jogadores").exec()
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não foi encontrada!`)
        }

        return categoriaEncontrada
    }

    async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {

        /*
        Desafio
        Escopo da exceção realocado para o próprio Categorias Service
        Verificar se o jogador informado já se encontra cadastrado
        */

       //await this.jogadoresService.consultarJogadorPeloId(idJogador)                                   

       const jogadores = await this.jogadoresService.consultarTodosJogadores()

       const jogadorFilter = jogadores.filter( jogador => jogador._id == idJogador )

       if (jogadorFilter.length == 0) {
           throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
       }

        return await this.categoriaModel.findOne().where('jogadores').in(idJogador).exec() 

    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não foi encontrada.`)
        }

        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: atualizarCategoriaDto}).exec()
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria']
        const idJogador = params['idJogador']

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec()

        await this.jogadoresService.consultarJogadorPeloId(idJogador)

        if(!categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} não cadastrada!`)
        }

        if(jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`Jogador ${idJogador} já foi cadastrado na categoria`)
        }

        categoriaEncontrada.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: categoriaEncontrada}).exec()

    }
}
