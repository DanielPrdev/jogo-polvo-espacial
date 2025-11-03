function Fundo(context, imagem, posicao) {
    this.context = context;
    this.imagem = imagem;
    this.posicao = posicao; // 'esquerda', 'direita' ou undefined para fundo principal

    this.velocidade = 0;
    this.posicaoEmenda = 0;
}

Fundo.prototype = {
    atualizar: function() {
        this.posicaoEmenda += this.velocidade / 60;

        if (this.posicaoEmenda > this.imagem.height) {
            this.posicaoEmenda = 0;
        }
    },

    desenhar: function() {
        var img = this.imagem; 	
        var canvas = this.context.canvas;
        
        // Posições Y para rolagem vertical
        var posicaoY1 = this.posicaoEmenda - img.height;
        var posicaoY2 = this.posicaoEmenda;

        if (this.posicao === 'esquerda') {
            // Lado esquerdo - desenha sem redimensionar
            var x = 0;
            this.context.drawImage(img, x, posicaoY1);
            this.context.drawImage(img, x, posicaoY2);
        } 
        else if (this.posicao === 'direita') {
            // Lado direito - desenha sem redimensionar
            var x = canvas.width - img.width;
            this.context.drawImage(img, x, posicaoY1);
            this.context.drawImage(img, x, posicaoY2);
        } 
        else {
            // FUNDO PRINCIPAL - CORREÇÃO AQUI
            // Em vez de esticar, vamos repetir a imagem para preencher a tela
            // sem cortar e mantendo a proporção
            
            var escalaX = canvas.width / img.width;
            var escalaY = canvas.height / img.height;
            var escala = Math.max(escalaX, escalaY); // Usar a maior escala para cobrir toda a tela
            
            var novaLargura = img.width * escala;
            var novaAltura = img.height * escala;
            
            // Centralizar a imagem
            var offsetX = (canvas.width - novaLargura) / 2;
            var offsetY = (canvas.height - novaAltura) / 2;
            
            // Desenhar as duas partes para rolagem
            this.context.drawImage(img, offsetX, offsetY + posicaoY1, novaLargura, novaAltura);
            this.context.drawImage(img, offsetX, offsetY + posicaoY2, novaLargura, novaAltura);
        }
    }
};
