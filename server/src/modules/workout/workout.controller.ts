import { FastifyRequest, FastifyReply } from 'fastify'
import { logWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout, LogWorkoutInput } from './workout.service'

export async function logWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.id
    const data = await logWorkout(userId, request.body as LogWorkoutInput)
    return reply.status(201).send(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return reply.status(500).send({ error: message })
  }
}

export async function getWorkoutsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.id
    const data = await getWorkouts(userId)
    return reply.status(200).send(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return reply.status(500).send({ error: message })
  }
}

export async function getWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.id
    const { id } = request.params as { id: string }
    const data = await getWorkout(userId, id)
    return reply.status(200).send(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return reply.status(500).send({ error: message })
  }
}

export async function updateWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.id
    const { id } = request.params as { id: string }
    const data = await updateWorkout(userId, id, request.body as Partial<LogWorkoutInput>)
    return reply.status(200).send(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return reply.status(500).send({ error: message })
  }
}

export async function deleteWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.id
    const { id } = request.params as { id: string }
    await deleteWorkout(userId, id)
    return reply.status(204).send()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return reply.status(500).send({ error: message })
  }
}