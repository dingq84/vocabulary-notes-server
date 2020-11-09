import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'

import { resolvers } from './resolvers'
import { createConnection } from 'typeorm'
import { Server } from 'http'

export const startServer = async (): Promise<Server> => {
	const server = new GraphQLServer({
		typeDefs: './src/schema.graphql',
		resolvers,
	})
	await createConnection()
	const app = await server.start({ endpoint: '/graphql' })
	console.log('Server is running on localhost:4000')
	return app
}

startServer()
