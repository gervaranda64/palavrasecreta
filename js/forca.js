let jogarNovamente = true;
let tentativas = 5;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSoteada;

const Palavras = [
    palavra001={nome:"MONITOR", categoria:"HARDWARE"},
    palavra002={nome:"TECLADO", categoria:"HARDWARE"},
    palavra003={nome:"GABINETE", categoria:"HARDWARE"},
    palavra003={nome:"PLACA MAE", categoria:"HARDWARE"},
    palavra004={nome:"DRIVE", categoria:"SOFTWARE"},
    palavra005={nome:"WINDOWS", categoria:"SOFTWARE"},
    palavra006={nome:"LINUX", categoria:"SOFTWARE"},
]

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexpalavra = parseInt(Math.random() * Palavras.length)

    palavraSecretaSoteada = Palavras[indexpalavra].nome;
    palavraSecretaCategoria = Palavras[indexpalavra].categoria;
} 

montarPalavraTela();
function montarPalavraTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria

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
        abreModal("PARABENS!!!", "VOCE ACERTOU")
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
            document.getElementById("imagem").style.background = "url('./imagens/Errado.jpg')";
            break;

        case 3:
            document.getElementById("imagem").style.background = "url('./imagens/imagem1.png')";
            break;

        case 2:
            document.getElementById("imagem").style.background = "url('./imagens/Errado2.png')";
            break;

        case 1:
            document.getElementById("imagem").style.background = "url('./imagens/Erro.png')";
            break;

        default:
            document.getElementById("imagem").style.background = "url('imagens/Erro.png')";
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