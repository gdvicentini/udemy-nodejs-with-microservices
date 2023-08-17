import {
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CategoriasService } from './categorias.service';
import { Observable } from 'rxjs';

@Controller('api/v1/categorias')
export class CategoriasController {
  private logger = new Logger(CategoriasController.name);

  constructor(private categoriasService: CategoriasService) {}


  /*
  private clientAdminBackend: ClientProxy
  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:q7W2UQk249gR@18.210.17.173:5672/smartranking'],
        queue: 'admin-backend'
      }
    })
  }
  */
// não é necessário os códigos comentados daqui para baixo, após a ultima refatoração feita:
//  private clientAdminBackend = 
//              this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @Post()
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {


      //this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
      this.categoriasService.criarCategoria(criarCategoriaDto);

  }

  @Get()
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {

    //return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '')
    return this.categoriasService.consultarCategorias(_id);

  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ) {
      this.categoriasService.atualizarCategoria(atualizarCategoriaDto, _id);
      //this.clientAdminBackend.emit('atualizar-categoria', 
      //{ id: _id, categoria: atualizarCategoriaDto }) 
    }    

}
