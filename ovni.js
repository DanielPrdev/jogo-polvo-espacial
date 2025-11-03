function Ovni(context, imagem, explosao) { 
   this.context = context;
   this.imagem = imagem;
   this.explosao = explosao; 
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
   
   
   this.sheet = new Spritesheet(context, imagem, 1, 4);
   this.sheet.intervalo = 100; 
   this.sheet.linha = 0;
   
   this.animacao = null; 
   this.colisor = null;  
}

Ovni.prototype = {
   atualizar: function() {
      this.y += this.velocidade;
      
     
      this.sheet.proximoQuadro();
      
      if (this.y > this.context.canvas.height) {
         if (this.animacao) this.animacao.excluirSprite(this);
         if (this.colisor) this.colisor.excluirSprite(this);
      }
   },
   
   desenhar: function() {
      
      this.sheet.desenhar(this.x, this.y);
   },
   
   retangulosColisao: function() {
      
      var rets = [ 
         {x: this.x + 10, y: this.y + 10, largura: 28, altura: 28}
      ];
      return rets;
   },
   
   colidiuCom: function(outro) {
      if (outro instanceof Polvo || outro instanceof Tiro) {
         if (this.explosao) {
            var explosao = new Explosao(this.context, this.explosao, this.x, this.y);
            explosao.animacao = this.animacao;
            this.animacao.novoSprite(explosao);
         }
         
         if (this.animacao) this.animacao.excluirSprite(this);
         if (this.colisor) this.colisor.excluirSprite(this);
      }
   }
};