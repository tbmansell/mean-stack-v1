const ws = require('ws')
const _ = require('lodash')

const clients = []

const packageMessage = (topic, data) => JSON.stringify({ topic, data })

const connect = server => {
    const wss = new ws.Server({ server })
    console.log("Created WebSocketServer")

    wss.on('connection', client => {
        console.log('WSS: connection received')
        broadcast('new client joined')
        clients.push(client)

        client.on('close', () => {
            _.remove(clients, client)
        })

        client.on('message', message => {
            console.log('WSS: message received: ', message)
            //client.send(`You said: "${message}". Received.`)
        })

        client.send(packageMessage('welcome', 'hello'))
    })
};

const broadcast = (topic, data) => {
    const message = packageMessage(topic, data)

    for (const client of clients) {
        client.send(message)
    }
}

module.exports = {
    connect,
    broadcast
}
