import { User } from '@supabase/supabase-js'

// ── Fastify augmentation ──────────────────────────────
declare module 'fastify' {
  interface FastifyRequest {
    user: User
  }
}

// ── Enums (mirror your DB) ────────────────────────────
export type GoalRate =
  | 'aggressive_cut'
  | 'moderate_cut'
  | 'slow_cut'
  | 'maintain'
  | 'lean_bulk'
  | 'bulk'

export type Sex = 'male' | 'female'

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

export type UnitsPreference = 'metric' | 'imperial'

export type WorkoutType =
  | 'strength'
  | 'cardio'
  | 'sports'
  | 'conditioning'
  | 'walking'
  | 'running'
  | 'cycling'
  | 'stairmaster'
  | 'other'

export type WorkoutIntensity = 'low' | 'moderate' | 'high'

export type Source =
  | 'manual'
  | 'apple_health'
  | 'google_fit'
  | 'fitbit'
  | 'garmin'
  | 'other'