function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.spritesExcluir = [];
   this.processamentos = [];
   this.ligado = false;
}
Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
   },
   excluirSprite: function(sprite) {
      this.spritesExcluir.push(sprite);
   },
   novoProcessamento: function(processamento) {
      this.processamentos.push(processamento);
   },
   processarExclusoes: function() {
       var novoArray = [];
       for (var i in this.sprites) {
           if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) {
               novoArray.push(this.sprites[i]);
           }
       }
       this.spritesExcluir = [];
       this.sprites = novoArray;
   },
   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   proximoFrame: function() {
      if ( ! this.ligado ) return;

      this.limparTela();

      for (var i in this.sprites)
         this.sprites[i].atualizar();
         
      for (var i in this.processamentos)
         this.processamentos[i].processar();
         
      this.processarExclusoes();
      
      for (var i in this.sprites)
         this.sprites[i].desenhar();

      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
   },
   limparTela: function() {
      var ctx = this.context;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   }
}