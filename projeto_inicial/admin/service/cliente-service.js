//tudo a ver com a chamada de api fica aqui
// export const listaClientes = () => { //deixando vísivel para os outros arquivos a função

const listaClientes = () => {
    return fetch(`http://localhost:3000/profile`) //faz o get e já retorna a promise
    .then(resposta => { //então, transforma a responsta em json e retorno
        if (resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível listar os clientes')
    })
}
    //exemplo usando xmlhttp
    // const promise = new Promise((resolve, reject) => {
    //     const http = new XMLHttpRequest()
    //     http.open('GET', 'http://localhost:3000/profile')
                
    //     http.onload = () => {
    //         if(http.status >= 400){
    //             reject(JSON.parse(http.response))
    //         }else{
    //             resolve(JSON.parse(http.response))
    //         }
    //        }
    //         http.send()
    // })
    // return promise


const criaCliente = (nome, email) => { 
    return fetch (`http://localhost:3000/profile`, { 
        method: 'POST', // especifica o método HTTP como POST para criar um novo recurso
        headers: { // define os cabeçalhos da requisição
               'Content-Type' : 'application/json' // define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ // transforma os dados em JSON para enviar no corpo da requisição
            nome: nome, // define a propriedade nome com o valor recebido no parâmetro nome
            email: email
            })
        })
        .then( resposta => { // lida com a resposta da requisição usando 
            if(resposta.ok){
                return resposta.body // retorna o corpo da resposta
        }
        throw new Error('Não foi possível listar os clientes')
    })
}

//remove o cliente, passando o endereço o metodo e o id
const removeCliente = (id)=> {
    return fetch (`http://localhost:3000/profile/${id}`, { 
        method: 'DELETE'
    }).then( resposta => {
        if (!resposta.ok){
            throw new Error('Não foi possível remover o clientes')
        }
    })
}

const detalhaCliente = (id) =>{ //pega os dados do cliente pelo id
    return fetch(`http://localhost:3000/profile/${id}`) 
    .then(resposta => { 
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível detalhar o cliente')
    })
}

const atualizaCliente = (id, nome, email) => {
    return fetch (`http://localhost:3000/profile/${id}`, {
        method: 'PUT', 
        headers: { 
            'Content-Type' : 'application/json' 
        },
        body: JSON.stringify({ 
            nome: nome, 
            email: email
         })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível atualizar o cliente')
    })
}

export const clienteService = { //criando um objeto e exportando para ser mais fácil de acessar todas as funcoes em outro arquivo
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}
