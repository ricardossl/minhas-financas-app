import React from "react";

import { withRouter } from 'react-router-dom'
import LancamentoService from "../../app/service/lancamentoService";
import LocalStoreService from "../../app/service/localStorageService";

import Card from '../../components/card'
import FormGroup from "../../components/formgroup";
import SelectMenu from "../../components/selectmenu";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";

class CadastroLancamentos extends React.Component {
    constructor() {
        super()
        this.service = new LancamentoService()
    }

    state = {
        id: null,
        descricao: '',
        ano: '',
        mes: '',
        valor: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.service.obterPorId(params.id).then(response => {
                this.setState({ ...response.data, atualizando: true })
            }).catch(error => {
                mensagemErro(error.response.data)
            })
        }
    }


    salvar = () => {
        const usuarioLogado = LocalStoreService.obterItem('_usuario_logado')
        const { descricao, ano, mes, valor, tipo } = this.state;

        const lancamento = {
            descricao,
            ano,
            mes,
            valor,
            tipo,
            usuario: usuarioLogado.id
        }

        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.msgs

            mensagens.forEach(msg => mensagemErro(msg))
            return false
        }

        this.service.salvar(lancamento).then(response => {
            this.props.history.push('/consulta-lancamentos')
            mensagemSucesso('Sucesso ao salvar o lançamento')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    atualizar = () => {

        const { descricao, ano, mes, valor, tipo, usuario, id, status } = this.state;

        const lancamento = {
            descricao,
            ano,
            mes,
            valor,
            tipo,
            usuario,
            id,
            status
        }

        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.msgs

            mensagens.forEach(msg => mensagemErro(msg))
            return false
        }

        this.service.atualizar(lancamento).then(response => {
            this.props.history.push('/consulta-lancamentos')
            mensagemSucesso('Sucesso ao atualizar o lançamento')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({
            [name]: value
        });
    }

    render() {
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        return (
            <Card title={this.state.atualizando ? 'Atualização de lançamento' : 'Cadastro de lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input type={"text"} className="form-control" id="inputDescricao" name="descricao" value={this.state.descricao} onChange={this.handleChange}></input>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type={"text"} id="inputAno" name="ano" className="form-control" value={this.state.ano} onChange={this.handleChange}></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu lista={meses} id="inputMes" name="mes" className="form-control" value={this.state.mes} onChange={this.handleChange} ></SelectMenu>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: ">
                            <input id="inptuValor" name="valor" className="form-control" value={this.state.valor} onChange={this.handleChange}></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: ">
                            <SelectMenu lista={tipos} name="tipo" className="form-control" id="inputTipo" value={this.state.tipo} onChange={this.handleChange}></SelectMenu>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: ">
                            <input disabled className="form-control" id="inputStatus" value={this.state.status} ></input>
                        </FormGroup>
                    </div>
                </div>

                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.atualizando ? (<button type="button" className="btn btn-success" onClick={this.atualizar}><i className="pi pi-refresh"></i> Atualizar</button>) : (<button type="button" className="btn btn-success" onClick={this.salvar}><i className="pi pi-save"></i> Salvar</button>)
                        }



                        <button type="button" className="btn btn-danger" onClick={e => this.props.history.push('/consulta-lancamentos')}><i className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)
