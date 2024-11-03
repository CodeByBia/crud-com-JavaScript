//percorre o DOM 
import { clienteService } from "../service/cliente-service.js"

const formulario = document.querySelector('[data-form]') // as chaves [] são usadas para selecionar elementos HTML que possuem um atributo específico, no caso, um atributo data-form.

formulario.addEventListener('submit', async (evento)=>{  //evento no submit do form
    evento.preventDefault() //previne o padrão do form de enviar sem verificar as informações
    try{
        const nome = await evento.target.querySelector('[data-nome]').value //armazena valor do input, evento.target acessa o elemento que disparou o evento, melhora a performance e evita confusões 
        const email = await evento.target.querySelector('[data-email]').value

        await clienteService.criaCliente(nome, email) //chama a função e passa os parametros
        window.location.href = '../telas/cadastro_concluido.html' //quando a requisição for feita, manda pra outra tela
    }
     catch(erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
     }
})