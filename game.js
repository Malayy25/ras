// Game Variables
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let player;
let enemies = [];
let gameRunning = false;
let level = 1;
let interval;

// Player Object
function Player() {
    this.x = 50;
    this.y = canvas.height - 100;
    this.width = 30;
    this.height = 50;
    this.speed = 5;
    this.color = 'pink';
    this.name = "Rashi";
}

// Enemy Object
function Enemy(name, x, y, width, height, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 2;
}

// Initialize Game
function initGame() {
    player = new Player();
    enemies = [];
    gameRunning = true;
    level = 1;
    updateLevelInfo();
    createEnemies();
    interval = setInterval(updateGame, 1000 / 60); // 60 FPS
}

// Update Game Loop
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear Canvas
    drawPlayer();
    moveEnemies();
    checkCollisions();
    drawEnemies();
    drawLevelInfo();
}

// Draw Player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(player.name, player.x, player.y - 10);
}

// Draw Enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = 'black';
        ctx.fillText(enemy.name, enemy.x, enemy.y - 10);
    });
}

// Move Enemies
function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.x -= enemy.speed; // Move to the left
    });
}

// Check for Collisions
function checkCollisions() {
    enemies.forEach((enemy, index) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            if (level === 3) {
                // In level 3, player can attack
                enemy.color = 'red'; // Simulate enemy defeat
                enemies.splice(index, 1); // Remove enemy
            } else {
                endGame(); // End game if no attack
            }
        }
    });

    // Check if all enemies are defeated in Level 3
    if (enemies.length === 0 && level === 3) {
        levelUp();
    }
}

// Create Enemies for Level 1 and Level 2
function createEnemies() {
    if (level === 1 || level === 2) {
        enemies.push(new Enemy("Viraaj", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'blue'));
        enemies.push(new Enemy("Shahwez", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'green'));
        enemies.push(new Enemy("Shrey", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'red'));
    } else if (level === 3) {
        // In Level 3, create stronger enemies with weapons
        enemies.push(new Enemy("Viraaj", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'blue'));
        enemies.push(new Enemy("Shahwez", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'green'));
        enemies.push(new Enemy("Shrey", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'red'));
        enemies.push(new Enemy("Sahib", canvas.width, Math.random() * (canvas.height - 60), 30, 50, 'purple'));
    }
}

// Update Level Info
function updateLevelInfo() {
    document.getElementById("levelInfo").innerText = `Level: ${level}`;
}

// Level Up
function levelUp() {
    level++;
    if (level > 3) {
        clearInterval(interval);
        alert("Congratulations, you completed all levels!");
        gameRunning = false;
    } else {
        createEnemies();
        updateLevelInfo();
    }
}

// End Game
function endGame() {
    clearInterval(interval);
    alert("Game Over. Try again!");
    gameRunning = false;
}

// Key Down Event for Player Movement
document.addEventListener("keydown", function (event) {
    if (!gameRunning) return;

    if (event.key === "ArrowUp" && player.y > 0) {
        player.y -= player.speed;
    } else if (event.key === "ArrowDown" && player.y + player.height < canvas.height) {
        player.y += player.speed;
    } else if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
});

// Start Game
document.getElementById("startButton").addEventListener("click", function () {
    if (!gameRunning) {
        initGame();
        document.getElementById("startButton").style.display = "none";
    }
});
