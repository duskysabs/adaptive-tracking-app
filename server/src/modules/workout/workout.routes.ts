import { FastifyInstance } from 'fastify'
import { logWorkoutHandler, getWorkoutsHandler, getWorkoutHandler, updateWorkoutHandler, deleteWorkoutHandler } from './workout.controller'

export async function workoutRoutes(app: FastifyInstance) {
  app.post('/workout', logWorkoutHandler)
  app.get('/workout', getWorkoutsHandler)
  app.get('/workout/:id', getWorkoutHandler)
  app.patch('/workout/:id', updateWorkoutHandler)
  app.delete('/workout/:id', deleteWorkoutHandler)
}