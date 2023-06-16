import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeriadosEntity } from './feriados.entity';
import { FeriadosController } from './feriados.controller';
import { FeriadosService } from './feriados.service';
import { FeriadosRepository } from './feriados.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeriadosEntity])],
  controllers: [FeriadosController],
  providers: [FeriadosService, FeriadosRepository],
})
export class FeriadosModule {}
