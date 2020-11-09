import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { Note } from './Note'

@Entity()
export class Sentence extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	meaning: string

	@Column()
	sentence: string

	@ManyToOne(() => Note, (note) => note.sentences)
	note: Note
}
