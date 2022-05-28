//Variavel global do jogo
var jogoPausado = false;
var modal = "";
var vidas = 3;
var acertos = 0;
var mensagem_acertar = `Parabéns, você descartou corretamente! Descartar corretamente contribuiu para que
    seu resíduo não fosse destinado no lugar inadqueado e sem contaminação ao meio ambiente
`;

var mensagem_errar = `Infelizmente, você descartou incorretamente! Descartar incorretamente contribuiu para que
    seu resíduo fosse destinado no lugar inadqueado e contaminado o meio ambiente
`;

$(document).ready(function(){
    
    //inicializa avatar
    document.querySelector("#caixa-questao").style.display = "none"; // Caixa de Questão
    document.querySelector("#avatar").style.marginLeft = "70px";
    document.querySelector("#residuo").style.marginLeft = `${window.innerWidth + 70}px`;
    document.querySelector("#animal").style.marginLeft = `${window.innerWidth + 100}px`;
    document.querySelector("#residuo2").style.marginLeft = `${window.innerWidth + 900}px`;
    document.querySelector("#chao").style.backgroundPosition = "1px";
    
  
    

    //Quando o modal é exibido e o jogador pressiona o botao correto
    $("#btn1").click(function(){

        esconderBotoes();
        document.querySelector('#questao').textContent = mensagem_acertar;
        document.querySelector('#imagem-questao').src = `./assets/images/acertou.jpeg` ;  
        setInterval(() => {            
            jogoPausado = false;
            ganharVidas();
            document.querySelector("#caixa-questao").style.display = "none";
            esconderBotoes(false);
             
        }, 9000);

       
    })

    //Quando o modal é exibido e o jogador pressiona o botao errado

    $("#btn2").click(function(){         
       
        esconderBotoes();
        document.querySelector('#questao').textContent = mensagem_errar;
        document.querySelector('#imagem-questao').src = `./assets/images/errou.jpeg` ;
        setTimeout(() => {
            jogoPausado = false;
            perderVidas();
            document.querySelector("#caixa-questao").style.display = "none";
            esconderBotoes(false);
        }, 9000);

    })

    //Adiciona animacao
   
    setInterval(moveChao, 450); 

    setInterval(pegouResiduo,100);

    /**
     * Níveis de tempo
     * Fácil: 450
     */   
})


function esconderBotoes(devoEsconder = true){

    if(devoEsconder){
        document.querySelector("#btn1").style.display = "none";
        document.querySelector("#btn2").style.display = "none";
    }
    else{
        document.querySelector("#btn1").style.display = "block";
        document.querySelector("#btn2").style.display = "block";
    }
   
}


//Movimenta avatar
document.addEventListener("keydown",function(e){

    if(e.keyCode == 37){
        voltarAvatar();      
    }
})

document.addEventListener("keydown",function(e){

    if(e.keyCode == 38){
       pular();
    }
})

document.addEventListener("keydown",function(e){

    if(e.keyCode == 39){
        avancarAvatar();        
    }
})

function ganharVidas(){
    if(vidas < 3){
        if(vidas === 2){
            document.querySelector('#coracao').src = `./assets/images/coracao_cheio.png` ;
        }
        else if(vidas === 1){
            document.querySelector('#coracao').src = `./assets/images/coracao_1_vazio.png` ;
        }

        acertos++;       
        vidas++;
        document.querySelector('#pontuacao').textContent = `${acertos}`;
    }        
}

function perderVidas(){

    if((vidas - 1 ) > 0){
        if(vidas === 3){
            document.querySelector('#coracao').src = `./assets/images/coracao_1_vazio.png` ;
        }
        else if(vidas === 2){
            document.querySelector('#coracao').src = `./assets/images/coracao_2_vazio.png` ;
        }
        vidas--;
    }    
    else{
        document.querySelector('#coracao').src = `./assets/images/coracao_vazio.png` ;
        location.href = "game_over.html";
    }  
}


function pegouResiduo(){

    if(!jogoPausado){    
        let posicaoAvatar = posicaoAtualAvatar();
        let posicaoResiduo = posicaoAtualResiduo();   
        let posicaoResiduo2 = posicaoAtualResiduo2();  
        let posicaoAnimal = posicaoAtualAnimal(); 
        let alturaAvatar = document.querySelector("#avatar-kezia").style.marginTop;
     
        
        if( posicaoAvatar > (posicaoResiduo - 7)
            && posicaoAvatar <  (posicaoResiduo + 7)   
            && alturaAvatar != "-200px"
            ){       
            novaPosicaoResiduo();  //Ganhou 
            jogoPausado = true;   
            
            montarItensModal();
        }   

        if( posicaoAvatar > (posicaoResiduo2 - 20) 
            && posicaoAvatar <  (posicaoResiduo2 + 20)
            && alturaAvatar != "-200px"
            ){     
              
            novaPosicaoResiduo2();   
        }   

        if (posicaoAvatar > (posicaoAnimal - 35)
            && posicaoAvatar <  (posicaoAnimal + 35)
            && alturaAvatar != "-200px"
            ){       
            perderVidas();  
            novaPosicaoAnimal(); //Perdeu           
        }   

        if (posicaoResiduo < 0 || posicaoResiduo < 0){       
            novaPosicaoResiduo();
            novaPosicaoResiduo2();  
            perderVidas();  //Perdeu      
        }   
    }
}


function montarItensModal(){
    let posResiduoAleatorio = 0;
    //Gerar uma número para pegar um residuo aleatório
    posResiduoAleatorio = Math.round(Math.random() * ((questionario.length - 1) - 1) + 1) ;
    
    /**
     * Aqui é exibido o modal
     */
    document.querySelector("#caixa-questao").style.display = "block"; //Exibi caixa de questão
    document.querySelector('#questao').textContent = questionario[posResiduoAleatorio].pergunta;
    document.querySelector('#imagem-questao').src = `./assets/images/${questionario[posResiduoAleatorio].imagemPergunta}.png` ;
    document.querySelector('#btn1').style.backgroundColor = `${questionario[posResiduoAleatorio].corSelectivaCorreta}`;
    document.querySelector('#btn2').style.backgroundColor = `${questionario[posResiduoAleatorio].corSelectivaErrada}`;

   
    //Alterar as posições dos botão se par ou ímpar
    if(posResiduoAleatorio % 0){        
        document.querySelector('#colOrder').classList.add('order-1');
    }
    else{
        document.querySelector('#colOrder').classList.remove('order-1');
    }
}


function pular(){    

    

    let avatar = document.querySelector("#avatar-kezia");  

    // posicao = avatar.style.marginTop;   
    // posicaoSemPx = parseInt(posicao.replace("px",""));  

    avatar.style.marginTop = `-${200}px`;  
    
    setTimeout(function(){
        avatar.style.marginTop = `${0}`;  
    }, 500)
  
}


function avancarAvatar(){    

    let avatar = document.querySelector("#avatar");    
    const novaPosicao = posicaoAtualAvatar() + 10;

    avatar.style.transform = "scaleX(1)";

    if(novaPosicao <= (window.innerWidth - 30)){
        avatar.style.marginLeft = `${novaPosicao}px`
    }   
}


function voltarAvatar(){    

    let avatar = document.querySelector("#avatar"); 
    const novaPosicao = posicaoAtualAvatar() - 10;

    avatar.style.transform = "scaleX(-1)";

    if(novaPosicao >= 0){
        avatar.style.marginLeft = `${novaPosicao}px`
    }     
}

function posicaoAtualAvatar(){
    let posicao = "";
    let posicaoSemPx = 0;

    posicao = document.querySelector("#avatar").style.marginLeft;   
    posicaoSemPx = parseInt(posicao.replace("px",""));  
   

    return posicaoSemPx;
}

function posicaoAtualAnimal(){
    let posicao = "";
    let posicaoSemPx = 0;

    posicao = document.querySelector("#animal").style.marginLeft;   
    posicaoSemPx = parseInt(posicao.replace("px",""));  
   

    return posicaoSemPx;
}

function posicaoAtualResiduo(){
    let posicao = "";
    let posicaoSemPx = 0;

    posicao = document.querySelector("#residuo").style.marginLeft;   
    posicaoSemPx = parseInt(posicao.replace("px",""));  
   

    return posicaoSemPx;
}

function posicaoAtualResiduo2(){
    let posicao = "";
    let posicaoSemPx = 0;

    posicao = document.querySelector("#residuo2").style.marginLeft;   
    posicaoSemPx = parseInt(posicao.replace("px",""));  
   

    return posicaoSemPx;
}

function moveChao(){   

    if(!jogoPausado){

        let posicao = "";
        let posicaoSemPx = 0;
        let posicaoResiduo = 0;
        let posicaoAnimal = 0;
        let posicaoResiduo2 = 0;

        posicao = document.querySelector("#chao").style.backgroundPosition;   
        posicaoSemPx = parseInt(posicao.replace("px",""));  

        posicaoResiduo = posicaoAtualResiduo();
        posicaoAnimal = posicaoAtualAnimal();
        posicaoResiduo2 = posicaoAtualResiduo2();
        
        if(posicaoResiduo < 0){
                posicaoResiduo = window.innerWidth + 70;
        }

        if(posicaoAnimal < 0){
                let novaPosicaoAnimal = 0;
                novaPosicaoAnimal = Math.round(Math.random() * (100 - 70) + 70) ;
                posicaoAnimal = window.innerWidth + novaPosicaoAnimal;
            }

            if(posicaoResiduo2 < 0){
                let novaPosicaoResiduo = 0;
                novaPosicaoResiduo = Math.round(Math.random() * (900 - 100) + 100) ;
                posicaoResiduo2 = window.innerWidth + novaPosicaoResiduo;
            }

        document.querySelector("#chao").style.backgroundPosition = `${posicaoSemPx - 10}px`;
        document.querySelector("#residuo").style.marginLeft = `${posicaoResiduo - 50}px`;
        document.querySelector("#animal").style.marginLeft = `${posicaoAnimal - 80}px`;
        document.querySelector("#residuo2").style.marginLeft = `${posicaoResiduo2 - 60}px`;
    }  
}

function novaPosicaoResiduo(){
    document.querySelector("#residuo").style.marginLeft = `${window.innerWidth + 70}px`;    
}

function novaPosicaoAnimal(){    
    document.querySelector("#animal").style.marginLeft = `${window.innerWidth + (Math.round(Math.random() * (100 - 70) + 70))}px`;
}

function novaPosicaoResiduo2(){  
    document.querySelector("#residuo2").style.marginLeft = `${window.innerWidth + (Math.round(Math.random() * (900 - 100) + 100))}px`;
}

// ------- Necessário ter no mínimo uma questão ---------
const questionario = [
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'plastico',
        imagemCorreto:'',
        imagemErrado:'',
        corSelectivaCorreta:'red',
        corSelectivaErrada:'blue'
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'papel',  
        imagemCorreto:'',
        imagemErrado:'',
        corSelectivaCorreta:'blue',
        corSelectivaErrada:'red'     
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'lata',  
        imagemCorreto:'',
        imagemErrado:'',
        corSelectivaCorreta:'#ffe000',//Amarelo
        corSelectivaErrada:'blue'     
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'lata1',   
        imagemCorreto:'',
        imagemErrado:'',   
        corSelectivaCorreta:'#ffe000',
        corSelectivaErrada:'red' 
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'vidro', 
        imagemCorreto:'',
        imagemErrado:'',     
        corSelectivaCorreta:'green',
        corSelectivaErrada:'#ffe000' //Amarelo
    },    
]

