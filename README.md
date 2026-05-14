# Guess the Quote
A browser-based quote guessing game where player's attempt to guess the source of the quote

## Features
- Randomized quote order
- Score tracking system
- Category filtering (Movies / TV shows / All)
- Attempt tracking (max 3 attempts per quote)
- Game reset functionality
- Instructions popup
- Responsive screen switching (menu &harr; game)

## How to Play
- Select a mode
- Read the quote and guess where it comes from
- You get **3 tries** per quote before the answer is revealed
- You can skip a quote at any time
- Type your guess and press submit guess or enter to check your answer

## Code Overview

The game consists of several important functions:

### 1. Random Quote Generation

Shuffles quotes

```javascript
function shuffleArray(quotes) {
    
    let m = quotes.length;
    while (m > 0) {
        const i = Math.floor(Math.random() * m);
        m--;

        [quotes[m], quotes[i]] = [quotes[i], quotes[m]];
    }
    return quotes;
}
```

### 2. Start game function

// Filters quotes by mode and starts the game

```javascript
function startGame(mode) {
    currentMode = mode;

    if (mode === 'all') {
        activeQuotes = [...quotes];
    } else {
        activeQuotes = quotes.filter(q => q.category === mode);
    }

    shuffledQuote = shuffleArray([...activeQuotes]);
    currentIndex = 0;

    document.getElementById('modeSelector').classList.replace('active-screen', 'hidden-screen');
    document.getElementById('gameScreen').classList.replace('hidden-screen', 'active-screen');

    displayQuote();
}
```

### 3. Display Quote Function

Displays current quote

```javascript
function displayQuote() {
    document.getElementById('quote-container').textContent = `"${shuffledQuote[currentIndex].quote}"`;
    guessInput.value ='';
}
```

### 4. Guess Checking Function

Checks user's guess

```javascript
function checkGuess(){

    const userGuess = normalizeText(guessInput.value);
    const correctGuess = normalizeText(shuffledQuote[currentIndex].answer);
   
    if (userGuess === correctGuess){
        feedback.textContent = `Congratulations! You guessed correct.`;
        feedback.style.color = 'green';
        guesses = 0;

        score++;

        if (score > 0) {
            tracker.textContent = `Score: ${score}`;
            tracker.className = 'score';
        }
       
        setTimeout(nextQuote, 1500);

        return;
    } 
    else if (userGuess === '') {
        feedback.textContent = "Please input a guess.";
        feedback.style.color = 'orange';
    }
    else {
        guesses++
        feedback.textContent = `Wrong Answer! (${guesses}/3)`;
        feedback.style.color = 'red';
    }

    if (guesses === 2) {
        hint.textContent = `Hint: Character = ${shuffledQuote[currentIndex].hint}`
        hint.style.color = 'orange';
        hint.style.fontWeight = 'bold';
    }

    if (guesses >= 3) {
        feedback.textContent = `Correct Answer: ${shuffledQuote[currentIndex].answer}`;
        feedback.style.color = 'navy';
        hint.textContent = '';
        guesses = 0;

        setTimeout(nextQuote, 2000);
        return;
    }

    guessInput.value = '';
}
```

### 4. Next Quote Function

Moves to the next quote

```javascript
function nextQuote() {
    currentIndex++;

    if (currentIndex >= shuffledQuote.length) {
        gameOver();
        setTimeout(resetGame, 3000);
        return;
    }

    displayQuote();
    feedback.textContent = '';
}
```

### 5. Skip Quote Function

Reveals answer and moves to next quote after a delay

```javascript
function skipQuote() {

    feedback.textContent = `Correct Answer: ${shuffledQuote[currentIndex].answer}`;
    feedback.style.color = 'navy';
    
    setTimeout(nextQuote, 2000);
    return;
}
```

### 6. Reset Game Function

```javascript
function resetGame() {
   
    feedback.textContent = '';
    tracker.textContent = '';
    tracker.className = '';

    shuffledQuote = shuffleArray([...activeQuotes]);
    currentIndex = 0;
    guesses = 0;
    score = 0;

    displayQuote();
}
```

## Technologies Used

- HTML
- CSS
- JavaScript

## Implementation

To implement this game you need:

1. An HTML file with:
- A menu screen with:
    - Mode selection buttons
    - Instructions popup
- A game screen with:
    - Quote display area
    - Input field
    - Submit button
    - Skip button
    - Go back to menu button
    - Element to track score
    - Element to display feedback

2. The JavaScript code provided above

3. Optional CSS for styling

## Example HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guess the Quote</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <h1>Guess the Quote</h1>

    <div id="modeSelector"  class="active-screen">
       
        <h2>Select a Mode:</h2>
        <button id="allBtn">All</button>
        <button id="tvBtn">TV Shows</button>
        <button id="movieBtn">Movies</button>
        
    </div>

    <div id="gameScreen" class="hidden-screen">

        <div id="quote-container"></div>

        <p id="feedback"></p>
        <p id="hint"></p>

        <input type="text" id="guessInput" placeholder="Enter a guess" accesskey="i">

        <p id="scoreTracker"></p>
        <br/>

        <button id="submitBtn" accesskey="g">Submit Guess</button>
        <button id="skipBtn" accesskey="s">Skip Quote</button>
        <button id="menuBtn" accesskey="m">Back to Menu</button>
    </div>
</body>
</html>
```

## Known Issues/Future Improvements
- Improve mobile responsiveness
- Add more stand-up comedy quotes
- Add more quote categories
