import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('DOCATTR')
export class AttributesEntity {

  @Exclude()
  @PrimaryColumn({ name: 'DOCID' })
  id: string;

  @Column({ name: 'COL011' })
  col011: string | undefined;
  @Column({ name: 'COL012'})
  col012: string;
  @Column({ name: 'COL013'})
  col013: string;
  @Column({ name: 'COL014'})
  col014: string;
  @Column({ name: 'COL015'})
  col015: string;
  @Column({ name: 'COL016'})
  col016: string;
  @Column({ name: 'COL017'})
  col017: string;
  @Column({ name: 'COL018'})
  col018: string;
  @Column({ name: 'COL019'})
  col019: string;
  @Column({ name: 'COL020'})
  col020: string;
  @Column({ name: 'COL021'})
  col021: string;
  @Column({ name: 'COL022'})
  col022: string;
  @Column({ name: 'COL023'})
  col023: string;
  @Column({ name: 'COL024'})
  col024: string;
  @Column({ name: 'COL025'})
  col025: string;
  @Column({ name: 'COL026'})
  col026: string;
  @Column({ name: 'COL027'})
  col027: string;
  @Column({ name: 'COL028'})
  col028: string;
  @Column({ name: 'COL029'})
  col029: string;
  @Column({ name: 'COL030'})
  col030: string;

  constructor(partial: Partial<AttributesEntity>) {
    Object.assign(this, partial);
  }

}