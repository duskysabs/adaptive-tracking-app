import { supabase } from "../../db/supabase";
import { GoalRate, Sex, ActivityLevel, UnitsPreference } from "../../types";

export type CreateProfileInput = {
  height: number
  starting_weight: number
  target_weight: number
  sex: Sex
  birthdate: string
  activity_level: ActivityLevel
  units_preference: UnitsPreference
  goal_rate: GoalRate
  timezone?: string
}

export async function createProfile(userId: string, input: CreateProfileInput) {
    const { data, error } = await supabase
    .from('user_profiles')
    .insert({ user_id: userId, ...input })
    .select()
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getProfile(userId: string) {
    const { data, error } = await supabase
    .from('user_profiles')
    .select()
    .eq('user_id', userId)
    .single()

    if(error){
        throw new Error(error.message)
    }

    return data
}

export async function updateProfile(userId: string, input: Partial<CreateProfileInput>) {
    const { data, error } = await supabase
    .from('user_profiles')
    .update(input)
    .eq('user_id', userId)
    .select()
    .single()

    if(error){
        throw new Error(error.message)
    }

    return data
}