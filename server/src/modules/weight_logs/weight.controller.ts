import { FastifyRequest, FastifyReply } from 'fastify'
import { logWeight, getWeightLogs, getWeightLog, updateWeightLog, deleteWeightLog, LogWeightInput } from './weight.service'

export async function logWeightHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const data = await logWeight(userId, request.body as LogWeightInput)
        return reply.status(201).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function getWeightLogsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const data = await getWeightLogs(userId)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function getWeightLogHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const { date } = request.params as { date: string }
        const data = await getWeightLog(userId, date)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function updateWeightLogHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const { date } = request.params as { date: string }
        const { weight } = request.body as { weight: number }
        const data = await updateWeightLog(userId, date, weight)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function deleteWeightLogHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const { date } = request.params as { date: string }
        await deleteWeightLog(userId, date)
        return reply.status(204).send()
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}