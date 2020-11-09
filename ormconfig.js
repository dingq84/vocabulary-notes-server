const isProd = process.env.NODE_ENV === 'production'
const dir = isProd ? 'dist' : 'src'
const extension = isProd ? 'js' : 'ts'

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
	entities: [`${dir}/entities/**/*.${extension}`],
	migrations: [`${dir}/migrations/**/*.${extension}`],
	cli: {
		entitiesDir: `${dir}/entities`,
		migrationsDir: `${dir}/migrations`,
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
