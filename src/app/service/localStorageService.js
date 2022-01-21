export default class LocalStoreService {
    static adicionarItem(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor))
    }

    static obterItem(chave) {
        return JSON.parse(localStorage.getItem(chave))
    }
}
