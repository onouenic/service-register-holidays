import { FeriadosEntity } from 'src/feriados/feriados.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ano')
export class AnosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ano: number;

  @OneToMany(() => FeriadosEntity, (feriado) => feriado.anoId)
  feriados: FeriadosEntity[];
}
