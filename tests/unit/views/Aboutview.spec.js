
import { shallowMount } from '@vue/test-utils'
import Aboutview from '@/views/Aboutview'

describe('Pruebas en el About View', () => {
  test('debe de renderizar el componente correctamente', () => {

    const wrapper = shallowMount(Aboutview)

    expect(wrapper.html()).toMatchSnapshot()
  })
})