import { IResolvers } from 'graphql-tools'
import { Resolvers } from './types/resolvers-types'

import { Note } from './entities/Note'
import { Sentence } from './entities/Sentence'

export const resolvers: Resolvers & IResolvers = {
	Query: {
		randomNotes: async (_) => {
			const notes = Note.find({ take: 10 })
			return notes
		},
		noteDetail: async (_, { noteId }) => {
			const note = await Note.findOne(noteId, { relations: ['sentences'] })
			if (!note) {
				return {}
			}

			return note
		},
	},
	Mutation: {
		createNote: async (_, { title, url, sentences }) => {
			if (!title) {
				return false
			}

			if (!url) {
				return false
			}

			const note = Note.create({ title, url })

			if (Array.isArray(sentences)) {
				const sentenceInstances = sentences
					.filter(
						(sentence) =>
							Boolean(sentence?.sentence) && Boolean(sentence?.meaning)
					)
					.map((sentence) =>
						Sentence.create({
							meaning: sentence?.meaning,
							sentence: sentence?.sentence,
						})
					)
				console.log(sentenceInstances)
				note.sentences = sentenceInstances
			}
			await note.save()
			return true
		},
		updateNote: async (_, { noteId, title, url, sentences }) => {
			if (!noteId) {
				return false
			}

			const note = await Note.findOne({ id: noteId })

			if (!note) {
				return false
			}

			if (title) {
				note.title = title
			}

			if (url) {
				note.url = url
			}

			if (Array.isArray(sentences)) {
				const sentenceInstances = sentences
					.filter(
						(sentence) =>
							Boolean(sentence?.sentence) && Boolean(sentence?.meaning)
					)
					.map((sentence) =>
						Sentence.create({
							meaning: sentence?.meaning,
							sentence: sentence?.sentence,
						})
					)

				note.sentences = sentenceInstances
			}

			await note.save()
			return true
		},
	},
}
