function Painel(context, nave) {
   this.context = context;
   this.nave = nave;
   this.pontuacao = 0;
   
 
   this.imagemVida = new Image();
   this.imagemVida.src = 'img/life.png';
   this.imagemCarregada = false;
   
   
   var painel = this;
   this.imagemVida.onload = function() {
      painel.imagemCarregada = true;
      console.log("Imagem life.png carregada para o painel");
   };
   
   this.imagemVida.onerror = function() {
      console.error("Erro ao carregar life.png");
   };
   
  
   this.larguraVida = 30;
   this.alturaVida = 30;
}

Painel.prototype = {
   atualizar: function() {
      
   },
   
   desenhar: function() {
      var ctx = this.context;
      
      this._desenharVidas(ctx);
      this._desenharPontuacao(ctx);
   },
   
   _desenharVidas: function(ctx) {
      if (!this.imagemCarregada) {
        
         this._desenharVidasFallback(ctx);
         return;
      }
      
      var x = 20;
      var y = 20;
      var espacamento = 10;
      
      for (var i = 0; i < this.nave.vidasExtras; i++) {
         ctx.drawImage(
            this.imagemVida,
            x,
            y,
            this.larguraVida,
            this.alturaVida
         );
         
         x += this.larguraVida + espacamento;
      }
   },
   
   _desenharVidasFallback: function(ctx) {
      
      var x = 20;
      var y = 20;
      var tamanho = 25;
      
      ctx.save();
      ctx.fillStyle = 'red';
      
      for (var i = 0; i < this.nave.vidasExtras; i++) {
         
         ctx.beginPath();
         ctx.moveTo(x, y + tamanho/4);
         ctx.bezierCurveTo(x, y, x + tamanho/2, y, x + tamanho/2, y + tamanho/4);
         ctx.bezierCurveTo(x + tamanho/2, y, x + tamanho, y, x + tamanho, y + tamanho/4);
         ctx.bezierCurveTo(x + tamanho, y + tamanho/2, x + tamanho/2, y + tamanho*0.75, x + tamanho/2, y + tamanho);
         ctx.bezierCurveTo(x + tamanho/2, y + tamanho*0.75, x, y + tamanho/2, x, y + tamanho/4);
         ctx.fill();
         
         x += tamanho + 10;
      }
      
      ctx.restore();
   },
   
   _desenharPontuacao: function(ctx) {
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(this.pontuacao, ctx.canvas.width - 20, 25);
      ctx.restore();
   }
};