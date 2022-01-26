import React from "react";
import CurrencyFormater from 'currency-formatter'

const LancamentosTable = (props) => {
    const rows = props.lancamentos.map(
        lancamento => {
            return (
                <tr key={lancamento.id}>
                    <td>{lancamento.descricao}</td>
                    <td>{CurrencyFormater.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                    <td>{lancamento.tipo}</td>
                    <td>{lancamento.mes}</td>
                    <td>{lancamento.status}</td>
                    <td>
                        <button disabled={lancamento.status !== 'PENDENTE'} title="Efetivar" className="btn btn-success" onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}><i className="pi pi-check"></i></button>
                        <button disabled={lancamento.status !== 'PENDENTE'} title="Canelar" className="btn btn-warning" onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}><i className="pi pi-times"></i></button>
                        <button title="Editar" className="btn btn-primary" onClick={e => props.editAction(lancamento.id)}><i className="pi pi-pencil"></i></button>
                        <button title="Excluir" className="btn btn-danger" onClick={e => props.deleteAction(lancamento)}><i className="pi pi-trash"></i></button>
                    </td>
                </tr>
            )
        }
    )



    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
export default LancamentosTable