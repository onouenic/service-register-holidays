export const FeriadosNacionais = [
  {
    nome: 'Confraternização Universal',
    dia: '01',
    mes: '01',
    tipo: 'Nacional',
  },
  {
    nome: 'Tiradentes',
    dia: '21',
    mes: '04',
    tipo: 'Nacional',
  },
  {
    nome: 'Dia do Trabalhador',
    dia: '01',
    mes: '05',
    tipo: 'Nacional',
  },
  {
    nome: 'Independência do Brasil',
    dia: '07',
    mes: '09',
    tipo: 'Nacional',
  },
  {
    nome: 'Nossa Senhora Aparecida',
    dia: '12',
    mes: '10',
    tipo: 'Nacional',
  },
  {
    nome: 'Finados',
    dia: '02',
    mes: '11',
    tipo: 'Nacional',
  },
  {
    nome: 'Proclamação da República',
    dia: '15',
    mes: '11',
    tipo: 'Nacional',
  },
  {
    nome: 'Dia da Consciência Negra',
    dia: '20',
    mes: '11',
    tipo: 'Nacional',
  },
  {
    nome: 'Natal',
    dia: '25',
    mes: '12',
    tipo: 'Nacional',
  },
];

export const FeriadosEstaduais = [
  {
    nome: 'Data Magna do Estado de São Paulo',
    dia: '09',
    mes: '07',
    tipo: 'Estadual',
  },
];

export const FeriadosMunicipais = [
  {
    nome: 'Aniversário de São Paulo',
    dia: '25',
    mes: '01',
    tipo: 'Municipal',
  },
];

export const FeriadosFixos = [
  ...FeriadosNacionais,
  ...FeriadosEstaduais,
  ...FeriadosMunicipais,
];
