import { Familarity } from "./App"
import { supabase } from "./supabase"

export async function getAll() { 
    const {data, error} = await supabase.from("words").select("*")
    if (error) console.log(error)
    return data
}

export async function creatOne(word) {
    const row = {
        spanish: word.spanish,
        english: word.english,
        sNote:   word.sNote ?? null,
        eNote:   word.eNote ?? null,
        familarity: Familarity.FORGET
    }
    const { error } = await supabase.from('words').insert(row)
    if (error) {
        throw error
        return null
    }
    return Response.json({ row })
}