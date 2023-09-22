import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { DefaultLayout } from './layouts/DefaultLayout';
export function Router(){
    return(
        // efeito em cadeia para rotas 
        <Routes> 
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/history" element={<History/>}/>
                <Route path="/login" element={<Login/>}
                <Route path="/profiles" element={<Profiles/>}
            </Route>
        </Routes>
    );

}