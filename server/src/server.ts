import Fastify from 'fastify'
import dotenv from 'dotenv'
import { supabase } from './db/supabase'
import { userRoutes } from './modules/user_profile/user.routes'
import { weightRoutes } from './modules/weight_logs/weight.routes'
import { activityRoutes } from './modules/activity_logs/activity.routes'
import { workoutRoutes } from './modules/workout/workout.routes'

dotenv.config()

const app = Fastify()

app.get('/health', async () => {
  return { status: 'ok' }
})

app.addHook('preHandler', async (request, reply) => {
  const token = request.headers.authorization?.replace('Bearer ', '')
  if (!token) return reply.status(401).send({ error: 'Unauthorized' })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return reply.status(401).send({ error: 'Unauthorized' })

  request.user = data.user
})

app.register(userRoutes)
app.register(weightRoutes)
app.register(activityRoutes)
app.register(workoutRoutes)

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3000 })
    console.log('Server running on port 3000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()