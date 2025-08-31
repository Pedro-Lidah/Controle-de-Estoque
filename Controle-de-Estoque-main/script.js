let produtos = []; // Matriz para armazenar os produtos.

function menu() { // Função principal do menu para escolha da opção do usuário.

    let opcao;
    do {
        opcao = prompt(
            "Menu:\n" +
            "1 ✏️ - Cadastrar produto\n" +
            "2 🔍 - Listar produtos\n" +
            "3 📥 - Atualizar produto\n" +
            "4 🗑 - Remover produto\n" +
            "5 🖥 - Exibir valor total do estoque\n" +
            "0 - Sair"
        );

    switch(opcao) { // Switch para chamar a função escolhida pelo usuário.

        case "1": 
            cadastrar(); 
            break;

        case "2": 
            listar(); 
            break;

        case "3": 
            atualizar(); 
            break;

        case "4": 
            remover(); 
            break;

        case "5":
             valorTotal(); 
             break;

        case "0": 
            alert("Saindo..."); 
            break;

        default: 
            alert("Opção inválida!");
        }
    } while(opcao !== "0");
}

function cadastrar() { // Função para cadastrar um novo produto.

    let nome = prompt("Nome do produto:");
    let preco = parseFloat(prompt("Preço:"));
    let qtd = parseInt(prompt("Quantidade:"));
    
    // Validação de dados. Em caso de erros, armazena no array erros e exibe no final do prompt.

    let erros = []; 

    let index = buscarNome(produtos, nome);
    if (index !== -1) {
      erros.push('Produto já existe.');
    }

    if(!nome || nome.length < 2) erros.push('❌ Nome não pode estar vazio ou ter menos de 2 caracteres.');
    if(isNaN(preco) || preco <= 0) erros.push('❌ Preço deve ser um número positivo.');
    if(isNaN(qtd) || qtd < 0) erros.push('❌ Quantidade deve ser maior que 0')
    if(erros.length > 0){
        alert(erros.join("\n"));
    }

    if(erros.length === 0){ // Caso o array esteja vazio, cadastra o produto.
        produtos.push([nome, preco, qtd]);
        alert("✅ Produto cadastrado!")
    }
}

function buscarNome(matriz, nome){ // Função para impedir um cadastro duplicado ( Ainda não implementada ).
    return matriz.findIndex(linha => linha[0] === nome)
}

function listar() { // Função para listar os produtos cadastrados.

    let texto = "=== Produtos ===\n";

    for(let i=0; i<produtos.length; i++) {

        let nome = produtos[i][0]; // Atribui as variáveis os valores de cada coluna da matriz.
        let preco = produtos[i][1];
        let qtd = produtos[i][2];

        let alerta = (qtd <= 5) ? " ⚠️ ESTOQUE BAIXO" : "";
        texto += `${i+1}. Produto: ${nome} - Preço: R$${preco.toFixed(2)} - Quantidade: ${qtd}${alerta}\n`;
}
//document.getElementById("saida").textContent = texto; 
    alert(texto);
}

function atualizar() { // Função para atualizar um produto cadastrado.

    // Chama a função listar para mostrar os produtos cadastrados. Pede o número do produto para escolher qual atualizar ( Índice -1 para facilitar o usuário ).
    listar();
    let indice = parseInt(prompt("Digite o numero do produto para atualizar:")) - 1;

    if(indice >=0 && indice < produtos.length) {

        let nome = produtos[indice][0]; 
        let preco = produtos[indice][1];    
        let qtd = produtos[indice][2];

        let novoNome = prompt("Novo nome:", nome);
        let novoPreco = parseFloat(prompt("Novo preço:", preco));
        let novaQtd = parseInt(prompt("Nova quantidade:", qtd)); // Com base no índice, mostra os antigos valores e pede os novos ou mantém os antigos.

        produtos[indice] = [novoNome, novoPreco, novaQtd];
        alert("✅ Produto atualizado!"); 
    } else {
        alert("❌ Produto não encontrado.");
    }
}

function remover() { // Função para remover um produto cadastrado.

    // Chama a função listar para mostrar os produtos cadastrados. Pede o número do produto para escolher qual remover ( Índice -1 para facilitar o usuário ).
    listar();
    let indice = parseInt(prompt("Digite o numero do produto para remover:")) - 1;

    // Com base no índice, remove o produto da matriz utilizando a função splice.
    if(indice >=0 && indice < produtos.length) { 
        produtos.splice(indice, 1);
        alert("✅ Produto removido!");
    } else {
        alert("❌ Produto nao encontrado.");
    }
}

function valorTotal() { // Função para mostrar o valor total do estoque.
    
    let total = 0;

    for(let i=0; i<produtos.length; i++) { // Faz a multiplicação do preco pela quantidade dos produtos e soma no final.
        total += produtos[i][1] * produtos[i][2];
    }
    alert("Valor total do estoque: R$" + total.toFixed(2));
}

