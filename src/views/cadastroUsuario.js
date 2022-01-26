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



    salvar = () => {
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            senhaRepeticao: this.state.senhaRepeticao
        }

        try {
            this.usuarioService.validar(usuario);
        } catch (erro) {
            const mensagens = erro.msgs
            mensagens.forEach(msg => mensagemErro(msg))
            return false
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

                                <br></br>
                                <button type="button" className="btn btn-success" onClick={this.salvar}><i className="pi pi-save"></i> Salvar</button>
                                <button className="btn btn-danger" onClick={this.cancelar}><i className="pi pi-times"></i> Cancelar</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario);