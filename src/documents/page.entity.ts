import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('PAGES')
export class PageEntity {

  @Exclude()
  @PrimaryColumn({ name: 'DOCID' })
  id: string;

  @Column({ name: 'FILENAME'})
  file: string;

  @Column({ name: 'DIRID'})
  directory: string;

  @Transform(spool => spool ? spool.replace(/^.*[\\\/]/, '') : '')
  @Column({ name: 'OUTSPOOLFILENAME'})
  spool: string;

  @Column({ name: 'NUMPAGES'})
  pages: number;

  @Column({ name: 'NUMSHEETS'})
  sheets: number;

  @Column({ name: 'SRCCSVFILENAME'})
  csvFile: string;

  @Column({ name: 'SRCCSVRECORDNO'})
  csvRecord: number;

  @Column({ name: 'PAGEFROM'})
  pageFrom: number;

  @Column({ name: 'PAGETO'})
  pageTo: number;

  @Column({ name: 'OUTSPOOLPAGEFROM'})
  spoolPageFrom: number;

  @Column({ name: 'OUTSPOOLPAGETO'})
  spoolPageTo: number;

  @Column({ name: 'MIXPLEXSEQ'})
  mixplex: string;

  constructor(partial: Partial<PageEntity>) {
    Object.assign(this, partial);
  }

}