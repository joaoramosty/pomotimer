import {Play } from "@phosphor-icons/react";
import {HomeContainer,FormContainer,CountDownContainer,Separator,StartCountDownButton,TaskInput,MinutesAmountInput} from "./styles"
export function Home() {
    return (
      <HomeContainer>
        <form >

          <FormContainer>

            <label htmlFor="text">Vou focar em </label>
            <TaskInput id="text" type="text" placeholder="Dê um nome ao seu projeto"/>


            <label htmlFor="minutesAmount" >durante</label>

            {/* <button> <Plus size={24}/> </button> */}
            
            <MinutesAmountInput type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={5}
            max={60}

            />
            {/* <button> <Minus size={24}/> </button> */}

            <span>minutos.</span>
          
          </FormContainer>

          <CountDownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountDownContainer>

          <StartCountDownButton>
            <Play/>
            Começar
          </StartCountDownButton>

        </form>
      </HomeContainer>
    )
  }