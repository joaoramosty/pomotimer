import { HeaderContainer } from "./styles";
import Logo from "../../assets/images/Logo.svg";
import {Timer,Scroll,User } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
export function Header(){
    return(
        <HeaderContainer>

        <span>
            <img src={Logo} alt="Logo" width="40" height="40"/>
        </span>

         <nav>
            <NavLink title="Timer" to="/"><Timer size={24}/></NavLink>
            {/* <NavLink to="/login"><Timer size={24}/></NavLink> */}
            {/* <NavLink to="/register"><Timer size={24}/></NavLink> */}
            <NavLink title="History" to="/history"><Scroll size={24}/></NavLink>
            <NavLink title="Profile Config" to="/profiles"><User  size={24}/></NavLink>
            
                
        
    
         </nav>

        </HeaderContainer>
    )
}
