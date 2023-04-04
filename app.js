import { leerInput, mostrarLugares, mostrarMenu, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busqueda.js"


const main=async()=>{
let opcion
let id
const busqueda=new Busquedas()
    do{
        opcion=await mostrarMenu()
        switch(opcion){

            case 1:
                //Recibir lugar 
                const lugar=await leerInput()
                //console.log(lugar)

                //Mostrar lugares [{ id,nombre,longitud,latitud}] de cada lugar
                const lugares=await busqueda.buscarCiudadesPaises(lugar)
                //console.log(lugares)

                //seleccionar lugar con menu interactivo, almacena el id de cada lugar
                const id= await mostrarLugares(lugares)

                if(id!=0){
                    //Obtiene la info del lugar seleccionado a partir de su ID {id: ,nombre:, longitud: ,latitud :}
                    const lugarSeleccionadoConId=lugares.find((lugar)=>{
                        return lugar.id==id
                    })
                        //Agrega el lugarSeleccionadoConId al historial
                    busqueda.agregarAlHistorial(lugarSeleccionadoConId)

                    //clima -> Recibe temperatura, temperatura_min, temperatura_max y descripcion
                    const clima=await busqueda.buscarClimaCiudadPais(lugarSeleccionadoConId.latitud,lugarSeleccionadoConId.longitud)

                    //Resultados
                    console.log(`\n Información de la ciudad \n`.green)
                    console.log('Ciudad:' , lugarSeleccionadoConId.nombre.green)
                    console.log('Latitud: ',lugarSeleccionadoConId.latitud.toString().green)
                    console.log('Longitud: ',lugarSeleccionadoConId.longitud.toString().green)
                    console.log('Temperatura: ',clima.temperatura.toString().green)
                    console.log('Miníma: ',clima.temperatura_min.toString().green)
                    console.log('Máxima: ',clima.temperatura_max.toString().green)
                    console.log('Descripción:',clima.descripcion.toString().green)
                }
            
               
            break
            case 2:
                //muestra el historial
                busqueda.mostrarHistorial()

                
            break

        }
        
        
        await pausa()
    }

    while(opcion!=0)
}

main()