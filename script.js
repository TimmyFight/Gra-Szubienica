const game = {
    currentSentence : null, //aktualne hasło 
    currentSentenceLetters : null, 
    attempts : 10, //liczba prób
    elemBoardElem : document.querySelector('.game-board'), // element z całą grą 
    elemSentence : document.querySelector('.game-sentence'), // element z hasłem do zgadnięcia
    elemAttempts : document.querySelector('.game-attempts'), // element z liczbą prób
    elemLetters : document.querySelector('.game-letters'), // lista z literkami do klikania

    sentences : [ // hasła z których losujemy
        "Fantomas",
        "Super Szamson",
        "Hasło",
        "Myszka",
        "Super bohaterowie",
        "Super pies",
        "Przyjaciel",
        "Kurs Javascript",
        "Terminator",
        "Superman",
        "Herkules",
        "Batman",
        "Spiderman",
        "Kapitan Ameryka"
    ],

generateLetterButtons : function() {
    const alphabet = ['a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','q','r','s','ś','t','u','v','w','x','y','z','ź','ż'];

    alphabet.forEach(function(letter) {
        const button = document.createElement('button');
        button.classList.add('game-letter');
        button.type = 'button';
        button.dataset.letter = letter;
        button.innerHTML = letter; 
        this.elemLetters.appendChild(button);
    }.bind(this));
},

gameOver : function() {
  alert("Nie udało Ci się odgadnąć hasła.\n\n Hasło to: " + this.currentSentence);  
  this.disableLetters();
},

gameComplete : function () {
    alert("Gratulacje, odgadłeś hasło!!!")
    this.disableLetters();
},
  
isLetterExists : function() {
    return this.currentSentenceLetters.length;
},

checkLettersInSentention : function(letter) {
    if(this.currentSentence.indexOf(letter) !=-1)
    for (let i=0; i<this.currentSentence.length; i++) {
        if (this.currentSentence[i] === letter) {
            this.elemSentence.querySelectorAll('.game-sentence-box')[i].innerHTML = letter; 
        }
    }

    //usuwamy trafioną literę z currentSentenceLetters
    this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, 'g'), '');

    if (!this.isLetterExists()) {
        this.gameComplete();
    }else { //nie ma takiej litery w haśle
    this.attempts--;
    this.showAttempts();

    if (this.attempts <=0) {
        this.gameOver();
    }
}
},

bindEvents : function() {
    this.elemLetters.addEventListener('click', function(e) {
        if(e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains('game-letter')){
            const letter = e.target.dataset.letter;
            this.checkLettersInSentention(letter.toUpperCase());
            e.target.disabled = true;
        }
    }.bind(this));
},

enableLetters : function() { 
    //pobieramy litery i robimy po nich pętlę, żeby je włączyć 
    const letters = this.elemLetters.querySelectorAll('.game-letter');
    [].forEach.call(letters, function(letter) {
        letter.disabled = false;
    });
},

disableLetters : function() { 
    //pobieramy litery i robimy po nich pętlę, żeby je włączyć 
    const letters = this.elemLetters.querySelectorAll('.game-letter');
    [].forEach.call(letters, function(letter) {
        letter.disabled = true;
    });
},

showAttempts : function() {
    this.elemAttempts.innerHTML = this.attempts;
},

randomSentence : function() { 
    const max = this.sentences.length-1;
    const min = 0; 
    const rand = Math.floor(Math.random()*(max-min+1)+min);

    this.currentSentence = this.sentences[rand].toUpperCase();
    this.currentSentenceLetters = this.currentSentence.replace(/ /g, '');

    this.elemSentence.innerHTML = '' // czyścimy listę

    const letters = this.currentSentence.split('');
    for(let i=0; i<letters.length; i++) {
        const div = document.createElement('div');
        div.classList.add('game-sentence-box');
    if (letters[i] === ' '){
        div.classList.add('game-sentence-box-space');
    }
    this.elemSentence.appendChild(div);
    }
},

startGame : function() { 
    this.attempts = 10; 
    this.randomSentence();
    this.showAttempts();
    this.enableLetters();
},

initBoard : function() {
    this.generateLetterButtons();
    this.bindEvents();
    this.disableLetters();
}

};

game.initBoard();

document.querySelector('.game-start').addEventListener('click', function() {
    game.startGame();
});