import IFeriadosEntity from 'src/feriados/feriados.interface';

export default interface IAnosEntity {
  id: string;
  ano: string;
  feriados: IFeriadosEntity[];
}
