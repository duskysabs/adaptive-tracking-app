import { FastifyInstance } from 'fastify'
import { logActivityHandler, getActivityLogsHandler, getActivityLogHandler, updateActivityLogHandler, deleteActivityLogHandler } from './activity.controller'

export async function activityRoutes(app: FastifyInstance) {
    app.post('/activity', logActivityHandler)
    app.get('/activity', getActivityLogsHandler)
    app.get('/activity/:date', getActivityLogHandler)
    app.patch('/activity/:date', updateActivityLogHandler)
    app.delete('/activity/:date', deleteActivityLogHandler)
}