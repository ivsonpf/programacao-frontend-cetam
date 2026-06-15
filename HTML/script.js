// --- CONFIGURANDO O PRIMEIRO CANVAS ---
// 1. Busca o canvas no HTML pelo ID
const canvas1 = document.getElementById('meuCanvas1');
// 2. Define o contexto para 2D (necessário para desenhar)
const ctx1 = canvas1.getContext('2d');

// Desenhando um retângulo azul no primeiro canvas
ctx1.fillStyle = 'blue';
ctx1.fillRect(50, 50, 150, 100); 
// fillRect(posicaoX, posicaoY, largura, altura)


// --- CONFIGURANDO O SEGUNDO CANVAS ---
const canvas2 = document.getElementById('meuCanvas2');
const ctx2 = canvas2.getContext('2d');

// Desenhando um círculo vermelho no segundo canvas
ctx2.fillStyle = 'red';
ctx2.beginPath();
ctx2.arc(150, 75, 40, 0, Math.PI * 2); 
// arc(posicaoX, posicaoY, raio, anguloInicial, anguloFinal)
ctx2.fill();