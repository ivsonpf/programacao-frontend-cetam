// Selecionando os elementos do HTML
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

// Variáveis de controle do jogo
let board = ["", "", "", "", "", "", "", "", ""]; // Representa os 9 espaços
let currentPlayer = "X"; // Começa com o jogador X
let isGameActive = true;

// Todas as combinações possíveis para vencer
const winningConditions = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
];

// Função que roda toda vez que o jogador clica em um quadrado
function handleCellClick(event) {
    const clickedCell = event.target;
    // Pega o número do quadrado clicado (de 0 a 8)
    const cellIndex = clickedCell.getAttribute('data-index');

    // Se o quadrado já estiver preenchido ou o jogo já acabou, não faz nada
    if (board[cellIndex] !== "" || !isGameActive) {
        return;
    }

    // Atualiza o quadrado com X ou O
    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Adiciona classe para pintar de vermelho ou azul

    // Verifica se alguém ganhou
    checkWin();
}

// Função para checar as condições de vitória
function checkWin() {
    let roundWon = false;

    // Passa por todas as combinações de vitória possíveis
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        // Se as 3 posições tiverem a mesma letra (X ou O), é vitória!
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    // Se alguém ganhou
    if (roundWon) {
        statusText.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
        isGameActive = false;
        return;
    }

    // Se não tem nenhum espaço vazio no tabuleiro e ninguém ganhou (Deu velha)
    if (!board.includes("")) {
        statusText.textContent = "Deu velha! Empate. 😅";
        isGameActive = false;
        return;
    }

    // Troca a vez do jogador (Se era X, vira O. Se era O, vira X)
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

// Função para limpar o tabuleiro e começar de novo
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o'); // Remove as cores
    });
}

// Adiciona o ouvinte de cliques para cada quadrado
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adiciona o ouvinte de clique no botão de reiniciar
restartBtn.addEventListener('click', restartGame);