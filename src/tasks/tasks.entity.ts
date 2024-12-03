import { Column, Entity } from 'typeorm';

@Entity({ name: 'tasks', schema: 'core' })
export class Tasks {
  @Column({ name: 'id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;
}
