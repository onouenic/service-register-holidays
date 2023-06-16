import { AnosEntity } from 'src/anos/anos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feriado')
export class FeriadosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  data: string;

  @Column()
  tipo: string;

  @ManyToOne(() => AnosEntity, (ano) => ano.feriados)
  @JoinColumn({ name: 'ano_id' })
  anoId: string;
}
