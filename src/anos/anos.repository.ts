import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsOrder,
  Repository,
  UpdateResult,
} from 'typeorm';
import { AnosEntity } from './anos.entity';
import { CreateAnoDto } from './dto/createAno.dto';

export class AnosRepository {
  constructor(
    @InjectRepository(AnosEntity)
    private readonly anoRepository: Repository<AnosEntity>,
  ) {}

  async findAll(): Promise<AnosEntity[]> {
    const anos = await this.anoRepository.find({
      relations: ['feriados'],
      order: {
        ano: 'ASC',
        feriados: { data: 'ASC' } as FindOptionsOrder<AnosEntity>,
      } as FindOptionsOrder<AnosEntity>,
    });
    return anos;
  }

  async findOneById(id: string): Promise<AnosEntity> {
    return await this.anoRepository.findOne({
      where: { id },
      relations: ['feriados'],
      order: {
        ano: 'ASC',
        feriados: { data: 'ASC' } as FindOptionsOrder<AnosEntity>,
      } as FindOptionsOrder<AnosEntity>,
    } as FindOneOptions<AnosEntity>);
  }

  async findOneByAno(ano: number): Promise<AnosEntity> {
    return await this.anoRepository.findOne({
      where: { ano },
      relations: ['feriados'],
      order: {
        ano: 'ASC',
        feriados: { data: 'ASC' } as FindOptionsOrder<AnosEntity>,
      } as FindOptionsOrder<AnosEntity>,
    } as FindOneOptions<AnosEntity>);
  }

  async create(ano: CreateAnoDto): Promise<CreateAnoDto> {
    return await this.anoRepository.save({
      ano,
    } as unknown as DeepPartial<AnosEntity>);
  }

  async update(id: string, ano: number): Promise<UpdateResult> {
    return await this.anoRepository.update(id, ano as DeepPartial<AnosEntity>);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.anoRepository.delete(id);
  }
}
