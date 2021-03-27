import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CUSTOMER')
export class TenantEntity {
  @PrimaryColumn({ name: 'CUSTOMERID' })
  id: string;

  @Column({ name: 'NAME'})
  name: string;

  @Column({ name: 'LINE1'})
  line1: string;

  @Column({ name: 'LINE2'})
  line2: string;

  @Column({ name: 'STREET'})
  street: string;

  @Column({ name: 'CITY'})
  city: string;

  @Column({ name: 'ZIP'})
  zip: string;

  @Column({ name: 'COUNTRY'})
  country: string;

  @Column({ name: 'DESCRIPTION'})
  description: string;

}
