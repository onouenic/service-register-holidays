import { Injectable } from '@nestjs/common';
import { FeriadosRepository } from './feriados.repository';
import IFeriadosEntity from './feriados.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateFeriadoDto } from './dto/createFeriado.dto';

@Injectable()
export class FeriadosService {
  constructor(private readonly feriadosRepository: FeriadosRepository) {}

  async findAll(): Promise<IFeriadosEntity[]> {
    return await this.feriadosRepository.findAll();
  }

  async findOne(id: string): Promise<IFeriadosEntity> {
    return await this.feriadosRepository.findOne(id);
  }

  async findOneByDate(data: string): Promise<IFeriadosEntity> {
    return await this.feriadosRepository.findOneByDate(data);
  }

  async create(
    feriado: CreateFeriadoDto,
  ): Promise<IFeriadosEntity | { message: string }> {
    const existsFeriado = await this.feriadosRepository.findOneByDate(
      feriado.data,
    );
    if (existsFeriado) return { message: 'Feriado ja existe!' };
    return await this.feriadosRepository.create(feriado);
  }

  async update(id: string, feriado: IFeriadosEntity): Promise<UpdateResult> {
    return await this.feriadosRepository.update(id, feriado);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.feriadosRepository.delete(id);
  }
}
