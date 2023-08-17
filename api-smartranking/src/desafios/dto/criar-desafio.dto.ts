import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export class CriarDesafioDto {

    @IsDateString()
    @IsNotEmpty()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: Jogador;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>;
    
    @IsString()
    _id: string;
}