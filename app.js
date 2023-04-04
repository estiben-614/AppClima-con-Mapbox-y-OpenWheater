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
                const lugar=await leerInput()
                //console.log(lugar)
                const lugares=await busqueda.buscarCiudadesPaises(lugar)
                //console.log(lugares)

                const id= await mostrarLugares(lugares)

                if(id!=0){
                    console.log(id.green)
                }
                
            break
            case 2:
            break

        }
        
        
        await pausa()
    }

    while(opcion!=0)
}

main()