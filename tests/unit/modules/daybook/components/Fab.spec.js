import { shallowMount } from "@vue/test-utils"
import Fab from '@/modules/daybook/components/FabItem'

describe('Pruebas FabComponent', () => { 

    test('debe de mostrar el icono por defecto', () => { 

        // fa-plus

        const wrapper = shallowMount(Fab)

        const icon = wrapper.find('i')

        
        expect(icon.classes('fa-plus')).toBeTruthy()


    })

    test('debe de mostrar el icono por argumento: fa-circle', () => {

        // fa-circle

        const wrapper = shallowMount(Fab, {
            props: { 
                icon: 'fa-circle'
            }
        })

        const icon = wrapper.find('i')

        expect(icon.classes('fa-circle')).toBeTruthy()


    })

    test('debe de emitit el evento on:click cuando se hace click', () => { 

        const wrapper = shallowMount(Fab)

        wrapper.find('button').trigger('click')
        // wrapper.emitted('on:click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)

    })

 })