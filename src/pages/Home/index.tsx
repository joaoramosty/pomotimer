import {Play } from "@phosphor-icons/react";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as zod from "zod"
import {HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinutesAmountInput} from "./styles"
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,"informe a tarefa"),
    MinutesAmount: zod
    .number()
    .min(5)
    .max(90),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle{
  id:string,
  task:string,
  minutesAmount:number,

}


export function Home() {
    
    const [cycles,setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] =useState<string | null >(null)
    const [amountSecondsPassed,setAmountSecondsPassed] = useState(0)

    const {register,handleSubmit,watch,reset} = useForm<NewCycleFormData>({
      resolver:zodResolver(newCycleFormValidationSchema),
      defaultValues:{
        task:'',
        minutesAmount:0,
      }
    })

    function handleCreateNewCycle(data:NewCycleFormData){
      const id = String(new Date().getTime())
      const newCycle:Cycle={
        id,
        task:data.task,
        minutesAmount:data.MinutesAmount,
      }

      setCycles((state) =>[...state,newCycle])
      setActiveCycleId(id)
      

      reset();
    }
    const activeCycle = cycles.find((cycle)=>cycle.id===activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 

    const minutesAmount = Math.floor(currentSeconds/60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2,'0')
    const seconds = String(secondsAmount).padStart(2,'0')

    const task = watch('task')
    const isSubmitDisable = !task

  return (
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>

          <FormContainer>

            <label htmlFor="text">Vou focar em </label>

            <TaskInput 
              id="text" 
              type="text" 
              placeholder="Dê um nome ao seu projeto atual"
              {...register('task')}
            />


            <label htmlFor="minutesAmount" >durante</label>

            {/* <button> <Plus size={24}/> </button> */}
            
            <MinutesAmountInput type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={10}
            min={5}
            max={90}
            {...register('minutesAmount',{valueAsNumber:true})}

            />
            {/* <button> <Minus size={24}/> </button> */}

            <span>minutos.</span>
          
          </FormContainer>

          <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </CountDownContainer>

          <StartCountDownButton disabled={isSubmitDisable} type="submit">
            <Play size={24}/>
            Começar
          </StartCountDownButton>

        </form>
      </HomeContainer>
    )
  }