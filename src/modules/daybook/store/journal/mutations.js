
// export const myMutation = ( state ) => {

// }

export const setEntries = ( state, entries ) => {

    state.entries = [ ...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = ( state, entry ) => { // entry actualizada

    // state.entries => un arreglo...
    // state.entries.entry.id = [ ...state.entries, ...entry]
    const idx = state.entries.map( e => e.id ).indexOf( entry.id )
    state.entries[idx] = entry

    // state.entries = ...entry

    // state.entries = [ ...entry]

}


export const addEntries = ( state, entry ) => {

    state.entries = [ entry, ...state.entries ]
}

export const deleteEntries = ( state, id ) => {
    // remover del state.entries => 

    state.entries = state.entries.filter( entry => entry.id !== id )

}

export const clearEntries = ( state ) => {
    state.entries = []
}