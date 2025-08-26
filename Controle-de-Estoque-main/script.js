
let produtos = [];

function menu() {
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

    switch(opcao) {

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

function cadastrar() {

    let nome = prompt("Nome do produto:");
    let preco = parseFloat(prompt("Preço:"));
    let qtd = parseInt(prompt("Quantidade:"));
    
    let erros = [];

    if(!nome || nome.length < 2) erros.push('❌ Nome não pode estar vazio ou ter menos de 2 caracteres.');
    if(isNaN(preco) || preco <= 0) erros.push('❌ Preço deve ser um número positivo.');
    if(isNaN(qtd) || qtd < 0) erros.push('❌ Quantidade deve ser maior que 0')
    if(erros.length > 0){
        alert(erros.join("\n"));
    }

    if(erros.length === 0){
        produtos.push([nome, preco, qtd]);
        alert("✅ Produto cadastrado!")
    }
}

function buscarNome(matriz, nome){
    return matriz.findIndex(linha => linha[0] === nome)
}

function listar() {

    let texto = "=== Produtos ===\n";

    for(let i=0; i<produtos.length; i++) {

        let [nome, preco, qtd] = produtos[i];
        let alerta = (qtd <= 5) ? " ⚠️ ESTOQUE BAIXO" : "";
        texto += `${i+1}. ${nome} - R$${preco.toFixed(2)} - Qtd: ${qtd}${alerta}\n`;
}
//document.getElementById("saida").textContent = texto;
    alert(texto);
}

function atualizar() {

    listar();
    let indice = parseInt(prompt("Digite o numero do produto para atualizar:")) - 1;

    if(indice >=0 && indice < produtos.length) {

        let [nome, preco, qtd] = produtos[indice];
        let novoNome = prompt("Novo nome:", nome);
        let novoPreco = parseFloat(prompt("Novo preço:", preco));
        let novaQtd = parseInt(prompt("Nova quantidade:", qtd));

        produtos[indice] = [novoNome, novoPreco, novaQtd];
        alert("✅ Produto atualizado!");
    } else {
        alert("❌ Produto não encontrado.");
    }
}

function remover() {

    listar();
    let indice = parseInt(prompt("Digite o numero do produto para remover:")) - 1;

    if(indice >=0 && indice < produtos.length) {
        produtos.splice(indice, 1);
        alert("✅ Produto removido!");
    } else {
        alert("❌ Produto nao encontrado.");
    }
}

function valorTotal() {
    let total = 0;

    for(let i=0; i<produtos.length; i++) {
        total += produtos[i][1] * produtos[i][2];
    }
    alert("Valor total do estoque: R$" + total.toFixed(2));
}

