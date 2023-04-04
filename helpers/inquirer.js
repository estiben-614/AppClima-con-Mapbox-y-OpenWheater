import * as color from 'colors'
import inquirer from 'inquirer'
export const mostrarMenu=async()=>{
    console.clear()
    const choices=[
        {
        name:`${'1.'.green}Buscar ciudad`,
        value:1
    },
        {
        name:`${'2.'.green}Historial`,
        value:2
        },
        {
        name:`${'0.'.green}Salir`,
        value:0
        }]
    
    const questions=[{
        type:'list',
        name:'opcion',
        message:'Seleccione una opción',
        choices
    }]

    const {opcion}=await inquirer.prompt(questions)

    return opcion
    }
export const leerInput=async()=>{
    const questions=[{
        type:'input',
        name:'valorInput',
        message:'Por favor escriba la ciudad/país a buscar :' ,
        validate(value){
            if(value.length!=0){
                return true
            }
            else{
                console.log('\n No ingresó ningun valor'.red)
            }
        }
    }]

    const {valorInput}= await inquirer.prompt(questions)
    return valorInput
}

export const mostrarLugares=async(lugares={})=>{
    const choices=lugares.map((lugar,i)=>{
        let idx=i+1
        return {
            name:`${idx.toString().green} ${lugar.nombre}`,
            value:`${lugar.id}`
        }
    })

    choices.unshift({
        name:`${'0.'.green}Cancelar`,
        value:0
    })
    const questions=[{
        type:'list',
        name:'idLugar',
        message:'Seleccione un lugar',
        choices
    }]

    const {idLugar}= await inquirer.prompt(questions)
    return idLugar
}
export const pausa=async()=>{

    const {opcion}=await inquirer.prompt([{
        type:'input',
        name:`Presione ${'ENTER'.green} para continuar`

    }])

    return opcion
}
