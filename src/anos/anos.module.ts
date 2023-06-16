import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnosEntity } from './anos.entity';
import { AnosControllers } from './anos.controller';
import { AnosService } from './anos.service';
import { AnosRepository } from './anos.repository';
import { FeriadosService } from 'src/feriados/feriados.service';
import { FeriadosRepository } from 'src/feriados/feriados.repository';
import { FeriadosEntity } from 'src/feriados/feriados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnosEntity, FeriadosEntity])],
  controllers: [AnosControllers],
  providers: [AnosService, AnosRepository, FeriadosService, FeriadosRepository],
})
export class AnosModule {}
