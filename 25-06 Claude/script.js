// ===========================================================
// JOGO DA VELHA - LÓGICA PRINCIPAL (com tela de seleção)
// ===========================================================

// --- Elementos da TELA DE SELEÇÃO ---
const selectScreen = document.getElementById('selectScreen');
const gameContainer = document.getElementById('gameContainer');
const selectButtons = document.querySelectorAll('.select-btn');
const startBtn = document.getElementById('startBtn');

// --- Elementos do JOGO ---
const cells = document.querySelectorAll('.cell');
const statusPanel = document.getElementById('statusPanel');
const restartBtn = document.getElementById('restartBtn');

// --- Estado do jogo ---
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Controla se cada player já confirmou a seleção de personagem
const playersSelected = {
  1: false,
  2: false
};

// --- Combinações de vitória (linhas, colunas, diagonais) ---
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// ===========================================================
// LÓGICA DA TELA DE SELEÇÃO
// ===========================================================

/**
 * Quando um jogador clica em "Selecionar", marcamos o card como
 * selecionado e atualizamos o estado de quem já confirmou.
 * Obs: como cada player já tem sua imagem fixa no card, aqui
 * apenas confirmamos a escolha (você pode expandir isso depois
 * para escolher entre várias imagens, se quiser).
 */
selectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const playerNumber = button.getAttribute('data-player');
    const card = document.getElementById(`card-player${playerNumber}`);

    card.classList.add('selected');
    button.textContent = 'Selecionado ✓';
    button.disabled = true;

    playersSelected[playerNumber] = true;

    // Libera o botão "Começar Jogo" somente quando os DOIS jogadores confirmarem
    if (playersSelected[1] && playersSelected[2]) {
      startBtn.disabled = false;
    }
  });
});

/**
 * Ao clicar em "Começar Jogo", escondemos a tela de seleção
 * e mostramos o tabuleiro.
 */
startBtn.addEventListener('click', () => {
  selectScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
});

// ===========================================================
// LÓGICA DO JOGO DA VELHA
// ===========================================================

function updateStatusPanel(message, player = null) {
  if (player) {
    const colorClass = player === 'X' ? 'player-x' : 'player-o';
    statusPanel.innerHTML = `${message} <span class="player-tag ${colorClass}">${player}</span>`;
  } else {
    statusPanel.textContent = message;
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (board[index] !== '' || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  checkResult();
}

/**
 * Verifica vitória e empate após cada jogada.
 * Percorre todas as combinações possíveis e checa se as 3
 * células de alguma delas pertencem ao mesmo jogador.
 */
function checkResult() {
  let roundWon = false;
  let winningLine = null;

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] === '' || board[b] === '' || board[c] === '') {
      continue;
    }

    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      winningLine = combination;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    highlightWinningCells(winningLine);
    updateStatusPanel('🎉 Jogador venceu:', currentPlayer);
    disableAllCells();
    return;
  }

  const isDraw = !board.includes('');
  if (isDraw) {
    gameActive = false;
    updateStatusPanel('🤝 Empate! Ninguém venceu.');
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatusPanel('Vez do jogador', currentPlayer);
}

function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

function disableAllCells() {
  cells.forEach(cell => cell.disabled = true);
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'winning-cell');
  });

  updateStatusPanel('Vez do jogador', currentPlayer);
}

// ===========================================================
// EVENT LISTENERS
// ===========================================================
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
