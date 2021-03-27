import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('PROCESSUNIT')
export class ProcessEntity {
  @PrimaryColumn({ name: 'PROCESSID' })
  id: string;

  @Column({ length: 255, name: 'CUSTOMERID' })
  tenant: string;

  @Column({ name: 'VERSIONINFO' })
  version: string;

  @Column({ name: 'SYSTEMINFO' })
  system: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;
}
