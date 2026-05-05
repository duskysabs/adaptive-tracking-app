import { FastifyRequest, FastifyReply } from 'fastify'
import { logActivity, getActivityLogs, getActivityLog, updateActivityLog, deleteActivityLog, LogActivityInput } from './activity.service'

export async function logActivityHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const data = await logActivity(userId, request.body as LogActivityInput)
        return reply.status(201).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function getActivityLogsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const data = await getActivityLogs(userId)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function getActivityLogHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const { date } = request.params as { date: string }
        const data = await getActivityLog(userId, date)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function updateActivityLogHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const { date } = request.params as { date: string }
        const data = await updateActivityLog(userId, date, request.body as Partial<LogActivityInput>)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function deleteActivityLogHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const { date } = request.params as { date: string }
        await deleteActivityLog(userId, date)
        return reply.status(204).send()
    } catch (error) {
        const message = error instanceof Error? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}