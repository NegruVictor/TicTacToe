const game = document.getElementById('game');
const btnReset = document.getElementById('btnReset');
let l, c;
let player_symbol = "X", occupied_positions = 0;
let name_1, name_2;
let player_x = 0, player_0 = 0;
const tabla = [[null, null, null],
               [null, null, null],
               [null, null, null]];

function button() {
    name_1 = document.getElementById('player0').value;
    document.getElementById('player0').value = ' ';
    document.getElementById('name0').innerHTML = name_1 + ' (0)';
    name_2 = document.getElementById('playerX').value;
    document.getElementById('playerX').value = ' ';
    document.getElementById('nameX').innerHTML = name_2 + ' (X)';
}

game.addEventListener('click', (e) => {
    const tg = e.target;
    l = parseInt(tg.getAttribute('l'));
    c = parseInt(tg.getAttribute('c'));
    if (tabla[l][c])
        return;
    tabla[l][c] = player_symbol;
    tg.innerHTML = player_symbol;
    occupied_positions++;
    if (gameOver(l, c, player_symbol)) {
        alert(`Felicitari ${winner(player_symbol)}! Ai castigat.`);
        score(player_symbol);
        btnReset.disabled = false;
    }else if (occupied_positions == 9) {
        alert('Jocul este remiza!');
        btnReset.disabled = false;
    }
    else {
        changePlayer();
    }
});

function winner(x) {
    if (x == "X") {
        return name_2;
    }
    return name_1;
}

function score(n) {
    if (n == "X") {
        ++player_x;
        document.getElementById('X').textContent = player_x;
    } else {
        ++player_0;
        document.getElementById(0).textContent = player_0;
    }
}

createGameBoard();

function gameOver(l, c, player) {
    let cnt = 0;
    for (let i = 0; i < 3; i++) {
        if (tabla[l][i] == player)
            cnt++;  
    }
    if (cnt == 3) return true;
    cnt = 0;
    for (let i = 0; i < 3; i++) {
        if (tabla[i][c] == player)
            cnt++;
    }
    if (cnt == 3) return true;
    if (l == c) {
        cnt = 0;
        for (let i = 0; i < 3; i++) {
            if (tabla[i][i] == player)
                cnt++;
        }
    } else if (l + c == 2) {
        cnt = 0;
        for (let i = 0; i < 3; i++) {
            if (tabla[i][3-i-1] == player)
                cnt++;
        }
    }
    if (cnt == 3) return true;
    return false;
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tabla[i][j] = null;
        }
    }
    Array.from(document.querySelectorAll('div[l]')).forEach(x => {
        x.textContent = null;
    });
    occupied_positions = 0;
    changePlayer();
    btnReset.disabled = true;
}

function createGameBoard() {
    let l, c;
    for (let i = 0; i < 9; i++) {
        let e = document.createElement("div");
        l = Math.round((i + 2) / 3) - 1;
        c = Math.round((i) % 3);
        e.setAttribute('l', l);
        e.setAttribute('c', c);
        game.appendChild(e);    
    }
}

function changePlayer() {
    if (player_symbol == "X") {
        player_symbol = "0";
    } else {
        player_symbol = "X";
    }
}