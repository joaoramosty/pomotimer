import {Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import {useState , useEffect} from 'react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import {HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
  MinutesAmountInput} from "./styles"
import { HandPalm } from 'phosphor-react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount : zod.number().min(5).max(60),
})

// interface NewCycleFormData{ * outra forma de fazer * 
//   task: string
//   minutesAmount: number 
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id:string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date 
  finishedDate?: Date 

}

export function Home() { 

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId , setActiveCycleId] =  useState<string | null >(null)
  const [amountSecondsPassed , setAmountSecondsPassed] = useState(0)

  const { register,handleSubmit , watch , formState , reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycles)=> cycles.id === activeCycleId )
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

   useEffect(()=>{
    let interval : number;
    if(activeCycle){
      interval = setInterval(()=>{
       const secondsDifference = differenceInSeconds(new Date(),activeCycle.startDate)
        setAmountSecondsPassed(
          secondsDifference
          )

          if(secondsDifference>=totalSeconds){
            setCycles((state)=>
                state.map((cycle)=>{
                  if(cycle.id===activeCycleId){
                    return {...cycle , finishedDate: new Date()}
                  }else{
                    return cycle
                  }
              })
            )
            setAmountSecondsPassed(totalSeconds)
            clearInterval(interval)
          }else{
            setAmountSecondsPassed(secondsDifference)


          }
        },1000)
    }

    return()=>{
      clearInterval(interval)
    }
  },[activeCycle,activeCycleId,finishedDate,totalSeconds])
8
  console.log(formState.errors)

  

  function handleCreateNewCycle(data:NewCycleFormData) {

    const id = String(new Date().getTime())

    const newCycle:Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),

    }

    setCycles((state)=>[...state,newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle(){
    setCycles((state)=>
    state.map((cycle)=>{
        if(cycle.id===activeCycleId){
          return {...cycle , interruptDate: new Date()}
        }else{
          return cycle
        }
      })
    )

    setActiveCycleId(null)

  }

  

  console.log(activeCycle)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor (currentSeconds/60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart( 2 , '0')
  const seconds = String(secondsAmount).padStart( 2 , '0')

  useEffect(()=>{
    if(activeCycle){
      document.title =`${minutes}:${seconds}`
    }else{
      document.title = ''
    }
  },[minutes,seconds,activeCycle])
  const task = watch('task')
  const isSubmitDisabled = !task 
  return (
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} >

          <FormContainer>

            <label htmlFor="text">Vou focar em </label>

            <TaskInput 
              id="task" 
              type="text" 
              placeholder="Dê um nome ao seu projeto atual"
              {...register('task')}
              disabled={!!activeCycle}
            />


            <label htmlFor="minutesAmount" >durante</label>

            
            <MinutesAmountInput type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={10}
            disabled={!!activeCycle}
            {...register('minutesAmount',{valueAsNumber:true})}


            />
            

            <span>minutos.</span>
          
          </FormContainer>

          <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </CountDownContainer>

          {activeCycle ?(
            <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24}/>
            Interromper 
          </StopCountDownButton>
          ):(
            <StartCountDownButton type="submit"  disabled={isSubmitDisabled}>
              <Play size={24}/>
              Começar 
            </StartCountDownButton>
          )}

        </form>
      </HomeContainer>
    )
  }