import axios from "axios";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export class Busquedas {
    constructor(){

    }
    get parametrosMapbox(){
        return{
            'limit':'5',
            'proximity':'ip',
            'language':'es',
            'access_token':process.env.TOKEN_KEY
        }
        
    }
    async buscarCiudadesPaises(ciudadPais=''){
        try{
            const instance=axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudadPais}.json`,
                params:this.parametrosMapbox
            })

            const lugares=await instance.get()
            //El () luego del => indican que me va a devolver un objeto, es como si pusiera un return {}
            return lugares.data.features.map(lugar=>({
                id:lugar.id,
                nombre:lugar.place_name,
                longitud:lugar.center[0],
                latitud:lugar.center[1]
            }))
        }
        catch(error){
            console.log('No se encontró nada')
        }
    }
}