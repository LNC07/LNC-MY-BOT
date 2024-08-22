let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let botBought = localStorage.getItem('botBought') === 'true';
let lastClaimTime = localStorage.getItem('lastClaimTime') ? parseInt(localStorage.getItem('lastClaimTime')) : 0;

function startGame() {
    document.getElementById('clicker-game').style.display = 'flex';
    document.getElementById('start-container').style.display = 'none';
}

function clickGame() {
    score++;
    localStorage.setItem('score', score);
    document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
}

function completeTask() {
    score += 100;
    localStorage.setItem('score', score);
    document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
    document.getElementById('task-msg').innerText = "Task Completed! 100 LNC added.";
}

function buyBot() {
    if (score >= 5000 && !botBought) {
        score -= 5000;
        botBought = true;
        lastClaimTime = Date.now();
        localStorage.setItem('score', score);
        localStorage.setItem('botBought', botBought);
        localStorage.setItem('lastClaimTime', lastClaimTime);
        document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
        document.getElementById('buy-bot-btn').style.display = 'none';
        document.getElementById('claim-btn').style.display = 'inline-block';
        document.getElementById('bot-msg').innerText = "Bot Bought! You can claim 2000 LNC every 5 hours.";
    } else if (botBought) {
        document.getElementById('bot-msg').innerText = "Bot already bought!";
    } else {
        document.getElementById('bot-msg').innerText = "Not enough LNC to buy bot.";
    }
}

function claimBot() {
    if (botBought) {
        const currentTime = Date.now();
        if (currentTime - lastClaimTime >= 5 * 60 * 60 * 1000) { // 5 hours
            score += 2000;
            lastClaimTime = currentTime;
            localStorage.setItem('score', score);
            localStorage.setItem('lastClaimTime', lastClaimTime);
            document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
            document.getElementById('bot-msg').innerText = "2000 LNC claimed!";
        } else {
            document.getElementById('bot-msg').innerText = "You can claim again after 5 hours.";
        }
    }
}

// Initialize UI
function initializeUI() {
    document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
    if (botBought) {
        document.getElementById('buy-bot-btn').style.display = 'none';
        document.getElementById('claim-btn').style.display = 'inline-block';
    } else {
        document.getElementById('buy-bot-btn').style.display = 'inline-block';
        document.getElementById('claim-btn').style.display = 'none';
    }
}

initializeUI();
setInterval(claimBot, 1000 * 60 * 60); // Automatically check if 5 hours passed
