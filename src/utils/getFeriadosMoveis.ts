import * as moment from 'moment';
import calcularPascoa from './calculoPascoa';
import IFeriadosMoveis from 'src/interfaces/FeriadoMoveis.interface';

const diaNoMes = (mes: number, ano: number) => {
  const diasNoMesArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
  if (mes === 2 && ano % 4 === 0) {
    return 29;
  }
  return diasNoMesArray[mes - 1];
};

const getDayAndMonth = (
  diaPascoa: number,
  diaParaOFeriado: number,
  metodo: string,
  mes: number,
  ano: number,
) => {
  if (metodo === '-') {
    let dia = diaPascoa - diaParaOFeriado;
    let mesAtual = mes;
    while (dia <= 0) {
      mesAtual -= 1;
      dia += diaNoMes(mesAtual, ano);
    }

    const data = moment(`${ano}-${mesAtual}-${dia}`, 'YYYY-MM-DD');

    return {
      dia: data.date() < 10 ? `0${data.date()}` : data.date().toString(),
      mes:
        data.month() + 1 < 10
          ? `0${data.month() + 1}`
          : data.month().toString(),
    };
  } else {
    let dia = diaPascoa + diaParaOFeriado;
    let mesAtual = mes;
    while (dia > diaNoMes(mesAtual, ano)) {
      dia -= diaNoMes(mesAtual, ano);
      mesAtual += 1;
      mes = mesAtual;
      if (mesAtual > 12) {
        mesAtual = 1;
        ano++;
      }
    }

    const data = moment(`${ano}-${mesAtual}-${dia}`, 'YYYY-MM-DD');

    return {
      dia: data.date() < 10 ? `0${data.date()}` : data.date().toString(),
      mes:
        data.month() + 1 < 10
          ? `0${data.month() + 1}`
          : data.month().toString(),
    };
  }
};

export const getFeriadosMoveis = (ano: number): IFeriadosMoveis[] => {
  const pascoaAtual = calcularPascoa(ano);
  const pascoaDia =
    pascoaAtual.dia < 10 ? `0${pascoaAtual.dia}` : pascoaAtual.dia.toString();
  const pascoaMes =
    pascoaAtual.mes < 10 ? `0${pascoaAtual.mes}` : pascoaAtual.mes.toString();

  const feriadosMoveisAnoAtual = [
    {
      nome: 'Carnaval',
      dia: getDayAndMonth(
        pascoaAtual.dia,
        47,
        '-',
        pascoaAtual.mes,
        pascoaAtual.ano,
      ).dia,
      mes: getDayAndMonth(
        pascoaAtual.dia,
        47,
        '-',
        pascoaAtual.mes,
        pascoaAtual.ano,
      ).mes,
      ano: pascoaAtual.ano,
      tipo: 'Nacional',
    },
    {
      nome: 'Sexta-feira Santa',
      dia: getDayAndMonth(
        pascoaAtual.dia,
        2,
        '-',
        pascoaAtual.mes,
        pascoaAtual.ano,
      ).dia,
      mes: getDayAndMonth(
        pascoaAtual.dia,
        2,
        '-',
        pascoaAtual.mes,
        pascoaAtual.ano,
      ).mes,
      ano: pascoaAtual.ano,
      tipo: 'Nacional',
    },
    {
      nome: 'Páscoa',
      dia: pascoaDia,
      mes: pascoaMes,
      ano: pascoaAtual.ano,
      tipo: 'Nacional',
    },
    {
      nome: 'Corpus Christi',
      dia: getDayAndMonth(
        pascoaAtual.dia,
        60,
        '+',
        pascoaAtual.mes,
        pascoaAtual.ano,
      ).dia,
      mes: getDayAndMonth(
        pascoaAtual.dia,
        60,
        '+',
        pascoaAtual.mes,
        pascoaAtual.ano,
      ).mes,
      ano: pascoaAtual.ano,
      tipo: 'Nacional',
    },
  ];
  return feriadosMoveisAnoAtual;
};
