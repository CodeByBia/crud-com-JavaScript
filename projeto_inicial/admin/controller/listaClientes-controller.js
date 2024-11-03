//tudo que tem a ver com a visualizacao fica aqui
//aqui geramos template, percorremos a árvore do DOM, pegamos promise de lista clientes e mostramos na tela com o do forEach e appendChild

import { clienteService } from "../service/cliente-service.js"
const criaNovaLinha = (nome, email, id) => {
    // cria um novo elemento de linha para a tabela
    const linhaNovoCliente = document.createElement('tr');
    // define o conteúdo HTML da nova linha, incluindo nome, email e botões
    const conteudo = `
                    <td class="td" data-td>${nome}</td>
                     <td>${email}</td>
                     <td>
                      <ul class="tabela__botoes-controle">
                        <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                        <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                     </ul>
                     </td>
                `;
    // atribui o conteúdo HTML à nova linha
    linhaNovoCliente.innerHTML = conteudo;
    // define o id da linha para referência futura. dataset é uma forma de acessar atributos personalizados (data-*) de um elemento HTML em JavaScript.
    linhaNovoCliente.dataset.id = id;
    
    return linhaNovoCliente; // retorna a nova linha criada
}

const tabela = document.querySelector('[data-tabela]')

//deletarCliente
tabela.addEventListener('click', async (evento) => {
    // verifica se o botão clicado é o de deletar
    let ehBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir';
    if (ehBotaoDeletar) {
        try {
            // encontra a linha do cliente mais próxima do botão clicado pra apagar do html
            const linhaCliente = evento.target.closest('[data-id]');
            // obtém o id do cliente da linha
            let id = linhaCliente.dataset.id;
            await clienteService.removeCliente(id) // chama o serviço para remover o cliente
            linhaCliente.remove(id); // remove a linha do cliente da tabela
        }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }
});

const render = async () =>{
    try{
        const listaClientes = await clienteService.listaClientes() // chama o serviço para listar os clientes
            // percorre cada cliente retornado
            listaClientes.forEach(elemento => {
                // adiciona uma nova linha à tabela com os dados do cliente
                tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id));
            });
    }
    catch(erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'  
    }
};
    
render()
