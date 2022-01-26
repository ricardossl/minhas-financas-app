import React from "react";
import AuthService from "../app/service/authService";
import { AuthConsumer } from "../main/provedorAutenticacao";

import NavBarItem from "./navbarItem";

function Navbar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Usuários" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamentos" label="Lançamentos" />

                        <NavBarItem render={props.isUsuarioAutenticado} href="#/login" label="Sair" onClick={props.deslogar} />
                    </ul>

                </div>
            </div>
        </div>
    )
}


export default () => (
    <AuthConsumer>
        {
            (context) => (<Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}></Navbar>)
        }
    </AuthConsumer>
);