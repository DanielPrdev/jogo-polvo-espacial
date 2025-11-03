function VidaExtra(context, imagem) { 
   this.context = context;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 2;
   
 
   this.sheet = new Spritesheet(context, imagem, 1, 6);
   this.sheet.intervalo = 100; 
   this.sheet.linha = 0;
   
   this.animacao = null; 
   this.colisor = null;
   this.coletada = false;
}

VidaExtra.prototype = {
   atualizar: function() {
      this.y += this.velocidade;
      
      
      this.sheet.proximoQuadro();
      
     
      if (this.y > this.context.canvas.height || this.coletada) {
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
      if (outro instanceof Polvo && !this.coletada) {
         this.coletada = true;
         
        
         outro.vidasExtras++;
         console.log("Vida extra coletada! Total:", outro.vidasExtras);
         
        
         if (this.animacao) this.animacao.excluirSprite(this);
         if (this.colisor) this.colisor.excluirSprite(this);
      }
   }
};