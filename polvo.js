function Polvo(context, teclado, imagem, animacao, explosao, colisor) { 
   
   this.context = context; 
   this.teclado = teclado; 
   this.explosao = explosao; 
   this.colisor = colisor;   

   this.x = 0; 
   this.y = 0; 
   this.velocidade = 8; 

   this.sheet = new Spritesheet(context, imagem, 1, 6);
   this.sheet.intervalo = 80;
   
   this.andando = false;
   this.direcao = 1;
   this.animacao = animacao; 
   this._atirando = false;
   
  
   this.ultimoTiro = 0;
   this.delayTiro = 500; 
   
   this.sheet.linha = 0;
   this.vidasExtras = 3;
   this.podeColidir = true;
}

Polvo.prototype = { 
   atualizar: function() { 
      var ctx = this.context;
      var deslocamento = this.velocidade;
      
   
      if (this.teclado.pressionada(SETA_DIREITA)) {
         this.direcao = 1;
         if (this.x < ctx.canvas.width - this.sheet.larguraQuadro)
            this.x += deslocamento;
      }
      else if (this.teclado.pressionada(SETA_ESQUERDA)) {
         this.direcao = 2;
         if (this.x > 0)
            this.x -= deslocamento;
      }
      
      if (this.teclado.pressionada(SETA_ACIMA)) {
         if (this.y > 0)
            this.y -= deslocamento;
      }
      if (this.teclado.pressionada(SETA_ABAIXO)) {
         if (this.y < ctx.canvas.height - this.sheet.alturaQuadro)
            this.y += deslocamento;
      }
      
      
      this.sheet.proximoQuadro();
      
    
      if (this.teclado.pressionada(ESPACO)) {
         var agora = Date.now();
         if (agora - this.ultimoTiro > this.delayTiro) {
            this.atirar();
            this.ultimoTiro = agora;
         }
      }
   }, 

   desenhar: function() { 
      this.sheet.desenhar(this.x, this.y);         
   },
   
   posicionar: function() {
      this.x = (this.context.canvas.width / 2) - (this.sheet.larguraQuadro / 2);
      this.y = this.context.canvas.height - this.sheet.alturaQuadro - 10;
   },
   
   atirar: function() {
      
      var tirosConfig = [
         { angulo: 0, cor: 'red', velocidade: 6 },          
         { angulo: -Math.PI/6, cor: 'yellow', velocidade: 6 }, 
         { angulo: Math.PI/6, cor: 'yellow', velocidade: 6 }  
      ];
      
      for (var i = 0; i < tirosConfig.length; i++) {
         var config = tirosConfig[i];
         var tiro = new Tiro(this.context, this, config.angulo, config.cor, config.velocidade);
         
         tiro.animacao = this.animacao;
         tiro.colisor = this.colisor;
         
         this.animacao.novoSprite(tiro);
         this.colisor.novoSprite(tiro);
      }
      
      console.log("🔫 Três tiros disparados (velocidade reduzida)!");
   },
   
   retangulosColisao: function() {
       var rets = [{
          x: this.x + 10,
          y: this.y + 10,
          largura: this.sheet.larguraQuadro - 20,
          altura: this.sheet.alturaQuadro - 20
       }];
       return rets;
   },
   
   colidiuCom: function(outro) {
      if (this.podeColidir && outro instanceof Ovni) {
         this.podeColidir = false;
         
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);

         this.vidasExtras--;

         if (this.vidasExtras >= 0) {
            this.posicionar(); 
            
            var polvo = this;
            setTimeout(function() {
               polvo.podeColidir = true;
            }, 1000);
         } else {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            if (this.acabaramVidas) this.acabaramVidas(); 
         }
      }
   }
};