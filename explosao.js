var SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0.4;
SOM_EXPLOSAO.load();

function Explosao(context, imagem, x, y) {
   this.context = context;
   this.imagem = imagem;
   this.spritesheet = new Spritesheet(context, imagem, 1, 6);
   this.spritesheet.intervalo = 40; // REDUZIDO: de 75 para 40 (mais rápido)
   this.x = x;
   this.y = y;
   this.animando = true;
   
   
   this.animacao = null;
   
   var explosao = this;
   this.fimDaExplosao = null;
   
   
   this.spritesheet.fimDoCiclo = function() {
      explosao.animando = false;
      if (explosao.animacao) {
         explosao.animacao.excluirSprite(explosao);
      }
      if (explosao.fimDaExplosao) explosao.fimDaExplosao();
   };
   
   
   if (SOM_EXPLOSAO.readyState >= 2) {
      SOM_EXPLOSAO.currentTime = 0;
      SOM_EXPLOSAO.play().catch(function(e) {
         console.log("Não foi possível tocar som da explosão:", e);
      });
   }
}

Explosao.prototype = {
   atualizar: function() {
      
   },
   
   desenhar: function() {
      if (this.animando) {
         this.spritesheet.desenhar(this.x, this.y);
         this.spritesheet.proximoQuadro();
      }
   },
   
   retangulosColisao: function() {
      return []; 
   }
}