import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity('DIRECTORIES')
export class DirectoryEntity {

  @PrimaryColumn({ name: 'DIRID' })
  id: string;

  @Column({ name: 'PROCESSID'})
  processId: string;

  @Column({ name: 'VALUE'})
  value: string;

  @Column({ name: 'DESCRIPTION'})
  description: string;

}