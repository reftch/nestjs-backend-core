import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity('COLUMNMAP')
export class FieldEntity {

  @PrimaryColumn({ name: 'COLUMNID' })
  id: string;

  @Column({ name: 'PROCESSID'})
  processId: string;

  @Column({ name: 'ATTRNAME'})
  attributeName: string;

  @Column({ name: 'TYPE'})
  dataType: string;

  @Column({ name: 'LEN'})
  dataSize: number;

  @Column({ name: 'DESCRIPTION'})
  description: string;

}