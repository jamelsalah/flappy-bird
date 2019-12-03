





function clique(event){
    if(estadoAtual==estados.jogando){
        personagem.pula();
    }else if(estadoAtual==estados.jogar){
        estadoAtual=estados.jogando
        personagem.y=0
    }else if(estadoAtual==estados.perdeu){
        estadoAtual=estados.jogar
        obstaculos.limpa();
        obsCima.limpa();
        personagem.limpaScore();

    }
}



function main(){

    canvas=document.createElement('canvas');
    canvas.width=LARGURA;
    canvas.height=ALTURA;
    canvas.style.border="1px solid black";

    contexto=canvas.getContext('2d');
    document.body.appendChild(canvas);
    document.addEventListener('mousedown',clique);

    estadoAtual=estados.jogar;
    roda();



}



function roda(){
    atualiza();
    desenha();

    window.requestAnimationFrame(roda);

}



function atualiza(){
    frames++


    if(estadoAtual==estados.jogando){
        obsCima.atualiza();
        obstaculos.atualiza();
        
        
    }
    if(estadoAtual==estados.jogando || estadoAtual==estados.jogar){
        personagem.atualiza();
    }

    if(estadoAtual==estados.perdeu){

    }
}



function desenha(){
    contexto.fillStyle="#ADD8E6";
    contexto.fillRect(0,0,LARGURA,ALTURA);

    if(estadoAtual==estados.jogar){
        contexto.fillStyle='green'
        contexto.fillRect(350,250,100,100)
    }

    chao.desenha();
    chao.grama.desenha();
    if(estadoAtual==estados.jogando || estadoAtual==estados.perdeu){
        obsCima.desenha();
        obstaculos.desenha();
        
        
    }

    if(estadoAtual==estados.jogando){
        contexto.fillStyle='white';
        contexto.font='80px arial';
        contexto.fillText(personagem.score,350,70)
    }

    if(estadoAtual==estados.perdeu){
        contexto.fillStyle='red';
        contexto.fillRect(350,250,100,100);

        contexto.save();
        contexto.translate(LARGURA/2, ALTURA/2);

        contexto.fillStyle='white';
        contexto.font='80px arial';
        if(record<personagem.score){
            contexto.fillText('Novo Record!!!',150,-60)
        }else{
            contexto.fillText('record : '+record,-150,-60)
        }
        contexto.fillText(personagem.score,-20,25)
        contexto.restore();
    }

    personagem.desenha();

    
}
//============================
main();

