import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formgroup";
import { withRouter } from "react-router-dom"

class CadastroUsuario extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    salvar = () => {
        console.log(this.state);
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