import { supabase } from '../../db/supabase'
import { WorkoutType, WorkoutIntensity, Source } from '../../types'

export type LogWorkoutInput = {
    type: WorkoutType
    duration_minutes: number
    intensity: WorkoutIntensity
    source: Source
    started_at: string
}

const MET: Record<WorkoutIntensity, number> = {
    low: 3,
    moderate: 5,
    high: 8
}

async function estimateCalories(userId: string, duration_minutes: number, intensity: WorkoutIntensity): Promise<number> {
  const { data } = await supabase
    .from('weight_logs')
    .select('weight')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(1)
    .single()

  const weight_kg = data?.weight ?? 70  // fall back to 70 if no weight logged yet
  const met = MET[intensity]
  return Math.round((met * weight_kg * duration_minutes) / 60)
}

export async function logWorkout(userId: string, input: LogWorkoutInput) {
    const calories_estimate = await estimateCalories(userId, input.duration_minutes, input.intensity)
    const { data, error } = await supabase
    .from('workouts')
    .insert({ user_id: userId, ...input, calories_estimate })
    .select()
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getWorkouts(userId: string) {
    const { data, error } = await supabase
    .from('workouts')
    .select()
    .eq('user_id', userId)
    .order('started_at', { ascending: false })

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getWorkout(userId: string, id: string) {
    const { data, error } = await supabase
    .from('workouts')
    .select()
    .eq('user_id', userId)
    .eq('id', id)
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function updateWorkout(userId: string, id: string, input: Partial<LogWorkoutInput>) {
  const calories_estimate = input.duration_minutes && input.intensity
    ? await estimateCalories(userId, input.duration_minutes, input.intensity)
    : undefined

  const { data, error } = await supabase
    .from('workouts')
    .update({ ...input, ...(calories_estimate && { calories_estimate }) })
    .eq('user_id', userId)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteWorkout(userId: string, id: string) {
    const { data, error } = await supabase
    .from('workouts')
    .delete()
    .eq('user_id', userId)
    .eq('id', id)

    if(error) {
        throw new Error(error.message)
    }
}