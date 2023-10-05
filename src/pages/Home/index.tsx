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
  TaskInput,
  MinutesAmountInput} from "./styles"

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

  useEffect(()=>{
    if(activeCycle){
      setInterval(()=>{
        setAmountSecondsPassed(
          differenceInSeconds(new Date(),activeCycle.startDate)
          )
        },1000)
    }
  },[activeCycle])
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

    reset()
  }


  console.log(activeCycle)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor (currentSeconds/60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart( 2 , '0')
  const seconds = String(secondsAmount).padStart( 2 , '0')


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
            />


            <label htmlFor="minutesAmount" >durante</label>

            
            <MinutesAmountInput type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={10}
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

          <StartCountDownButton type="submit"  disabled={isSubmitDisabled}>
            <Play size={24}/>
            Começar 
          </StartCountDownButton>

        </form>
      </HomeContainer>
    )
  }