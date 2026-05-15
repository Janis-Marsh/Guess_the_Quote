// Stores all quotes
const quotes = [
    { quote: "this sign can't stop me cause i can't read!", answer: "Arthur", category: "tv show", hint: "D.W Read" },
    { quote: "So remember, whether a bot is made of new parts, old parts, or spare parts, you can shine no matter what you do.", answer: "Robots", category: "movie", hint: "Bigweld" },
    { quote: "This is America, Lois. Men have always run things and there have never been any problems, whatsoever. And don't say the economy or Iraq or income inequality or racism or Brett Kavanaugh or air pollution or Vietnam or slavery or Watergate or capitalism or #MeToo or homelessness or police brutality or homophobia or Monica Lewinsky or school shootings or Native American genocide or FOX News or Tim Allen or climate change.", answer: "Family Guy", category: "tv show", hint: "Peter Griffin" },
    { quote: "Ya like jazz?", answer: "Bee Movie", category: "movie", hint: "Barry B. Benson" },
    { quote: "It's never lupus.", answer: "House MD", category: "tv show", hint: "Gregory House" },
    { quote: "I don't trust the guy. He's like an eel dipped in grease, swimming in motor oil.", answer: "Total Drama World Tour", category: "tv show", hint: "Noah" },
    { quote: "I just washed my hands that's why they're wet. No other reason.", answer: "Spider-man: Into the Spider-verse", category: "movie", hint: "Peter Porker" },
    { quote: "I'm the one who gripped you tight and raised you from Perdition.", answer: "Supernatural", category: "tv show", hint: "Castiel" },
    { quote: "My ex-wife still misses me... but her aim is getting better!", answer: "Gravity Falls", category: "tv show", hint: "Stan Pines" },
    { quote: "I'm sorry, but I believe I squashed a frog when I fell.", answer: "The Apothecary Diaries", category: "tv show", hint: "Maomao" },
    { quote: "My first word was Hoot. My second word was hoot hoot. My third word...", answer: "The Owl House", category: "tv show", hint: "Hooty" },
    { quote: "We are going to steal... pause for effect... THE MOON!!!", answer: "Despicable Me", category: "movie", hint: "Felonious Gru" },
    { quote: "How long have you been 17?", answer: "Twilight", category: "movie", hint: "Bella Swan" },
    { quote: "Live long and prosper.", answer: "Star Trek", category: "tv show", hint: "Spock" },
    { quote: "Flash, Flash, Hundred Yard Dash", answer: "Zootopia", category: "movie", hint: "Nick Wilde" },
    { quote: "This is where the fun begins", answer: "Star Wars: Episode III - Revenge of the Sith", category: "movie", hint: "Anakin Skywalker" },
    { quote: "What did you just say? Chai tea? Chai means 'tea', bro! You are saying 'tea tea'! Would I ask you for a 'coffee coffee' with room for 'cream cream'?", answer: "Spider-man: Across the spider-verse", category: "movie", hint: "Pavitr Prabhakar" },
    { quote: "My own mother thought I was a monster... She was right, of course, but it still hurt", answer: "Avatar: The Last Airbender", category: "tv show", hint: "Azula" },
    { quote: "Ninja Storm, Ranger Form!!!!", answer: "Power Rangers Ninja Storm", category: "tv show", hint: "Wind Rangers" },
    { quote: "Skadoosh", answer: "Kung Fu Panda", category: "movie", hint: "Po" },
    { quote: "Inner Peace, Dinner Please, Dinner with Peas", answer: "Kung Fu Panda 4", category: "movie", hint: "Po" },
    { quote: "This is a cow farm. You're gonna find cows outside.", answer: "Barnyard", category: "movie", hint: "Nathan Randall Beady III" },
    { quote: "You just gestured to all of me.", answer: "How to train your dragon", category: "movie", hint: "Hiccup Horrendous Haddock III" },
    { quote: "Thank you for nothing, you useless reptile.", answer: "How to train your dragon", category: "movie", hint: "Hiccup Horrendous Haddock III" },
    { quote: "The Egyptians believe that the most significant thing you could do in your life was die.", answer: "Cunk on Earth", category: "tv show", hint: "Philomena Cunk" },
    { quote: "You want my money, go get it!", answer: "John Mulaney: Kid Gorgeous at Radio City", category: "comedy", hint: "Radio City" },
    { quote: "I don't know. I ... I guess I'm not woke. Okay? Fine! You win with your gay stuff! That's what you want, right? To win", answer: "Family Guy", category: "tv show", hint: "Lois Griffin" },
    { quote: "Ha ha ha ha ha! Ha ha ha ha ha! Hey, look at that high-waisted man! He got feminine hips!", answer: "John Mulaney: New in Town", category: "comedy", hint: "New in Town" },
    { quote: "Hey, you could pour soup in my lap and I'll probably apologize to you.", answer: "John Mulaney: The Comeback Kid", category: "comedy", hint: "Comeback Kid" },
    { quote: "Hey, before we hand you a baby forever, can you put this metal bowl in the microwave for me?", answer: "Taylor Tomlinson: Quarter-Life Crisis", category: "comedy", hint: "Quarter-Life Crisis" },
    { quote: "When I can't sleep, I lay on the floor in the kitchen for 10 minutes", answer: "Taylor Tomlinson: Have It All", category: "comedy", hint: "Have it All" },
    { quote: "She's in heaven, I'm on Netflix, it all worked out.", answer: "Taylor Tomlinson: Look at You", category: "comedy", hint: "Look at You" },
    { quote: "And remember, with a little Rust-eze, and an insane amount of luck... You too, can look like me. Kachow.", answer: "Cars", category: "movie", hint: "Lighting McQueen" },
];

// global variables

// tracks current mode
let currentMode = 'all';

// holds shuffled quotes
let shuffledQuote = [];

// holds current quote index
let currentIndex = 0;

// tracks score
let score = 0;

// tracks amount of guesses per quote
let guesses = 0;

// holds active quotes
let activeQuotes = [];

// Gets important HTML element ids
const guessInput = document.getElementById('guessInput');
const feedback = document.getElementById('feedback');
const hint = document.getElementById('hint');
const tracker = document.getElementById('scoreTracker');

// Randomly shuffles array
function shuffleArray(quotes) {
    
    let m = quotes.length;
    while (m > 0) {
        const i = Math.floor(Math.random() * m);
        m--;

        [quotes[m], quotes[i]] = [quotes[i], quotes[m]];
    }
    return quotes;
}

// Filters quotes by mode and starts the game
function startGame(mode) {
    currentMode = mode;

    if (mode === 'all') {
        activeQuotes = [...quotes];
    } else {
        activeQuotes = quotes.filter(q => q.category === mode);
    }

    resetGame();

    // Switches screens
    document.getElementById('modeSelector').classList.replace('active-screen', 'hidden-screen');
    document.getElementById('gameScreen').classList.replace('hidden-screen', 'active-screen');

    displayQuote();
}

// Displays current quote
function displayQuote() {
    document.getElementById('quote-container').textContent = `"${shuffledQuote[currentIndex].quote}"`;
    guessInput.value = '';
}

// Removes punctuation
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Check user's guess
function checkGuess(){

    const userGuess = normalizeText(guessInput.value);
    const correctGuess = normalizeText(shuffledQuote[currentIndex].answer);
   
    // Tracks score and informs user they guessed correctly
    if (userGuess === correctGuess){
        feedback.textContent = `Congratulations! You guessed correct.`;
        feedback.style.color = 'green';
        guesses = 0;

        score++;

        if (score > 0) {
            tracker.textContent = `Score: ${score}`;
            tracker.className = 'score';
        }
       
        // moves to next quote after delay
        setTimeout(nextQuote, 1500);

        return;

    } 

    // Asks user to enter input
    else if (userGuess === '') {
        feedback.textContent = "Please input a guess.";
        feedback.style.color = 'orange';
    }
    // increases guess and tracks wrong answer
    else {
        guesses++
        feedback.textContent = `Wrong Answer! (${guesses}/3)`;
        feedback.style.color = 'red';
    }

    // Gives a hint after 2 guesses
    if (guesses === 2) {
        hint.textContent = `Hint: Character = ${shuffledQuote[currentIndex].hint}`
        hint.style.color = 'brown';
        hint.style.fontWeight = 'bold';

        if (shuffledQuote[currentIndex].answer.includes("John Mulaney") || shuffledQuote[currentIndex].answer.includes("Taylor Tomlinson")) {
            hint.textContent = `Hint: ${shuffledQuote[currentIndex].hint}`
            hint.style.color = 'brown';
            hint.style.fontWeight = 'bold';
        }
    }

    // Reveals answer after too many wrong guesses
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

// Moves to the next quote
function nextQuote() {
    currentIndex++;

    // checks if the game is over
    if (currentIndex >= shuffledQuote.length) {
        gameOver();
        setTimeout(resetGame, 3000);
        return;
    }

    displayQuote();
    feedback.textContent = '';
    hint.textContent = '';
}

// handles the end of the game
function gameOver() {

    feedback.textContent = "You've completed all quotes";
    feedback.style.color = 'rebeccapurple';
    feedback.style.fontSize = '28px';
}

// resets game
function resetGame() {

    feedback.textContent = '';
    hint.textContent = '';
    tracker.textContent = '';
    tracker.className = '';

    shuffledQuote = shuffleArray([...activeQuotes]);
    currentIndex = 0;
    guesses = 0;
    score = 0;

    displayQuote();
}

// Reveals answer and moves to next quote after a delay
function skipQuote() {

    feedback.textContent = `Correct Answer: ${shuffledQuote[currentIndex].answer}`;
    feedback.style.color = 'navy';
    
    setTimeout(nextQuote, 2000);
    return;
}

// Returns user to main menu
function goToMenu() {
    document.getElementById('modeSelector').classList.replace('hidden-screen', 'active-screen');
    document.getElementById('gameScreen').classList.replace('active-screen', 'hidden-screen');
}

document.addEventListener('DOMContentLoaded', () => {

    // Game Buttons
    document.getElementById('submitBtn').addEventListener('click', checkGuess);
    document.getElementById('skipBtn').addEventListener('click', skipQuote);
    document.getElementById('menuBtn').addEventListener('click', goToMenu);

    // Mode Selection
    document.getElementById('allBtn').addEventListener('click', () => startGame('all'));
    document.getElementById('tvBtn').addEventListener('click', () => startGame('tv show'));
    document.getElementById('movieBtn').addEventListener('click', () => startGame('movie'));
    document.getElementById('comedyBtn').addEventListener('click', () => startGame('comedy'));

    // Instructions popup
    const popup = document.getElementById('instructionsPopup');

    document.getElementById('instructionsBtn')
        .addEventListener('click', () => {
        popup.classList.remove('hidden-screen');
    });

    document.getElementById('closeInstructions').addEventListener('click', () => {
        popup.classList.add('hidden-screen');
    });

    // allows user to submit by pressing enter
    document.getElementById('guessInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });

});
