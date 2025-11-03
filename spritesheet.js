function Spritesheet(context, imagem, linhas, colunas) { 
   this.context = context; 
   this.imagem = imagem; 
   this.numLinhas = linhas; 
   this.numColunas = colunas; 
   this.intervalo = 0; 
   this.linha = 0; 
   this.coluna = 0; 
   
   
   this.larguraQuadro = Math.floor(imagem.width / colunas);
   this.alturaQuadro = Math.floor(imagem.height / linhas);
   
   this.ultimoTempo = 0;
   this.fimDoCiclo = null; 
} 

Spritesheet.prototype = { 
   proximoQuadro: function() {
      var agora = new Date().getTime(); 

      if (!this.ultimoTempo) this.ultimoTempo = agora; 

      if (agora - this.ultimoTempo < this.intervalo) return; 

      if (this.coluna < this.numColunas - 1) {
         this.coluna++; 
      } else {
         this.coluna = 0;
       
         if (this.fimDoCiclo) this.fimDoCiclo();
      }

      this.ultimoTempo = agora;
   },
   
   desenhar: function(x, y) {
      if (!this.imagem.complete) return; 
      
      var largura = this.larguraQuadro; 
      var altura = this.alturaQuadro; 

      this.context.drawImage( 
         this.imagem, 
         largura * this.coluna, 
         altura * this.linha, 
         largura, 
         altura, 
         x, 
         y, 
         largura, 
         altura 
      ); 
   }
}