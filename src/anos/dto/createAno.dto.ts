import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnoDto {
  @IsNumber({}, { message: 'Ano deve ser um número' })
  @IsNotEmpty({ message: 'Ano não pode ser vazio' })
  ano: number;
}
