// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
// Autor: Rommel Vieira Carneiro
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('recomend/db/db.json')

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server funcionando!')
})