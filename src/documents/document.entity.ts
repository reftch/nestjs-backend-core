import { Column, Entity, PrimaryColumn, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { PageEntity } from './page.entity';
import { AttributesEntity } from './attributes.entity';
import { Exclude } from 'class-transformer';

@Entity('DOCS')
export class DocumentEntity {

  @Exclude()
  @PrimaryColumn({ name: 'DOCID' })
  id: string;

  @Column({ name: 'SHIPID'})
  mailPiece: string;

  @Column({ name: 'TYPE'})
  type: string;

  @Column({ name: 'STATUS'})
  status: number;

  @Column({ name: 'PRIORITY'})
  priority: number;

  @Column({ name: 'ORDERINSHIPMENT'})
  orderInMailPiece: number;

  @Column({ name: 'DOCUSAGE'})
  usage: string;            

  @Column({ name: 'DOCLINKID'})
  link: string;

  @Column({ name: 'DOCCLASS'})
  class: string;

  @Column({ name: 'IMPDATE'})
  imported: Date;

  @OneToOne(type => PageEntity)
  @JoinTable({name: 'PAGES'})
  @JoinColumn({ name: 'DOCID' })
  binary: PageEntity;

  @OneToOne(type => AttributesEntity)
  @JoinTable({name: 'DOCATTR'})
  @JoinColumn({ name: 'DOCID' })
  attributes: AttributesEntity;

  constructor(partial: Partial<PageEntity>) {
    Object.assign(this, partial);
  }

}