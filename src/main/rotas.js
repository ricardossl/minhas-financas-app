import React from "react";
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastroLancamentos";
import { AuthConsumer } from "./provedorAutenticacao";

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>


                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}></RotaAutenticada>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos}></RotaAutenticada>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamentos}></RotaAutenticada>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}></Rotas>)
        }
    </AuthConsumer>
);