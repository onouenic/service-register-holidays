import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeriadoDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  nome: string;

  @IsString({ message: 'Data deve ser uma string' })
  @IsNotEmpty({ message: 'Data não pode ser vazia' })
  data: string;

  @IsString({ message: 'Tipo deve ser uma string' })
  @IsNotEmpty({ message: 'Tipo não pode ser vazio' })
  tipo: string;

  @IsString({ message: 'AnoId deve ser uma string' })
  @IsNotEmpty({ message: 'AnoId não pode ser vazio' })
  anoId: string;
}
