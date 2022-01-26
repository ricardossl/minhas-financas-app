import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class LancamentoService extends ApiService {
    constructor() {
        super('/api/lancamentos')
    }

    obterListaMeses() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: '1' },
            { label: 'Fevereiro', value: '2' },
            { label: 'Março', value: '3' },
            { label: 'Abril', value: '4' },
            { label: 'Maio', value: '5' },
            { label: 'Junho', value: '6' },
            { label: 'Julho', value: '7' },
            { label: 'Agosto', value: '8' },
            { label: 'Setembro', value: '9' },
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' }
        ]
    }

    obterListaTipos() {
        return [
            { label: 'Selecione', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]
    }

    consultar(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`

        if (lancamentoFiltro.mes)
            params = `${params}&mes=${lancamentoFiltro.mes}`

        if (lancamentoFiltro.tipo)
            params = `${params}&tipo=${lancamentoFiltro.tipo}`

        if (lancamentoFiltro.status)
            params = `${params}&status=${lancamentoFiltro.status}`

        if (lancamentoFiltro.descricao)
            params = `${params}&descricao=${lancamentoFiltro.descricao}`

        if (lancamentoFiltro.usuario)
            params = `${params}&usuario=${lancamentoFiltro.usuario}`

        return this.get(params)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    salvar(lancamento) {
        return this.post('', lancamento)
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento)
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    alterarStatus(id, status){

         return this.put(`/${id}/atualiza-status`, status)
    }

    validar(lancamento) {
        const errors = [];

        if (!lancamento.descricao)
            errors.push('O campo Descrição é obrigatório!')

        if (!lancamento.ano)
            errors.push('O Ano é obrigatório!')

        if (!lancamento.mes)
            errors.push('O Mês é obrigatório!')

        if (!lancamento.tipo)
            errors.push('O Tipo é obrigatório!')

        if (!lancamento.valor)
            errors.push('O Valor é obrigatório!')        

        if (errors && errors.length > 0)
            throw new ErroValidacao(errors)
    }
}

export default LancamentoService