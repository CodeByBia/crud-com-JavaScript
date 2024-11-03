import { clienteService } from "../service/cliente-service.js"; // importa o serviço de cliente

( async() => {
    const pegaURL = new URL(window.location); // cria um objeto URL a partir da URL atual da página
    
    const id = pegaURL.searchParams.get('id'); // obtém o parâmetro 'id' da URL
    
    // seleciona os campos de entrada para nome e email
    const inputNome = document.querySelector('[data-nome]');
    const inputEmail = document.querySelector('[data-email]');
    
    try{
        // chama o serviço para obter os detalhes do cliente com o id especificado
        const dados = await clienteService.detalhaCliente(id)
            // preenche os campos de entrada com os dados do cliente
            inputNome.value = dados.nome;
            inputEmail.value = dados.email;
    }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    
    const formulario = document.querySelector('[data-form]') 
    
    formulario.addEventListener('submit', async (evento)=>{
      evento.preventDefault()
    try{
        await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value)
        window.location.href = "../telas/edicao_concluida.html" 
    }
    catch(erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
    })
})()


