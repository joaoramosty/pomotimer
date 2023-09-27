import {Plus ,Minus  } from "@phosphor-icons/react";
export function Home() {
    return (
      <div>
        <form action="">
        <label htmlFor="text">Vou focar em </label>
        <input id="text" type="text" placeholder="Dê um nome ao seu projeto"/>
        <span>durante</span>
        <input type="number" />
        <button> <Plus size={24}/> </button>
  
        <span>minutos</span>
        <button> <Minus size={24}/> </button>
          <button></button>
        </form>
      </div>
    )
  }