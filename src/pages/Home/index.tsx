import {Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form"
import {HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinutesAmountInput} from "./styles"

export function Home() { 
  const { register,handleSubmit , watch } = useForm()

  const task = watch('task')
  const isSubmitDisabled = !task 

  function handleCreateNewCycle(data:any) {
    console.log(data)
  }

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
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountDownContainer>

          <StartCountDownButton type="submit"  disabled={isSubmitDisabled}>
            <Play size={24}/>
            Começar 
          </StartCountDownButton>

        </form>
      </HomeContainer>
    )
  }