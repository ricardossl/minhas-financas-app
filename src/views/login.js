import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formgroup";

class Login extends React.Component {
    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log(this.state.email);
        console.log(this.state.senha);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-docs-section">
                            <Card title='Meu cartão'>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: " htmlFor="inputEmail">
                                                    <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o Email"></input>
                                                </FormGroup>

                                                <FormGroup label="Senha: " htmlFor="inputSenha">
                                                    <input value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} type="password" className="form-control" id="inputSenha" placeholder="Digite a Senha"></input>
                                                </FormGroup>

                                                <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                                <button className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default Login;