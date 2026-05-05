import { supabase } from "../../db/supabase";

export type LogWeightInput = {
    weight: number
    date: string
}

export async function logWeight(userId: string, input: LogWeightInput) {
    const { data, error } = await supabase
    .from('weight_logs')
    .insert({ user_id: userId, ...input })
    .select()
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getWeightLogs(userId: string) {
    const { data, error } = await supabase
    .from('weight_logs')
    .select()
    .eq('user_id', userId)
    .order('date', { ascending: false })

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getWeightLog(userId: string, date: string){
    const {data, error} = await supabase
    .from('weight_logs')
    .select()
    .eq('user_id', userId)
    .eq('date', date)
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function updateWeightLog(userId: string, date: string, weight: number) {
    const { data, error } = await supabase
    .from('weight_logs')
    .update({weight})
    .eq('user_id', userId)
    .eq('date', date)
    .select()
    .single()

    if(error){
        throw new Error(error.message)
    }
    return data
}

export async function deleteWeightLog(userId: string, date: string) {
    const { data, error } = await supabase
    .from('weight_logs')
    .delete()
    .eq('user_id', userId)
    .eq('date', date)

    if(error){
        throw new Error(error.message)
    }
}