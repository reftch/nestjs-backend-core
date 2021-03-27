import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity('APP')
export class ApplicationEntity {

  @PrimaryColumn({ name: 'APPID' })
  id: string;

  @Column({ name: 'PROCESSID'})
  processId: string;

  @Column({ name: 'CMDTYPE'})
  type: string;

  @Column({ name: 'CMDID'})
  config: string;

}