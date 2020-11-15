import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { Sentence } from './Sentence'

@Entity()
export class Note extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Index({ fulltext: true })
	@Column('varchar', { length: 100 })
	title: string

	@Column()
	url: string

	@Column('int', { default: 0 })
	searchCount: number

	@CreateDateColumn()
	createDate: string

	@UpdateDateColumn()
	updateDate: string

	@OneToMany(() => Sentence, (sentence) => sentence.note, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	sentences: Sentence[]
}
