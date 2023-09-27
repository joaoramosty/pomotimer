import { HeaderContainer } from "./styles";
import Logo from "../../assets/images/Logo.svg";
import {Timer,Scroll} from "@phosphor-icons/react";
export function Header(){
    return(
        <HeaderContainer>

        <span>
            <img src={Logo} alt="Logo" width="40" height="40"/>
        </span>

         <nav>
            <Timer size={24}/>
            <Scroll size={24}/>
                
        
            <a href="">
                History
            </a>
            <a href="">
                Profiles
            </a>
         </nav>

        </HeaderContainer>
    )
}
