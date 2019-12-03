var canvas, contexto,frames =0
var ALTURA=600,
LARGURA=800;
var estadoAtual , record =0, delay,newobs
//==================================================================================================
//==================================================================================================
class classobs{
    x=800;
    largura=70;
    altura=70+Math.floor(Math.random()*320);
}
//==================================================================================================
//==================================================================================================
var estados={
    jogar:0,
    jogando:1,
    perdeu:2
}
//==================================================================================================
//==================================================================================================    
 var chao={
    x:0,
    y:550,
    largura:LARGURA,
    altura:50,
    cor:'#D2B48C',
    grama:{
        x:0,
        y:550,
        largura:LARGURA,
        altura:10,
        cor:'#39FF14',

        desenha:function(){
            contexto.fillStyle=this.cor
            contexto.fillRect(this.x,this.y,this.largura,this.altura);
        }
    },

    desenha:function(){
        contexto.fillStyle=this.cor;
        contexto.fillRect(this.x,this.y,this.largura,this.altura);
    },

}
//==================================================================================================
//==================================================================================================
var personagem={
    x:100,
    y:0,
    largura:50,
    altura:50,
    cor:'#FFFF00',
    score:0,
    forcaPulo:10,
    gravidade:0.45,
    velocidade:0,

    pula:function(){
        this.velocidade=-this.forcaPulo;
    },


    atualiza:function(){
        if(this.y+this.altura<=chao.y){
            this.velocidade+=this.gravidade
            this.y+=this.velocidade
        }

        if(this.y+this.altura>chao.y){
            this.velocidade=0
            this.y=chao.y-this.altura
        }
    },


    desenha:function(){
        contexto.fillStyle=this.cor;
        contexto.fillRect(this.x,this.y,this.largura,this.altura)
    },


    limpaScore:function(){
        personagem.score=0
    }


}
//==================================================================================================
//==================================================================================================


function cria(){
    let obj=new classobs
    obstaculos.obs.push(obj)
    obsCima.obs.push(obj)
}

//==================================================================================================
//==================================================================================================
var obstaculos={
    obs:[],
    cor:'#008000',
    velocidade:4,
    tempo:0,
    intervalo:80,


    atualiza:function(){
        if(this.tempo==0){
            cria();
            this.tempo=this.intervalo;
        }else{
            this.tempo--
        }

        

        let tamanho=this.obs.length;
        for(let i=0;i<tamanho;i++){
            let obs=this.obs[i]

            

            if(personagem.x<obs.x+obs.largura && personagem.x+personagem.largura>=obs.x && personagem.y+personagem.altura>=chao.y-obs.altura){
                if(personagem.score>record){
                    record=personagem.score
                }
                estadoAtual=estados.perdeu
            }

            if(obs.x<-obs.largura){
                
                this.obs.splice(i,1)
                i--
                tamanho--
                personagem.score++
            }

            if(obs.x+obs.largura<-obs.largura){
                this.obs.splice(i,1)
                tamanho--
                i--
            }else{
               obs.x-=this.velocidade
            }
        }
    },


    desenha:function(){
        let tamanho=this.obs.length;
        for(let i=0 ;i<tamanho;i++){
            let obs=this.obs[i]
            contexto.fillStyle=this.cor;
            contexto.fillRect(obs.x,chao.y-obs.altura,obs.largura,obs.altura);


            //contexto.fillRect(obs.x,0,obs.largura,550-obs.altura-160)
        }
        
    },


    limpa:function(){
        this.obs=[]
    }

    
}
//==================================================================================================
//==================================================================================================
var obsCima={
    obs:[],
    cor:'#008000',
    tempo:0,
    velocidade:4,
    intervalo:80,

    limpa:function(){
        this.obs=[]
    },

    atualiza:function(){
        let tam=this.obs.length
        for(var k=0;k<tam;k++){
            let obs=this.obs[k]


            if(personagem.y<0+(550-obs.altura-160) && personagem.x+personagem.largura>obs.x && personagem.x<obs.x+obs.largura){
                if(personagem.score>record){
                    record=personagem.score
                }
                estadoAtual=estados.perdeu
            }

            if(obs.x+obs.largura<0){
                this.obs.splice(k,1)
                k--
                tam--
            }
        }
    },

    desenha:function(){
        let tam=this.obs.length
        for(let l = 0 ; l < tam ; l++){
            let obs = this.obs[l]
            contexto.fillStyle = this.cor;
            contexto.fillRect(obs.x,0,obs.largura,550-obs.altura-160)

        }
    }
    


}


