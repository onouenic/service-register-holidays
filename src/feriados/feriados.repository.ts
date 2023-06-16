import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { FeriadosEntity } from './feriados.entity';
import IFeriadosEntity from './feriados.interface';
import { CreateFeriadoDto } from './dto/createFeriado.dto';

export class FeriadosRepository {
  constructor(
    @InjectRepository(FeriadosEntity)
    private readonly feriadosRepository: Repository<FeriadosEntity>,
  ) {}

  async findAll(): Promise<IFeriadosEntity[]> {
    return await this.feriadosRepository.find({
      relations: ['anoId'],
      order: { data: 'ASC' } as FindOptionsOrder<FeriadosEntity>,
    });
  }

  async findOne(id: string): Promise<IFeriadosEntity> {
    return await this.feriadosRepository.findOne({
      where: { id } as
        | FindOptionsWhere<FeriadosEntity>
        | FindOptionsWhere<FeriadosEntity>[],
      order: { data: 'ASC' } as FindOptionsOrder<FeriadosEntity>,
    });
  }

  async findOneByDate(data: string): Promise<IFeriadosEntity> {
    return await this.feriadosRepository.findOne({
      where: { data },
    });
  }

  async create(feriado: CreateFeriadoDto): Promise<IFeriadosEntity> {
    return await this.feriadosRepository.save(
      feriado as DeepPartial<IFeriadosEntity>,
    );
  }

  async update(id: string, feriado: IFeriadosEntity): Promise<UpdateResult> {
    return await this.feriadosRepository.update(id, feriado);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.feriadosRepository.delete(id);
  }
}
