import { createStore } from "vuex"

import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mock-data/test-journal-state"
import authApi from "@/api/authApi"


const createVuexStore = ( initialState ) => 
    createStore({
        modules:{
            journal:{
                ...journal,
                state: { ...initialState }
            }
        }
})

describe('Vuex - Pruebas en el Journal Module', () => { 

    beforeAll( async() => {

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)

    })

    // Basicas
    test('este es el estado inicial, debe de tener este state', () => { 

        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeTruthy()
        expect( entries ).toEqual( journalState.entries )
     })

    //  Mutations

     test('mutation: setEntries', () => { 

        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', journalState.entries )

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()

      })

    test('mutation: updateEntry', () => { 

        // create store con entries
        const store = createVuexStore( journalState )
        // updatedEntry
        const updatedEntry = {
            id: 'ABC123',
            date: "Mon Oct 10 2022",
            text: 'Hola mundo desde pruebas'
        }
        // commit de la mutacion
        store.commit('journal/updateEntry', updatedEntry)

        // Expects
        // entries.lenght = 2
        expect( store.state.journal.entries.length ).toBe(2)
        // expect( store.state.journal.entries[0].text ).toEqual( updatedEntry.text )
        // entries tiene que existir updatedEntry toEqual
        const com = store.state.journal.entries.find(entry => entry.id === updatedEntry.id )
        expect( com ).toEqual( updatedEntry )
     })
     
     test('mutation: addEntry deleteEntry', () => { 

        // crear store
        const store = createVuexStore( journalState )
        // const addEntry = { id: 'ABC-147', text: 'Hola Mundo' }
        store.commit('journal/addEntries', { id: 'ABC-147', text: 'Hola Mundo' })

        const sto = store.state.journal.entries
        // Expects
        // entradas sean 3
        expect( sto.length ).toBe(3)
        // entrada con el id ABC-123 exista
        expect( sto.find(e => e.id === 'ABC-147') ).toBeTruthy()

        // deleteEntry, 'ABC-123'
        store.commit('journal/deleteEntries', 'ABC-147' )
        // Expects
        // entradas deben de ser 2
        expect( store.state.journal.entries.length ).toBe(2)
        // entrada con el id ABC-147 no debe de existir
        expect( store.state.journal.entries.find(e => e.id === 'ABC-147') ).toBeFalsy()

      })

    //   Getters 
      test('getters: getEntriesByTerm, getEntriesByID', () => { 

        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        expect( store.getters['journal/getEntriesByTerm']('segunda').length ).toBe(1)

        expect( store.getters['journal/getEntriesByTerm']('segunda') ).toEqual([ entry2 ])

        // ABC123
        expect( store.getters['journal/getEntriesByID']('ABC123') ).toEqual( entry1 )


       })

    // Actions
    test('actions: loadEntries ', async() => { 

        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(3)

     })

     test('actions: updateEntries ', async() => { 

        const store = createVuexStore( journalState )

        const updateEntries = {
            id: 'ABC123',
            date: "Mon Oct 10 2022",
            picture: "https://res.cloudinary.com/dwjodzhlr/image/upload/v1667493822/pmqy0mvyj9ss0tjwkym2.png",
            text: "Hola desde el mock",
            otroCampo: true,
            otroMas: { a: 1 }
        }

        await store.dispatch('journal/updateEntries', updateEntries)

        expect(
            store.state.journal.entries.find( e => e.id === updateEntries.id )
        ).toEqual({
            id: 'ABC123',
            date: "Mon Oct 10 2022",
            picture: "https://res.cloudinary.com/dwjodzhlr/image/upload/v1667493822/pmqy0mvyj9ss0tjwkym2.png",
            text: "Hola desde el mock",
        })

     })

     test('actions: createEntries, deletyEntries ', async() => { 

        // createStore
        const store = createVuexStore( journalState )

        const newEntry = { date: 1667493535046, text: 'Nueva entrada desde las pruebas' }

        // dispatch de la action createEntry

        const id = await store.dispatch('journal/createEntries', newEntry)

        // obtener el id de la nueva entrada
        // el Id debe de ser un String
        expect( typeof id ).toBe('string')

        // la nueva entrada debe de existir en el state.journal.entries....

        expect( store.state.journal.entries.find( e => e.id === id) ).toBeTruthy()
        // # Segunda párte
        // dispatch deleteEntry

        const id2 = await store.dispatch('journal/deletyEntries', id)

        // la nueva entrada No debe de existit en el state.journal.entries...
        expect( store.state.journal.entries.find( e => e.id === id2 ) ).toBeFalsy()

      })


 })