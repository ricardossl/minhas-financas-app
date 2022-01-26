import React from "react";
import { withRouter } from "react-router-dom";
import LancamentoService from "../../app/service/lancamentoService";
import Card from "../../components/card";
import FormGroup from "../../components/formgroup";
import SelectMenu from '../../components/selectmenu'
import LancamentosTable from './lancamentostable'
import LocalStoreService from "../../app/service/localStorageService";
import * as messages from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'

class ConsultaLancamentos extends React.Component {
    constructor() {
        super()
        this.service = new LancamentoService()
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('Selecione um ano!')
            return false
        }


        const usuarioLogado = LocalStoreService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            tipo: this.state.tipo,
            mes: this.state.mes,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro).then(response => {
            if (response.data.length < 1) {
                messages.mensagemAlerta('Nenhum resultado encontrado')
            }

            this.setState({ lancamentos: response.data })
        }).catch(error => {
            console.log(error)
        })
    }


    prepararDeletar = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDeletar = () => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
    }

    deletar = () => {
        const lancamento = this.state.lancamentoDeletar;
        this.service.deletar(lancamento.id).then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)

            lancamentos.splice(index, 1)

            this.setState({ lancamentos: lancamentos, showConfirmDialog: false, lancamentoDeletar: {} })

            messages.mensagemSucesso('Lançamento deletado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    prepararCadastrar = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status).then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento)

            if (index !== -1) {
                lancamento.status = status
                lancamentos[index] = lancamento
                this.setState({ lancamentos })
            }

            messages.mensagemSucesso('Status atualizado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    render() {
        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipos()

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDeletar} />
            </div>
        );

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: " htmlFor="inputAno">
                                <input className="form-control" type="text" id="inputAno" name="ano" placeholder="Digite o ano" value={this.state.ano} onChange={e => this.setState({ ano: e.target.value })}></input>
                            </FormGroup>

                            <FormGroup label="Descrição: " htmlFor="inputDescricao">
                                <input className="form-control" type="text" id="inputDescricao" name="ano" placeholder="Digite a Descrição"
                                    onChange={e => this.setState({ descricao: e.target.value })}></input>
                            </FormGroup>

                            <FormGroup label="Mês: " htmlFor="inputMes">
                                <SelectMenu lista={meses} className="form-control" id="inputMes" value={this.state.mes} onChange={e => this.setState({ mes: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Tipo de Lançamento: " htmlFor="inputTipo">
                                <SelectMenu lista={tipos} className="form-control" id="inputTipo" value={this.state.tipo} onChange={e => this.setState({ tipo: e.target.value })} />
                            </FormGroup>

                            <button className="btn btn-success" type="button" onClick={this.buscar}><i className="pi pi-search"></i> Buscar</button>
                            <button className="btn btn-danger" type="button" onClick={this.prepararCadastrar}><i className="pi pi-plus"></i> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} editAction={this.editar} deleteAction={this.prepararDeletar} alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Header" visible={this.state.showConfirmDialog} style={{ width: '50vw' }} onHide={() => this.setState({ showConfirmDialog: false })} footer={footer} >
                        <p>Deseja deletar o Lançamento?</p>
                    </Dialog>

                </div>
            </Card >
        )
    }
}

export default withRouter(ConsultaLancamentos)