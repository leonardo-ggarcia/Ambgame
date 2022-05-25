//Variavel global do jogo
var jogoPausado = false;
var modal = "";

$(document).ready(function(){
    //inicializa avatar
    document.querySelector("#avatar").style.marginLeft = "70px";
    document.querySelector("#residuo").style.marginLeft = `${window.innerWidth + 70}px`;
    document.querySelector("#animal").style.marginLeft = `${window.innerWidth + 100}px`;
    document.querySelector("#residuo2").style.marginLeft = `${window.innerWidth + 900}px`;
    document.querySelector("#chao").style.backgroundPosition = "1px";
    document.querySelector("#caixa-questao").style.display = "none"; // Caixa de Questão
  


    //Adiciona animacao
   
    setInterval(moveChao, 450); 

    setInterval(pegouResiduo,100);

    /**
     * Níveis de tempo
     * Fácil: 450
     */   
})


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


function pegouResiduo(){

    if(!jogoPausado){    
        let posicaoAvatar = posicaoAtualAvatar();
        let posicaoResiduo = posicaoAtualResiduo();   
        let posicaoResiduo2 = posicaoAtualResiduo2();  
        let posicaoAnimal = posicaoAtualAnimal(); 
        let alturaAvatar = document.querySelector("#avatar-kezia").style.marginTop;
        let posResiduoAleatorio = 0;
        
        if( posicaoAvatar > (posicaoResiduo - 7)
            && posicaoAvatar <  (posicaoResiduo + 7)   
            && alturaAvatar != "-200px"
            ){       
            novaPosicaoResiduo();  //Ganhou 
            jogoPausado = true;   
            
            posResiduoAleatorio = Math.round(Math.random() * (4 - 1) + 1) ;
            console.log(posResiduoAleatorio)
            
            /**
             * Aqui é exibido o modal
             */
            document.querySelector("#caixa-questao").style.display = "block"; //Exibi caixa de questão
            document.querySelector('#questao').textContent = questionario[posResiduoAleatorio].pergunta;
            document.querySelector('#imagem-questao').src = `./assets/images/${questionario[posResiduoAleatorio].imagemPergunta}.png` ;

        }   

        if( posicaoAvatar > (posicaoResiduo2 - 20) 
            && posicaoAvatar <  (posicaoResiduo2 + 20)
            && alturaAvatar != "-200px"
            ){       
            novaPosicaoResiduo2(); //Ganhou           
        }   

        if (posicaoAvatar > (posicaoAnimal - 35)
            && posicaoAvatar <  (posicaoAnimal + 35)
            && alturaAvatar != "-200px"
            ){       
                console.log('perdeu')
            novaPosicaoAnimal(); //Perdeu           
        }   

        if (posicaoResiduo < 0 || posicaoResiduo < 0){       
            novaPosicaoResiduo();
            novaPosicaoResiduo2();    //Perdeu      
        }   
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


const questionario = [
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'Garrafa',
        acertou:'Você descartou corretamente e isso evitou que essa garrafa fosse para o mar!',
        imagemAcertou:'natureza',
        errou:'Você descartou incorretamente e essa garafa foi para o mar!',
        imagemErrou:'avatar-mat'
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'Garrafa',
        acertou:'Você descartou corretamente e isso evitou que alguém usasse esse papel em alguma fogueira causando uma poluição no ar!',
        imagemAcertou:'natureza',
        errou:'Você descartou incorretamente e alguém usou esse papel para fazer uma fogueira que contribuiu para a poluição do ar!',
        imagemErrou:'avatar-mat'
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'Garrafa',
        acertou:'Você descartou corretamente e isso evitou que essa lata contaminasse o solo!',
        imagemAcertou:'',
        errou:'Você descartou incorretamente e essa lata agora polui o solo!',
        imagemErrou:''
    },
    {
        pergunta:'Onde devemos descartar?',
        imagemPergunta:'Garrafa',
        acertou:'Você descartou corretamente e isso evitou que essa garrafa de vidro contaminasse o solo!',
        imagemAcertou:'',
        errou:'Você descartou incorretamente e essa garrafa de vidro agora poluiu o solo!',
        imagemErrou:''
    },
    
]
