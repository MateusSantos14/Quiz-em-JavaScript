window.pontuacao = 0;
window.questao = 0;

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
            valores = proximo_passo(questoes);

        },false);

    }
    

}

//Funcao para mudar a questao atual
function proximo_passo(questoes)//Id_questao varia de 0 a 3
{
    var opcao_marcada = 0; 
    if(questao > 0 && questao<5)
    {
        //Encontra a opção marcada e se tiver opção marcada, calcula a pontuação.
        for(var x = 0;x<4;x++)
        {
            if(document.getElementById(`opcao${x+1}`).checked)
            {
                document.getElementById(`opcao${x+1}`).checked = false;
                console.log(questoes[questao-1]["options"][x]);
                pontuacao = parseInt(pontuacao) + parseInt(questoes[questao-1]["options"][x]["value"]);
                opcao_marcada = 1;
            }
        }
        //Tratar situação em que não há opção marcada
        if(opcao_marcada == 0)
        {
            modificarPeloId("Marque uma opção","aviso");
            return 0;
        }
    }
    if(questao == 5)
    {
        questao = 0;
        document.getElementById("alternativas").style.display = "none";
        modificarPeloId(`Quiz encerrado Pontuação: ${pontuacao}`,"aviso");
        return 0;
    }
    else
    {
        document.getElementById("alternativas").style.display = "block";
    }
    
    //Muda os dados para a próxima questão
    modificarPeloId(questoes[questao]["title"],"pergunta");
    for(var x = 0;x<4;x++)
    {
        modificarPeloId(questoes[questao]["options"][x]["answer"],`Label_Opcao_${x+1}`)
    }
    modificarPeloId("","aviso");
    modificarPeloId(questao,"aviso");
    questao++;
    return 0;
    
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


  