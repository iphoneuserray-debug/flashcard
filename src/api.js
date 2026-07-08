import { Familarity } from "./App/pages/Home"
import { supabase } from "./supabase"

export async function getAll(familarity) {
    let query = supabase.from("words").select()
    if (familarity?.length) query = query.in("familarity", familarity)
    const { data, error } = await query
    if (error) console.log(error)
    return data
}

export async function update(spanish, updateField) {
    const { error } = await supabase
                            .from('words')
                            .update(updateField)
                            .eq('spanish', spanish)
    if (error) console.error(error)
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