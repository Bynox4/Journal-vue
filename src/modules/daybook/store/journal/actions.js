import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi.get('/Entries.json')

    if ( !data ){
        commit('setEntrues', [])
            return 
    }

    const entries = []

    for (const id of Object.keys( data )) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)

}

export const updateEntries = async ({ commit }, entry) => { //entry debe de ser un parametro

    // extraer solo lo que necesitan // -id
    const { text, picture, date } = entry
    const dataToSave = { date, picture, text }
    // await jorunalApi.put( PATH   .json, dataToSave)
    await journalApi.put(`/Entries/${entry.id}.json`, dataToSave )
    // commit de una mutation => updateEntry

    dataToSave.id = entry.id

    // commit('updateEntry', { ...entry })
    commit('updateEntry', { ...dataToSave })
}

export const createEntries = async ({ commit }, entry) => {

    const { text, picture, date } = entry

    const dataToSave = { date, picture, text }

    const { data } = await journalApi.post(`/Entries.json`, dataToSave)


    dataToSave.id = data.name

    commit('addEntries', dataToSave)

    return data.name

}

export const deletyEntries = async ({ commit }, id ) => {

    // await journalApi.delete(path)
    await journalApi.delete(`/Entries/${ id }.json`)

    // commit => 
    commit('deleteEntries', id)

}