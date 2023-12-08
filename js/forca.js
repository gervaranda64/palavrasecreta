let jogarNovamente = true;
let tentativas = 5;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSoteada;

let palavraSecretaDica;


const Palavras = [
    palavra001={nome:"MICROSOFT WORD",
     categoria:"CATEGORIA : SOFTWARE APLICATIVO", 
    dica:"Usado para criar, editar, modificar e personalizar diversos tipos de textos."},

    palavra002={nome:"MICROSOFT EXCEL",
     categoria:"CATEGORIA : SOFTWARE APLICATIVO", 
     dica:"é um software de planilhas eletrônicas."},

    palavra003={nome:"WINDOWS", 
     categoria:"CATEGORIA : SOFTWARE SISTEMA", 
     dica:"sistema operacional desenvolvido pela microsoft"},
    
    palavra004={nome:"TECLADO",
     categoria:"CATEGORIA : PERIFÉRICO DE ENTRADA ",
     dica:"Permite a entrada de dados por meio de teclas alfanuméricas."},

    palavra005={nome:"MOUSE", 
    categoria:"CATEGORIA : PERIFÉRICO DE ENTRADA", 
    dica:"Utilizado para movimentar o cursor na tela e realizar seleções"},

    palavra006={nome:"SCANNERS", 
    categoria:"CATEGORIA : PERIFÉRICO DE ENTRADA", 
    dica:"Converte documentos e imagens em formato digital"},

    palavra007={nome:"MONITOR", 
    categoria: "CATEGORIA : PERIFÉRICO DE SAÍDA", 
    dica:"dispositivo principal para exibir informações visuais."},

    palavra008={nome:"PROJETOR", 
    categoria: "CATEGORIA : PERIFÉRICO DE SAÍDA", 
    dica:"Utilizado para projetar imagens ou apresentações em uma tela maior,"},

    palavra009={nome:"WORMS", 
    categoria: "CATEGORIA : MALWARES", 
    dica:"programas que se replicam automaticamente e se espalham pela rede."},

    palavra010={nome:"SPYWARE", 
    categoria: "CATEGORIA : MALWARES", 
    dica:"Coleta informações sobre as atividades do usuário sem o seu conhecimento."},

    palavra011={nome:"KEYLOGGERS", 
    categoria: "CATEGORIA : MALWARES", 
    dica:"Registram as teclas digitadas para capturar informações confidenciais, como senhas."},
]

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexpalavra = parseInt(Math.random() * Palavras.length)

    palavraSecretaSoteada = Palavras[indexpalavra].nome;
    palavraSecretaCategoria = Palavras[indexpalavra].categoria;
    palavraSecretaDica = Palavras[indexpalavra].dica;
} 

montarPalavraTela();
function montarPalavraTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria
    dica.innerHTML = palavraSecretaDica

    const palavraTela = document.getElementById("palavra_secreta");
    palavraTela.innerHTML = "";

    for(i = 0; i < palavraSecretaSoteada.length; i++){
        if(listaDinamica[i] == undefined){
            if(palavraSecretaSoteada[i] == " "){
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }else{
            if(palavraSecretaSoteada[i] == " "){
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }
    }
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0){
        mudarStyleLetra("tecla-" + letra, false)
        comparaListas(letra);
        montarPalavraTela()
    }
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false){
        document.getElementById(tecla).style.background = "red"
        document.getElementById(tecla).style.color = "white"
    }
    else{
        document.getElementById(tecla).style.background = "green"
        document.getElementById(tecla).style.color = "white"
    }
}

async function comparaListas(letra){
    const pos = palavraSecretaSoteada.indexOf(letra)
    if(pos < 0 ){
        tentativas--
        carregarImagemErros();
        if(tentativas == 0){
            abreModal("OPS!!!", "NÃO FOI DESSA VEZ ... A PALAVRA SECRETA ERA : <br>" + "<h1>" + palavraSecretaSoteada + "</h1>")
            piscarBotaoReiniciar()
        }

        
        //verificar se ainda tem tentativas// mensagem de fim
    }
    else{
        mudarStyleLetra("tecla-" + letra, true)
        for(i=0; i<palavraSecretaSoteada.length; i++){
            if(palavraSecretaSoteada[i]==letra){
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for(i=0; i<palavraSecretaSoteada.length; i++){
        if(palavraSecretaSoteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true){
        abreModal("PARABÉNS!!!", "VOCÊ ACERTOU")
        tentativas = 0;
        piscarBotaoReiniciar()
    }
}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))
}

function carregarImagemErros(){
    switch(tentativas){
        case 4:

            document.getElementById('v1').src = "imagens/coracao_vazio.png"

            break;

        case 3:
            document.getElementById('v2').src = "imagens/coracao_vazio.png"
            break;

        case 2:
            document.getElementById('v3').src = "imagens/coracao_vazio.png"
            break;

        case 1:
            document.getElementById('v4').src = "imagens/coracao_vazio.png"
            break;

        default:
            document.getElementById('v5').src = "imagens/coracao_vazio.png"
            break;

    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    })
}

let btnReiniciar = document.querySelector("#botaoReiniciar");
btnReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
})

async function piscarBotaoReiniciar(){
    while(jogarNovamente == true){
        document.getElementById("botaoReiniciar").style.backgroundColor = '#00FF00';
        document.getElementById("botaoReiniciar").style.scale = 1.2;
        await atraso(500)
        document.getElementById("botaoReiniciar").style.backgroundColor = '#FF0000';
        document.getElementById("botaoReiniciar").style.scale = 1.0;
        await atraso(500)
    }
}