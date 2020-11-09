let settings = {
	name: 'default',
	type: 'postgres',
	host: process.env.HOST,
	port: 5432,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	synchronize: true,
	logging: false,
	// dropSchema: true,
	entities: ['src/entities/**/*.ts'],
	migrations: ['src/migrations/**/*.ts'],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'src/migrations',
	},
}

console.log(process.env.USERNAME)

const database = process.env.DATABASE

if (database) {
	settings = { ...settings, database }
}

const url = process.env.DATABASE_URL
if (url) {
	settings = { ...settings, url }
}

module.exports = settings
