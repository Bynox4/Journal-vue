import { shallowMount } from '@vue/test-utils'

import EntryItem from '@/modules/daybook/components/EntryItem.vue'
import { journalState } from "../../../mock-data/test-journal-state"

describe('Pruebas en Entry Component', () => { 

    const mockRouter = {
        push: jest.fn()
    }


    const wrapper = shallowMount( EntryItem, {
        props: { 
            entry: journalState.entries[0]
        },
        global: {
            $router: mockRouter
        }
    })

    
    test('debe de hacer match con el snapshot', () => { 

        expect( wrapper.html() ).toMatchSnapshot()

     })

     test('debe de redireccionar al hacer click en el entry-container', () => { 
        

        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({ 
            name: 'entry',
            params: { 
                id: journalState.entries[0].id 
            } 
        })

      })

      test('pruebas en las propiedades computadas', () => { 
        
        // wrapper.vm. <---- ver las propiedades computadas
        // day: 8
        // mouth: Noviembre
        // yearDay: '2022, Martes'
        expect( wrapper.vm.day ).toBe(10)
        expect( wrapper.vm.month ).toBe('Octubre')
        expect( wrapper.vm.yearDay ).toBe('2022, Lunes')
        // console.log(wrapper.vm.day);
        // console.log(wrapper.vm.month);
        // console.log(wrapper.vm.yearDay);
        
       })


 })