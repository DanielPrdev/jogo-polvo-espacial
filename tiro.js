function Tiro(context, nave, angulo = 0, cor = 'red', velocidade = 6) { // ⭐ Velocidade padrão 6
   this.context = context;
   this.nave = nave;
   
   this.largura = 4;
   this.altura = 20;   
   this.x = nave.x + nave.sheet.larguraQuadro / 2 - this.largura / 2;
   this.y = nave.y - this.altura;
   this.velocidade = velocidade; 
   
   
   this.angulo = angulo;
   this.velocidadeX = Math.sin(angulo) * this.velocidade;
   this.velocidadeY = -Math.cos(angulo) * this.velocidade;
   
   this.cor = cor;
   
   this.animacao = null; 
   this.colisor = null;  
}

Tiro.prototype = {
   atualizar: function() {
      
      this.x += this.velocidadeX;
      this.y += this.velocidadeY;
      
      
      if (this.y < -this.altura || 
          this.y > this.context.canvas.height ||
          this.x < -this.largura || 
          this.x > this.context.canvas.width) {
          if (this.animacao) this.animacao.excluirSprite(this);
          if (this.colisor) this.colisor.excluirSprite(this);
      }
   },
   
   desenhar: function() {
      var ctx = this.context;
      ctx.save();
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.largura, this.altura);
      ctx.restore();
   },
   
   retangulosColisao: function() {
       return [ {
          x: this.x,
          y: this.y,
          largura: this.largura,
          altura: this.altura
       } ];
   },
   
   colidiuCom: function(outro) {
       if (outro instanceof Ovni) {
           if (this.animacao) this.animacao.excluirSprite(this);
           if (this.colisor) this.colisor.excluirSprite(this);
       }
   }
};