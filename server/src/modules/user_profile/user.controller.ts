import { FastifyRequest, FastifyReply } from 'fastify'
import { createProfile, getProfile, updateProfile, CreateProfileInput } from './user.service'

export async function createProfileHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id
        const data = await createProfile(userId, request.body as CreateProfileInput)
        reply.status(201).send(data)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        reply.status(500).send({ error: message })
    }
}

export async function getProfileHander(request: FastifyRequest, reply: FastifyReply){
    try {
        const userId = request.user.id
        const data = await getProfile(userId)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}

export async function updateProfileHandler(request: FastifyRequest, reply: FastifyReply){
    try {
        const userId = request.user.id
        const data = await updateProfile(userId, request.body as Partial<CreateProfileInput>)
        return reply.status(200).send(data)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return reply.status(500).send({ error: message })
    }
}