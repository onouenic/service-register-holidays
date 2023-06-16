import * as moment from 'moment';
import IFeriadosMoveis from 'src/interfaces/FeriadoMoveis.interface';
import { FeriadosFixos } from 'src/mock/FeriadosFixos';

// function obterDiaDaSemana(ano: number, mes: number, dia: number): string {
function obterDiaDaSemana(data: moment.Moment | Date): string {
  const newData = moment(data, 'YYYY-MM-DD'); // O mês em JavaScript começa em 0 (Janeiro é 0, Fevereiro é 1, etc.)

  const diasDaSemana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  const diaDaSemana = diasDaSemana[newData.day()];
  return diaDaSemana;
}

export const getFeriadosNicbr = (
  FeriadosMoveis: IFeriadosMoveis[],
  ano: number,
) => {
  const FeriadosNicbr = [];

  FeriadosFixos.forEach((feriado) => {
    const dia = moment(`${ano}-${feriado.mes}-${feriado.dia}`, 'YYYY-MM-DD');
    const diaDaSemana = obterDiaDaSemana(dia.toDate());
    if (diaDaSemana === 'Terça-feira') {
      const isMonday =
        obterDiaDaSemana(dia.subtract(1, 'days').toDate()) === 'Segunda-feira';
      if (isMonday) {
        FeriadosNicbr.push({
          nome: `Emenda ${feriado.nome}`,
          dia: dia.date(),
          mes: dia.month() + 1,
          ano: dia.year(),
          tipo: 'Nicbr',
          diaDaSemana: obterDiaDaSemana(dia.toDate()),
        });
        dia.add(1, 'days');
      }
    } else if (diaDaSemana === 'Quinta-feira') {
      const isFriday =
        obterDiaDaSemana(dia.add(1, 'days').toDate()) === 'Sexta-feira';
      if (isFriday) {
        FeriadosNicbr.push({
          nome: `Emenda ${feriado.nome}`,
          dia: dia.date(),
          mes: dia.month() + 1,
          ano: dia.year(),
          tipo: 'Nicbr',
          diaDaSemana: obterDiaDaSemana(dia.toDate()),
        });
        dia.subtract(1, 'days');
      }
    }
  });

  FeriadosMoveis.forEach((feriado: IFeriadosMoveis) => {
    const dia = moment(
      `${feriado.ano}-${feriado.mes}-${feriado.dia}`,
      'YYYY-MM-DD',
    );
    const diaDaSemana = obterDiaDaSemana(dia.toDate());
    if (diaDaSemana === 'Terça-feira') {
      const isMonday =
        obterDiaDaSemana(dia.subtract(1, 'days')) === 'Segunda-feira';
      if (isMonday) {
        FeriadosNicbr.push({
          nome: `Emenda ${feriado.nome}`,
          dia: dia.date(),
          mes: dia.month() + 1,
          ano: dia.year(),
          tipo: 'Nicbr',
          diaDaSemana: obterDiaDaSemana(dia.toDate()),
        });
        dia.add(1, 'days');
      }
      if (feriado.nome === 'Carnaval') {
        dia.add(1, 'days');
        FeriadosNicbr.push({
          nome: `Emenda Carnaval`,
          dia: dia.date(),
          mes: dia.month() + 1,
          ano: dia.year(),
          tipo: 'Nicbr',
          diaDaSemana: obterDiaDaSemana(dia.add(2, 'days').toDate()),
        });
        dia.subtract(1, 'days');
      }
    } else if (diaDaSemana === 'Quinta-feira') {
      const isFriday = obterDiaDaSemana(dia.add(1, 'days')) === 'Sexta-feira';
      if (isFriday) {
        FeriadosNicbr.push({
          nome: `Emenda ${feriado.nome}`,
          dia: dia.date(),
          mes: dia.month() + 1,
          ano: dia.year(),
          tipo: 'Nicbr',
          diaDaSemana: obterDiaDaSemana(dia.toDate()),
        });
        dia.subtract(1, 'days');
      }
    }
  });
  console.log(FeriadosNicbr);
  return FeriadosNicbr;
};
