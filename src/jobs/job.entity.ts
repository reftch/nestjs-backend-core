import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('JOB')
export class JobEntity {
  @PrimaryColumn({ name: 'JOBID' })
  id: string;

  @Column({ name: 'PROCESSID'})
  processId: string;

  @Column({ name: 'JOBCLASSID'})
  class: string;

  @Column({ name: 'STATE'})
  state: number;

  @Column({ name: 'NUMPAGES'})
  pages: number;

  @Column({ name: 'NUMSHEETS'})
  sheets: number;

  @Column({ name: 'NUMDOCUMENTS'})
  documents: number;

  @Column({ name: 'CREATIONDATETIME'})
  created: Date;

  @Column({ name: 'SUBCLASS'})
  subClass: string;

  @Column({ name: 'JOBINFO'})
  jobInfo: string;

  @Column({ name: 'JOBCOMMENT'})
  jobComment: string;

  @Column({ name: 'USERFIELD0'})
  userField0: string;

  @Column({ name: 'USERFIELD1'})
  userField1: string;
  
  @Column({ name: 'USERFIELD2'})
  userField2: string;

  @Column({ name: 'USERFIELD3'})
  userField3: string;

  @Column({ name: 'USERFIELD4'})
  userField4: string;

  @Column({ name: 'USERFIELD5'})
  userField5: string;

  @Column({ name: 'USERFIELD6'})
  userField6: string;

  @Column({ name: 'USERFIELD7'})
  userField7: string;

  @Column({ name: 'USERFIELD8'})
  userField8: string;

  @Column({ name: 'USERFIELD9'})
  userField9: string;

  @Column({ name: 'WORKFLOWID'})
  workflowId: string;

  @Column({ name: 'NUMDOCSPHYSINSERTS'})
  physicalInsertDocuments: number;

  @Column({ name: 'NUMDOCSCOVERSHEETS'})
  coverSheetDocuments: number;

  @Column({ name: 'NUMSHEETSELECINSERTS'})
  electronicInsertSheets: number;

  // @ManyToMany(type => DocumentEntity)
  // @JoinTable({
  //   name: "DOCJOB", 
  //   joinColumn: {
  //       name: "JOBID",
  //       referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //       name: "DOCID",
  //       referencedColumnName: "id"
  //   }
  // })
  // docs: DocumentEntity[]

}
