import { FastifyInstance } from 'fastify'
import { logWeightHandler, getWeightLogsHandler, getWeightLogHandler, updateWeightLogHandler, deleteWeightLogHandler } from './weight.controller'

export async function weightRoutes(app: FastifyInstance) {
  app.post('/weight', logWeightHandler)
  app.get('/weight', getWeightLogsHandler)
  app.get('/weight/:date', getWeightLogHandler)
  app.patch('/weight/:date', updateWeightLogHandler)
  app.delete('/weight/:date', deleteWeightLogHandler)
}