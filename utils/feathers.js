import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'

const socket = io('https://m-f-api.herokuapp.com/')
const feathersClient = feathers()

feathersClient.configure(auth())
feathersClient.configure(socketio(socket))

export default feathersClient
