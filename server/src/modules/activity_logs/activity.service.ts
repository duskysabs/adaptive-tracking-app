import { supabase } from "../../db/supabase";
import { Source }  from "../../types";

export type LogActivityInput = {
    steps: number
    activity_score?: number
    source: Source
    date: string
}

export async function logActivity(userId: string, input: LogActivityInput) {
    const { data, error } = await supabase
    .from('activity_logs')
    .insert({ user_id: userId, ...input })
    .select()
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getActivityLogs(userId: string) {
    const { data, error } = await supabase
    .from('activity_logs')
    .select()
    .eq('user_id', userId)
    .order('date', { ascending: false })
    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function getActivityLog(userId: string, date: string) {
    const {data, error} = await supabase
    .from('activity_logs')
    .select()
    .eq('user_id', userId)
    .eq('date', date)
    .single()

    if(error) {
        throw new Error(error.message)
    }
    return data
}

export async function updateActivityLog(userId: string, date: string, input: Partial<LogActivityInput>) {
    const { data, error } = await supabase
    .from('activity_logs')
    .update(input)
    .eq('user_id', userId)
    .eq('date', date)
    .select()
    .single()

    if(error){
        throw new Error(error.message)
    }
    return data
}

export async function deleteActivityLog(userId: string, date: string) {
    const { data, error } = await supabase
    .from('activity_logs')
    .delete()
    .eq('user_id', userId)
    .eq('date', date)

    if(error) {
        throw new Error(error.message)
    }
    return data
}