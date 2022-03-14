const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
server.use(jsonServer.bodyParser)
server.use(middlewares)

const db = {
	users: [
		{
			id: 0,
			login: "foo",
			passwd: "bar"
		}
	],
	contacts: [
		{
			id: 0,
			tel: 79992648010
		},
		{
			id: 1,
			tel: 74843778264
		},
		{
			id: 2,
			tel: 72791591775
		},
		{
			id: 3,
			tel: 74355039412
		},
		{
			id: 4,
			tel: 78161916336
		}
	]
}

const router = jsonServer.router(db)

server.post('/login', (req, res) => {
	const [login, passwd] = req.headers.authorization.split(' ')
	res.json(!!db.users.find((user) => user.login === login && user.passwd === passwd))
})

server.post('/register', (req, res) => {
	const [login, passwd] = req.headers.authorization.split(' ')
	if (db.users.find(user => user.login === login)) {
		res.json(false)
	} else {
		db.users.push({id: db.users.length, login, passwd})
		res.json(true)
	}
})

server.post('/addcontact', (req, res) => {
	const tel = parseInt(req.headers.data)
	if (db.contacts.find(contact => contact.tel === tel)){
		res.json(false)
	} else {
		db.contacts.push({id: db.contacts.length, tel})
		res.json(true)
	}
})

server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = Date.now()
	}
	next()
})

server.use(router)
server.listen(3001, () => {
	console.log('JSON Server is running')
})