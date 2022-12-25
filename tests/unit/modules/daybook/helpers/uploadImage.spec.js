import cloudinary from 'cloudinary'
import axios from 'axios'
import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
    cloud_name: 'dwjodzhlr',
    api_key: '313194986254776',
    api_secret: 'mm1TY7mKu8SxIc-noeA8cv8XLeg'
})

describe('Pruebas en el uploadImage', () => { 

    test('debe de cargar un archivo y retorinar el url', async( done ) => { 
        jest.setTimeout(15000)

        const { data } = await axios.get('https://res.cloudinary.com/dwjodzhlr/image/upload/v1667493571/pu6rztfforyqacb7svsm.png',{
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.png')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('String')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.png', '')
        cloudinary.v2.api.delete_resources( imageId, {},  () =>  {
            done()
        })


     })

 })