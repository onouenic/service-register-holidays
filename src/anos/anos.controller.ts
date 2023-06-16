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
import { AnosService } from './anos.service';
import { Response } from 'express';
import { CreateAnoDto } from './dto/createAno.dto';

@Controller('anos')
export class AnosControllers {
  constructor(private readonly anosService: AnosService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const anos = await this.anosService.findAll();
      return res.status(HttpStatus.OK).json({
        anos,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/:ano')
  async findByAno(@Res() res: Response, @Param('ano') ano: string) {
    try {
      const anos = await this.anosService.findByAno(Number(ano));
      return res.status(200).json({
        anos,
      });
    } catch (error) {
      console.log(ano);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const getAno = await this.anosService.findOne(id);
      return res.status(200).json({
        getAno,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post()
  async create(@Res() res: Response, @Body() ano: CreateAnoDto) {
    try {
      const anoCreated = await this.anosService.create(ano);
      return res.status(201).json({
        anoCreated,
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
    @Body() ano: number,
  ) {
    try {
      const anoUpdated = await this.anosService.update(id, ano);
      return res.status(200).json({
        anoUpdated,
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
      const anoDeleted = await this.anosService.delete(id);
      return res.status(200).json({
        anoDeleted,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
