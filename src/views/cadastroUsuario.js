import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formgroup";
import { withRouter } from "react-router-dom"
import UsuarioService from "../app/service/usuarioService";
import { mensagemErro, mensagemSucesso } from "../components/toastr";

class CadastroUsuario extends React.Component {
    constructor() {
        super()
        this.usuarioService = new UsuarioService();
    }

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    validar() {
        const mensagens = [];

        if (!this.state.nome)
            mensagens.push('O campo nome é obrigatório!')

        if (!this.state.email)
            mensagens.push('O email é obrigatório!')

        if (!this.state.email)
            mensagens.push('O campo email é obrigatório')
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/))
            mensagens.push('Informe um email válido')

        if (!this.state.senha || !this.state.senhaRepeticao)
            mensagens.push('Digite a senha')
        else if (this.state.senha !== this.state.senhaRepeticao)
            mensagens.push('As senhas não coincidem.')

        return mensagens;
    }

    salvar = () => {
        const mensagens = this.validar();
        if (mensagens && mensagens.length > 0) {
            mensagens.forEach(msg => mensagemErro(msg))
            return false
        }


        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.usuarioService.salvar(usuario).then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema!')
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (

            <Card title="Cadastro de Usuário">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input className="form-control" type="text" id="inputNome" name="nome" onChange={e => this.setState({ nome: e.target.value })}></input>
                                </FormGroup>

                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input className="form-control" type="email" id="inputEmail" name="email" onChange={e => this.setState({ email: e.target.value })}></input>
                                </FormGroup>

                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input className="form-control" type="password" id="inputSenha" name="senha" onChange={e => this.setState({ senha: e.target.value })}></input>
                                </FormGroup>

                                <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                    <input className="form-control" type={"password"} id="inputSenhaRepeticao" name="senhaRepeticao" onChange={e => this.setState({ senhaRepeticao: e.target.value })}></input>
                                </FormGroup>


                                <button type="button" className="btn btn-success" onClick={this.salvar}>Salvar</button>
                                <button className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario);