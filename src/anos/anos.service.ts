import { Injectable } from '@nestjs/common';
import { AnosRepository } from './anos.repository';
import { FeriadosFixos } from 'src/mock/FeriadosFixos';
import { getFeriadosMoveis } from 'src/utils/getFeriadosMoveis';
import { getFeriadosNicbr } from 'src/utils/getFeriadosNicbr';
import { FeriadosService } from 'src/feriados/feriados.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateAnoDto } from './dto/createAno.dto';
import { AnosEntity } from './anos.entity';

@Injectable()
export class AnosService {
  constructor(
    private readonly anoRepository: AnosRepository,
    private readonly feriadosService: FeriadosService,
  ) {}

  async findAll(): Promise<AnosEntity[]> {
    return await this.anoRepository.findAll();
  }

  async findByAno(ano: CreateAnoDto | number): Promise<AnosEntity> {
    let existeAnoAtual = await this.anoRepository.findOneByAno(ano as number);
    while (!existeAnoAtual) {
      await this.anoRepository.create(ano as CreateAnoDto);
      existeAnoAtual = await this.anoRepository.findOneByAno(ano as number);
    }

    //registrar no bd feriados fixos
    for (const feriadoFixo of FeriadosFixos) {
      const data = `${ano}-${feriadoFixo.mes}-${feriadoFixo.dia}`;
      let feriadoCriado;
      if (existeAnoAtual.feriados.length > 0) {
        const feriadoExisteNoBd = await this.feriadosService.findOneByDate(
          data,
        );
        if (!feriadoExisteNoBd) {
          feriadoCriado = await this.feriadosService.create({
            nome: feriadoFixo.nome,
            data: data,
            tipo: feriadoFixo.tipo,
            anoId: existeAnoAtual.id,
          });
          console.log('feriadosFixox', feriadoCriado);
        }
      } else {
        feriadoCriado = await this.feriadosService.create({
          nome: feriadoFixo.nome,
          data: data,
          tipo: feriadoFixo.tipo,
          anoId: existeAnoAtual.id,
        });
        console.log('feriadosFixox', feriadoCriado);
      }
    }

    //registrar no bd feriados moveis
    const feriadosMoveis = getFeriadosMoveis(ano as number);
    for (const feriadoMovel of feriadosMoveis) {
      const day = feriadoMovel.dia.toString().padStart(2, '0');
      const month = feriadoMovel.mes.toString().padStart(2, '0');
      const data = `${ano}-${month}-${day}`;
      let feriadosCriados;
      if (existeAnoAtual.feriados.length > 0) {
        const feriadoExisteNoBd = await this.feriadosService.findOneByDate(
          data,
        );
        if (!feriadoExisteNoBd) {
          feriadosCriados = await this.feriadosService.create({
            nome: feriadoMovel.nome,
            data: data,
            tipo: feriadoMovel.tipo,
            anoId: existeAnoAtual.id,
          });
          console.log('feriadosMoveis', feriadosCriados);
        }
      } else {
        feriadosCriados = await this.feriadosService.create({
          nome: feriadoMovel.nome,
          data: data,
          tipo: feriadoMovel.tipo,
          anoId: existeAnoAtual.id,
        });
        console.log('feriadosMoveis', feriadosCriados);
      }
    }

    //registrar no bd feriados nicbr
    const feriadosNicbr = getFeriadosNicbr(feriadosMoveis, ano as number);
    for (const feriadoNicbr of feriadosNicbr) {
      const day = feriadoNicbr.dia.toString().padStart(2, '0');
      const month = feriadoNicbr.mes.toString().padStart(2, '0');
      const data = `${ano}-${month}-${day}`;
      let feriadosCriados;
      if (existeAnoAtual.feriados.length > 0) {
        const feriadoExisteNoBd = await this.feriadosService.findOneByDate(
          data,
        );
        if (!feriadoExisteNoBd) {
          await this.feriadosService.create({
            nome: feriadoNicbr.nome,
            data: data,
            tipo: feriadoNicbr.tipo,
            anoId: existeAnoAtual.id,
          });
          console.log('feriadosNicbr', feriadosCriados);
        }
      } else {
        await this.feriadosService.create({
          nome: feriadoNicbr.nome,
          data: data,
          tipo: feriadoNicbr.tipo,
          anoId: existeAnoAtual.id,
        });
        console.log('feriadosNicbr', feriadosCriados);
      }
    }

    //fazer requisição ao banco, dos anos
    let anos = await this.anoRepository.findOneByAno(ano as number);
    while (anos.feriados.length <= 0) {
      anos = await this.anoRepository.findOneByAno(ano as number);
    }
    return anos;
  }

  async findOne(id: string): Promise<AnosEntity> {
    return await this.anoRepository.findOneById(id);
  }

  async create(ano: CreateAnoDto): Promise<CreateAnoDto> {
    return await this.anoRepository.create(ano);
  }

  async update(id: string, ano: number): Promise<UpdateResult> {
    return await this.anoRepository.update(id, ano);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.anoRepository.delete(id);
  }
}
