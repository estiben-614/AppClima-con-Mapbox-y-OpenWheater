import axios from "axios";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import * as fs from 'fs'


export class Busquedas {
    dbPath='./database/database.json'
    historial=[]
    constructor(){
        //Se ejecuta leer cada vez que creamos una clase Busquedas, en nuestro codigo solo sucede una vez
        this.leerDB()
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


    async buscarClimaCiudadPais(latitud,longitud){
        const paramsOpenWhater={

            'lat':latitud,
            'lon':longitud,
            'appid':process.env.MAPBOX_KEY,
            'lang':'es',
            'units':'metric'
        }

        const instance= axios.create({
            baseURL:'https://api.openweathermap.org/data/2.5/weather',
            params:paramsOpenWhater
        })
        //Hace la solicitud al servidor
        const respuestaClima=await instance.get()

        //Guarda solo la info dentro de la propiedad .data de respuestaClima
        const data= respuestaClima.data
        
        //Almacena solo lo que está dentro de weather y main de la data
        const {weather,main}=data

       
        return {
            temperatura:main.temp,
            temperatura_min:main.temp_min,
            temperatura_max:main.temp_max,
            descripcion:weather[0].description //wather es un arreglo, por eso [0]
        }
    }

    agregarAlHistorial(lugar=''){
        
        //Si en el historial =[] existe ya un lugar con ese mismo nombre, no lo guarda
        if(this.historial.includes(lugar.nombre)){
            return null
        }
        else{
            //Muestra solo los primeros 5 lugares del historial
            this.historial=this.historial.splice(0,4)

            //lugar es lugarSeleccionadoConId el cual tiene la propiedad .nombre
            this.historial.unshift(lugar.nombre)
            //Invoca guardar
            this.guardarDB()
        }
       
    }

    mostrarHistorial(){
        this.historial.forEach((nombreLugar,id)=>{
            let idx=id+1+'.'
            console.log( `${idx.toString().green} ${nombreLugar}`)
        })
    }

    guardarDB(){

        const payload={
            historial:this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload)) //Se convierte el payload en un string
    }
    leerDB(){
        //Si no existe ningun archivo en la ruta dbPath no hace nada
        if(!fs.existsSync(this.dbPath)){
            return
        }

        else{
            //Si existe, lo lee
            const info=fs.readFileSync(this.dbPath,{encoding:'utf-8'})
            //Info es un array, JSON.parse() lo convierte en un JSON
            const data=JSON.parse(info)
            //data es un JSON con la propiedad .historial, lo que hay dentro se lo asignamos a nuestro historial
            this.historial=data.historial

            return this.historial
        }
    }

}