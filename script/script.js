//Acessar api
function acessar_api()
{
    var requestURL = 'https://quiz-trainee.herokuapp.com/questions';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() 
    {
        var questoes = request.response;
        var element = document.getElementById("enviar");
        element.addEventListener("click",() => {
            var valores = element.value.split(":");
            console.log(questoes);
            //console.log(valores);
            valores = proximo_passo(valores,questoes);
            element.value = valores;

        },false);

    }
    

}

//Funcao para mudar a questao atual
function proximo_passo(valores,questoes)//Id_questao varia de 0 a 3
{
    var id_questao = valores[0];
    var pontuacao = valores[1];
    var opcao_marcada = 0; 
    if(id_questao !=0)
    {
        //Encontra a opção marcada e se tiver opção marcada, calcula a pontuação.
        var indice;
        for(var x = 0;x<4;x++)
        {
            if(document.getElementById(`opcao${x+1}`).checked)
            {
                document.getElementById(`opcao${x+1}`).checked = false;
                pontuacao = parseInt(pontuacao) + parseInt(questoes[id_questao-1]["options"][x]["value"]);
                opcao_marcada = 1;
            }
        }
        //Tratar situação em que não há opção marcada
        if(opcao_marcada == 0)
        {
            modificarPeloId("Marque uma opção","aviso");
            return `${parseInt(id_questao)}:${pontuacao}`;
        }
    }
    if(id_questao == 5)
    {
        document.getElementById("alternativas").style.display = "none";
        modificarPeloId(`Quiz encerrado Pontuação: ${pontuacao}`,"aviso");
        return "0:0";
    }
    else
    {
        document.getElementById("alternativas").style.display = "block";
    }
    
    //Muda os dados para a próxima questão
    modificarPeloId(questoes[id_questao]["title"],"pergunta");
    for(var x = 0;x<4;x++)
    {
        modificarPeloId(questoes[id_questao]["options"][x]["answer"],`Label_Opcao_${x+1}`)
    }
    modificarPeloId("","aviso");
    return `${parseInt(id_questao)+1}:${pontuacao}`;
    
}
// Função para mudar o conteúdo de uma tag html pelo id
function modificarPeloId(novo_texto,id)
{
    var elemento = document.getElementById(id);
    elemento.firstChild.nodeValue = novo_texto;
}

function load() 
{
    var el = document.getElementById("enviar");
    el.addEventListener("click", modificarPeloId("teste","pergunta"), false);
}

acessar_api();


  