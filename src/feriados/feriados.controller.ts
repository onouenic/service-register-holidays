import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { FeriadosService } from './feriados.service';
import { Response } from 'express';
import IFeriadosEntity from './feriados.interface';
import { CreateFeriadoDto } from './dto/createFeriado.dto';

@Controller('feriados')
export class FeriadosController {
  constructor(private readonly feriadosService: FeriadosService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const feriados = await this.feriadosService.findAll();
      return res.status(HttpStatus.OK).json({
        feriados,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const feriado = await this.feriadosService.findOne(id);
      return res.status(HttpStatus.OK).json({
        feriado,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post()
  async create(@Res() res: Response, @Body() feriado: CreateFeriadoDto) {
    try {
      const feriadoCreated = await this.feriadosService.create(feriado);
      return res.status(HttpStatus.CREATED).json({
        feriadoCreated,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() feriado: IFeriadosEntity,
  ) {
    try {
      const feriadoUpdated = await this.feriadosService.update(id, feriado);
      return res.status(HttpStatus.OK).json({
        feriadoUpdated,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Delete('/:id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    try {
      const feriadoDeleted = await this.feriadosService.delete(id);
      return res.status(HttpStatus.OK).json({
        feriadoDeleted,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
