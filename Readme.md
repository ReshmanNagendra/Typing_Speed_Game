# Typing Speed Game

## Team Information
**Game Title:** Typing Speed Game  
**Team Members:** 
**Roles:**
- Sai Raju: HTML Structure
- Abinaya: CSS Styling & Visual Design
- Reshman Nagendra: JavaScript Game Logic & Programming Concepts


---

## Game Description

Typing Speed Game is an interactive browser-based typing speed game that tests players' typing accuracy and speed. Players are challenged to type displayed words as quickly and accurately as possible within a 60-second time limit. The game features three difficulty levels (Easy, Medium, Hard), real-time statistics tracking, and a local leaderboard system.

### Game Objective
- Type displayed words correctly within 60 seconds
- Achieve the highest WPM (Words Per Minute) score
- Maintain high accuracy throughout the game
- Compete for top positions on the leaderboard

---

## How to Play

1. **Select Difficulty:**
   - Choose from Easy, Medium, or Hard difficulty levels
   - Each level features different word complexities

2. **Start the Game:**
   - Click the "Start Game" button
   - A 60-second timer begins counting down

3. **Type the Words:**
   - Type the displayed words in the typing input field
   - Words turn green when typed correctly, red when incorrect
   - Press Space to continue to next word

4. **Track Your Progress:**
   - Monitor your real-time WPM, accuracy, and score
   - Watch the timer countdown at the top

5. **Game Over:**
   - Review your final statistics
   - Save your score to the leaderboard
   - Choose to play again or return to menu

---

## Features Implemented

### Core Features
- **Three Difficulty Levels:** Easy (short words), Medium (moderate words), Hard (complex words)
- **60-Second Timed Gameplay:** Countdown timer with visual progress bar
- **Real-Time Statistics:**
  - WPM (Words Per Minute) calculation
  - Accuracy percentage tracking
  - Score system with difficulty-based points
  - Time remaining display
- **Visual Feedback:** Color-coded word display (green for correct, red for incorrect)
- **Menu System:** Start screen with difficulty selection and instructions
- **Game Over Screen:** Detailed statistics and replay options
- **Leaderboard System:** Local storage-based score tracking and display
- **Player Name Saving:** Dialog for saving scores with player names
- **Responsive Design:** Works on desktop and mobile devices

### Scoring System
- Easy Mode: 10 points per correct word
- Medium Mode: 15 points per correct word
- Hard Mode: 25 points per correct word

---

## Programming Concepts Used

### 1. Variables & Data Types (5+ types used)
- **Numbers:** `wpm`, `accuracy`, `score`, `timeLeft`, `currentWordIndex`
- **Strings:** `difficulty`, `playerName`, `typedText`, `gameState`
- **Booleans:** Used in conditional logic for game state checks
- **Arrays:** `words[]`, word lists for each difficulty level
- **Objects:** Score objects stored in leaderboard with multiple properties

### 2. Operators
- **Arithmetic:** `wpm = Math.round(correctWords / timeElapsed)`, `score += points`, `timeLeft--`
- **Logical:** `&&` (AND), `||` (OR) in conditional statements
- **Relational:** `>`, `<`, `===`, `!==` for comparisons
- **Assignment:** `=`, `+=`, `-=`

### 3. Conditional Statements
- **if/else:** Game state management, word validation, score calculation
- **Switch-case equivalent:** Difficulty-based point assignment
- **Ternary operators:** Color class assignment based on conditions

### 4. Loops
- **For loops:** 
  - Array iteration in `renderWords()` function
  - Character-by-character word comparison
  - Fisher-Yates shuffle algorithm for word randomization
- **While loops:** Conceptually used in timer interval
- **forEach loops:** Leaderboard rendering, DOM manipulation

### 5. Nested Loops
- **Character validation:** Nested loop structure comparing typed characters with target word
  ```javascript
  for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== word[i]) {
          isCorrectSoFar = false;
          break;
      }
  }
  ```
- **Word shuffling algorithm:** Nested randomization logic

### 6. Functions (8+ user-defined functions)
1. `init()` - Initialize game on page load
2. `loadWords()` - Load and shuffle word lists
3. `selectDifficulty()` - Change difficulty level
4. `startGame()` - Start new game session
5. `handleTyping()` - Process user input
6. `renderWords()` - Display words dynamically
7. `updateStats()` - Calculate and update statistics
8. `endGame()` - End game and show results
9. `saveScore()` - Save player score to localStorage
10. `loadLeaderboard()` - Retrieve and display leaderboard
11. `showScreen()` - Manage screen transitions

### 7. Arrays & Objects
- **Arrays:** 
  - `words[]` - Stores current game word list
  - `wordLists.easy[]`, `wordLists.medium[]`, `wordLists.hard[]` - Word libraries
  - `scores[]` - Leaderboard data
- **Objects:**
  - `wordLists{}` - Object containing difficulty-based word arrays
  - Score objects with properties: `id`, `player_name`, `wpm`, `accuracy`, `score`, `difficulty`, `timestamp`

### 8. DOM Manipulation
- **Creating elements:** `document.createElement('span')`, `document.createElement('div')`
- **Modifying elements:** `element.textContent`, `element.innerHTML`, `element.style.width`
- **Adding/removing classes:** `classList.add()`, `classList.remove()`
- **Attribute manipulation:** `setAttribute('data-testid', value)`
- **Dynamic rendering:** Words display, leaderboard entries

### 9. Event Handling
- **Input events:** `input` event on typing field
- **Click events:** Button clicks for navigation and actions
- **Keyboard events:** `keypress` for Enter key detection
- **Page load events:** `DOMContentLoaded` for initialization

### 10. Additional Concepts
- **Intervals & Timers:** `setInterval()`, `clearInterval()` for countdown
- **Local Storage:** `localStorage.setItem()`, `localStorage.getItem()` for persistence
- **JSON:** `JSON.parse()`, `JSON.stringify()` for data storage
- **Array Methods:** `filter()`, `sort()`, `slice()`, `forEach()`, `map()`
- **String Methods:** `trim()`, `charAt()`, `toUpperCase()`, `slice()`
- **Math Operations:** `Math.round()`, `Math.floor()`, `Math.random()`
- **Date/Time:** `Date.now()`, `new Date().toISOString()`

---

## Challenges Faced & Solutions

### Challenge 1: Real-Time WPM Calculation
**Problem:** Calculating accurate WPM while the game is in progress without causing performance issues.

**Solution:** Implemented time-based calculation using `Date.now()` to track elapsed time in milliseconds, converting to minutes, and dividing correct words by elapsed time. Used `Math.round()` to display whole numbers.

### Challenge 2: Character-by-Character Accuracy Tracking
**Problem:** Needed to track accuracy at the character level, even for incorrectly typed words.

**Solution:** Created nested loop logic that compares each character of the typed word against the target word, incrementing `correctCharacters` for matches even in overall incorrect words.

### Challenge 3: Dynamic Word Color Feedback
**Problem:** Providing real-time visual feedback as users type, showing if they're on the right track.

**Solution:** Implemented color-coding system in `renderWords()` function that:
- Shows grey for upcoming words
- Shows green when typing matches correctly
- Shows red when typing has errors
- Shows light grey for completed words

### Challenge 4: Managing Game State Transitions
**Problem:** Smoothly transitioning between menu, playing, and game over states without bugs.

**Solution:** Created `showScreen()` function that hides all screens first, then displays only the target screen. Used `gameState` variable to track current state and prevent conflicts.

### Challenge 5: LocalStorage Leaderboard Persistence
**Problem:** Storing and retrieving leaderboard data that persists across browser sessions.

**Solution:** Used `localStorage` API with JSON serialization. Implemented sorting and filtering logic to display top 10 scores per difficulty level.

### Challenge 6: Timer Management
**Problem:** Ensuring timer stops properly when game ends and doesn't continue in background.

**Solution:** Stored interval reference in `timerInterval` variable and used `clearInterval()` when ending game. Added checks to prevent multiple timers running simultaneously.

---

## File Structure

```
TypeSpeed_Game/
├── index.html      # Main HTML structure
├── style.css       # Complete styling and animations
├── script.js       # All game logic and functionality
├── README.md       # This documentation file
├── Flowchart.md    # 
```

---

## How to Run

1. **Download all files** (index.html, style.css, script.js)
2. **Place all files in the same folder**
3. **Open index.html** in any modern web browser (Chrome, Firefox, Safari, Edge)
4. **No server required** - Game runs entirely in the browser
5. **Internet connection needed** only for loading Google Fonts

---

## Technologies Used

- **HTML5** - Semantic structure and markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Game logic, DOM manipulation, and event handling
- **LocalStorage API** - Data persistence for leaderboard
- **Google Fonts** - Space Grotesk and Inter font families

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Future Enhancements

- Multiplayer mode with real-time competition
- More difficulty levels and custom word lists
- Sound effects and background music
- Achievements and badges system
- Practice mode without time limit
- Statistics graphs and progress tracking over time
- Dark mode theme option
- Social sharing of scores

---

## Credits

**Fonts:** Google Fonts (Space Grotesk, Inter)  
**Design Inspiration:** Modern typing test applications  
**Color Palette:** Teal/Cyan gradient theme for calm, focused typing experience

---
