import { FastifyInstance } from 'fastify'
import { createProfileHandler, getProfileHander, updateProfileHandler } from './user.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user/profile', createProfileHandler)
  app.get('/user/profile', getProfileHander)
  app.patch('/user/profile', updateProfileHandler)
}