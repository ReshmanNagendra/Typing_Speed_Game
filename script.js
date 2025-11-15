// Game State Variables
let gameState = "menu"; // menu, playing, gameOver
let difficulty = "medium";
let playerName = "";

// Game Data
let words = [];
let currentWordIndex = 0;
let typedText = "";
let startTime = null;
let timeLeft = 60;
let timerInterval = null;

// Statistics
let correctWords = 0;
let incorrectWords = 0;
let totalCharacters = 0;
let correctCharacters = 0;
let wpm = 0;
let accuracy = 100;
let score = 0;

// Word Lists by Difficulty
const wordLists = {
    easy: [
        "the", "and", "for", "are", "but", "not", "you", "all", "can", "her",
        "was", "one", "our", "out", "day", "get", "has", "him", "his", "how",
        "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did",
        "its", "let", "put", "say", "she", "too", "use", "dad", "mom", "cat",
        "dog", "run", "sit", "eat", "fun", "big", "hot", "red", "yes", "top"
    ],
    medium: [
        "about", "after", "again", "below", "could", "every", "first", "found", "great", "house",
        "large", "learn", "never", "other", "place", "plant", "point", "right", "small", "sound",
        "spell", "still", "study", "their", "there", "these", "thing", "think", "three", "water",
        "where", "which", "world", "would", "write", "young", "animal", "change", "differ", "follow",
        "through", "picture", "country", "between", "important", "children", "mountain", "sentence", "together", "question"
    ],
    hard: [
        "accomplish", "beautiful", "beginning", "calendar", "celebrate", "chocolate", "commercial", "communication",
        "competition", "congratulations", "convenience", "definitely", "democracy", "discipline", "embarrass",
        "environment", "exceptional", "experience", "explanation", "extraordinary", "fascinating", "government",
        "immediately", "independent", "intelligence", "international", "magnificent", "maintenance", "misunderstand",
        "necessary", "opportunity", "particular", "performance", "personality", "phenomenon", "professional",
        "pronunciation", "psychology", "questionnaire", "recognize", "recommendation", "refrigerator", "responsibility",
        "restaurant", "schedule", "separate", "successful", "temperature", "unfortunately", "unnecessary"
    ]
};

// Initialize Game
function init() {
    loadWords();
    loadLeaderboard();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    const typingInput = document.getElementById('typingInput');
    const playerNameInput = document.getElementById('playerNameInput');
    
    if (typingInput) {
        typingInput.addEventListener('input', handleTyping);
    }
    
    if (playerNameInput) {
        playerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveScore();
            }
        });
    }
}

// Load Words Based on Difficulty
function loadWords() {
    words = [...wordLists[difficulty]];
    // Shuffle words for variety
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
}

// Select Difficulty
function selectDifficulty(level) {
    difficulty = level;

    // Remove active from all
    const buttons = document.querySelectorAll('.difficulty-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Find the button by its text
    const selectedButton = Array.from(buttons).find(btn =>
        btn.textContent.trim().toLowerCase().includes(level)
    );

    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Update leaderboard title
    const leaderboardTitle = document.getElementById('leaderboardDifficulty');
    if (leaderboardTitle) {
        leaderboardTitle.textContent =
            level.charAt(0).toUpperCase() + level.slice(1);
    }

    loadWords();
    loadLeaderboard();
}


// Start Game
function startGame() {
    if (words.length === 0) {
        alert('Loading words, please wait...');
        return;
    }
    
    // Reset all game state
    gameState = "playing";
    currentWordIndex = 0;
    typedText = "";
    startTime = Date.now();
    timeLeft = 60;
    correctWords = 0;
    incorrectWords = 0;
    totalCharacters = 0;
    correctCharacters = 0;
    wpm = 0;
    accuracy = 100;
    score = 0;
    
    // Show game screen
    showScreen('gameScreen');
    
    // Render words
    renderWords();
    updateStats();
    
    // Start timer
    startTimer();
    
    // Focus input
    setTimeout(() => {
        const input = document.getElementById('typingInput');
        if (input) {
            input.value = '';
            input.focus();
        }
    }, 100);
}

// Start Timer
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateStats();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Handle Typing
function handleTyping(e) {
    const value = e.target.value;
    const currentWord = words[currentWordIndex];
    
    typedText = value;

    renderWords();

    // 👉 Only move on space
    if (value.endsWith(" ")) {
        const typedWord = value.trim();
        const isCorrect = typedWord === currentWord;

        totalCharacters += currentWord.length;
        
        if (isCorrect) {
            correctWords++;
            correctCharacters += currentWord.length;

            let points = 10;
            if (difficulty === "medium") points = 15;
            if (difficulty === "hard") points = 25;
            score += points;
        } else {
            incorrectWords++;

            // Count matching characters
            let correctChars = 0;
            for (let i = 0; i < Math.min(typedWord.length, currentWord.length); i++) {
                if (typedWord[i] === currentWord[i]) {
                    correctChars++;
                }
            }
            correctCharacters += correctChars;
        }

        // NEXT WORD (always)
        currentWordIndex++;

        // Reset input
        e.target.value = '';
        typedText = '';

        renderWords();
        updateStats();
    }
}


// Render Words Display
function renderWords() {
    const wordsDisplay = document.getElementById('wordsDisplay');
    const currentWordDisplay = document.getElementById('currentWordDisplay');

    if (!wordsDisplay) return;

    wordsDisplay.innerHTML = '';

    const displayWords = words.slice(currentWordIndex, currentWordIndex + 15);

    displayWords.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.setAttribute('data-testid', `word-${index}`);

        const actualIndex = currentWordIndex + index;

        //  CURRENT WORD — LETTER BY LETTER COLORING
        if (actualIndex === currentWordIndex) {
            const typed = typedText;

            let html = "";

            for (let i = 0; i < word.length; i++) {
                if (i < typed.length) {
                    if (typed[i] === word[i]) {
                        html += `<span class="correct-letter">${word[i]}</span>`;
                    } else {
                        html += `<span class="wrong-letter">${word[i]}</span>`;
                    }
                } else {
                    html += `<span class="pending-letter">${word[i]}</span>`;
                }
            }

            span.innerHTML = html;
            span.classList.add("active-word");

        } 
        else {
            // OTHER WORDS → remain normal
            span.textContent = word;

            if (actualIndex < currentWordIndex) {
                span.classList.add('text-slate-400');
            } else {
                span.classList.add('text-slate-700');
            }
        }

        wordsDisplay.appendChild(span);
    });

    // Display the current word normally 
    if (currentWordDisplay) {
        currentWordDisplay.textContent = words[currentWordIndex];
    }
}


// Update Statistics Display
function updateStats() {
    // Calculate WPM
    if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
        if (timeElapsed > 0) {
            wpm = Math.round(correctWords / timeElapsed);
        }
    }
    
    // Calculate Accuracy
    if (totalCharacters > 0) {
        accuracy = Math.round((correctCharacters / totalCharacters) * 100);
    }
    
    // Update UI
    const timeDisplay = document.getElementById('timeDisplay');
    const wpmDisplay = document.getElementById('wpmDisplay');
    const accuracyDisplay = document.getElementById('accuracyDisplay');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const progressFill = document.getElementById('progressFill');
    
    if (timeDisplay) timeDisplay.textContent = timeLeft + 's';
    if (wpmDisplay) wpmDisplay.textContent = wpm;
    if (accuracyDisplay) accuracyDisplay.textContent = accuracy + '%';
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (progressFill) {
        const progress = (timeLeft / 60) * 100;
        progressFill.style.width = progress + '%';
    }
}

// End Game
function endGame() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    gameState = "gameOver";
    
    // Update final stats
    document.getElementById('finalWpm').textContent = wpm + ' WPM';
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalCorrect').textContent = correctWords;
    document.getElementById('finalIncorrect').textContent = incorrectWords;
    document.getElementById('finalScore').textContent = score + ' points';
    
    // Show game over screen
    showScreen('gameOverScreen');
    
    // Show name dialog if player has a good score
    if (correctWords > 0) {
        setTimeout(() => {
            showNameDialog();
        }, 500);
    }
}

// Show Name Dialog
function showNameDialog() {
    const dialog = document.getElementById('nameDialog');
    const dialogScore = document.getElementById('dialogScore');
    
    if (dialog && dialogScore) {
        dialogScore.textContent = score;
        dialog.style.display = 'flex';
        
        // Focus input
        setTimeout(() => {
            const input = document.getElementById('playerNameInput');
            if (input) {
                input.value = '';
                input.focus();
            }
        }, 100);
    }
}

// Close Name Dialog
function closeNameDialog() {
    const dialog = document.getElementById('nameDialog');
    if (dialog) {
        dialog.style.display = 'none';
    }
}

// Save Score to LocalStorage
function saveScore() {
    const input = document.getElementById('playerNameInput');
    playerName = input ? input.value.trim() : '';
    
    if (!playerName) {
        alert('Please enter your name');
        return;
    }
    
    // Get existing scores from localStorage
    let scores = JSON.parse(localStorage.getItem('typingGameScores') || '[]');
    
    // Add new score
    const newScore = {
        id: Date.now().toString(),
        player_name: playerName,
        wpm: wpm,
        accuracy: accuracy,
        score: score,
        difficulty: difficulty,
        timestamp: new Date().toISOString()
    };
    
    scores.push(newScore);
    
    // Save back to localStorage
    localStorage.setItem('typingGameScores', JSON.stringify(scores));
    
    // Close dialog
    closeNameDialog();
    
    // Show success message
    alert('Score saved to leaderboard!');
    
    // Reload leaderboard
    loadLeaderboard();
}

// Load Leaderboard from LocalStorage
function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    // Get scores from localStorage
    let scores = JSON.parse(localStorage.getItem('typingGameScores') || '[]');
    
    // Filter by difficulty and sort by score
    scores = scores
        .filter(s => s.difficulty === difficulty)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Top 10
    
    // Clear list
    leaderboardList.innerHTML = '';
    
    if (scores.length === 0) {
        leaderboardList.innerHTML = '<p class="no-scores" data-testid="no-scores-message">No scores yet. Be the first!</p>';
        return;
    }
    
    // Render leaderboard entries
    scores.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'leaderboard-entry';
        div.setAttribute('data-testid', `leaderboard-entry-${index}`);
        
        div.innerHTML = `
            <span class="rank">#${index + 1}</span>
            <span class="player-name">${entry.player_name}</span>
            <span class="stats">
                <span class="badge badge-secondary">${entry.wpm} WPM</span>
                <span class="badge badge-outline">${entry.accuracy}%</span>
                <span class="badge badge-primary">${entry.score} pts</span>
            </span>
        `;
        
        leaderboardList.appendChild(div);
    });
}

// Show Menu
function showMenu() {
    gameState = "menu";
    showScreen('menuScreen');
    loadLeaderboard();
}

// Show Screen
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    // Show selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.display = 'block';
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);