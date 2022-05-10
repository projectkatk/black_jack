var body = document.querySelector('body');
var nums = ['ace',2,3,4,5,6,7,8,9,10,'j','k','q'];
var types = ['aclover','aspade','adia','aheart'];
var pickedCards = document.querySelector('.cards');
var yourScore = document.querySelector('.yourScore');
var hit = document.querySelector('.hit');
var stand = document.querySelector('.stand');
var btn = document.querySelectorAll('button');
var announcement = document.querySelector('.announcement');

var playerScore = 0;
var cardBasket = [];
var cardStack = [];

var rand1 = Math.floor(Math.random() * 170) + 80;
var rand2 = Math.floor(Math.random() * 170) + 80;
var rand3 = Math.floor(Math.random() * 180) + 70;

body.style.backgroundColor = `rgb(${rand1}, ${rand2}, ${rand3})`;

// get two initial cards for the player
var initialTwoCards = function() {
    var randomCardType1 = types[Math.floor(Math.random() * 4)];
    var randomCardType2 = types[Math.floor(Math.random() * 4)];

    var variant1 = nums[Math.floor(Math.random() * 13)];
    var variant2 = nums[Math.floor(Math.random() * 13)];

    var cardComb1 = randomCardType1 + '-' + variant1;
    var cardComb2 = randomCardType2 + '-' + variant2;

    if((randomCardType1 + variant1) !== (randomCardType2 + variant2)) {
        var card1 = `<img class="card" src="img/SVG/${randomCardType1}-${variant1}.svg" />`;
        var card2 = `<img class="card" src="img/SVG/${randomCardType2}-${variant2}.svg" />`;
        cardStack.push(cardComb1, cardComb2);

        pickedCards.innerHTML = card1 + card2;
        cardBasket.push(variant1, variant2);
    } else {
        location.reload();
    }
}

initialTwoCards();
// end of initial two cards distribution //


// calculate the total accumulated score of the player
var calculateBasketSum = function() {
    // check if every elemenet in the cardBasket array is a number
    var isNumber = cardBasket.every(el => {
        return !isNaN(el)
    });
    // new basket contains the combined card names (eg.aheart-3) for the generated cards
    var newBasket = cardBasket.map(el => {
        return el;
    });

    // this is to count Aces in the array
    var countAces = 0;

    // proceed if not every element is a number
    if(!isNumber) {
       for(let i = 0; i < newBasket.length; i++) {
           var el = newBasket[i];
           if(el === 'k' || el === 'j' || el === 'q') {
               newBasket.splice(i, 1, 10); 
              
           } else if (el === 'ace') {
               newBasket.splice(i, 1, 11);
               countAces++;
           }
        }
    }    
    //this is the total sum of the generated cards
    var cardSum = newBasket.reduce((prev, curr) =>  prev + curr, 0);

    // case of blackjack
    if(cardSum === 21) {
        blackjack(cardSum);
    }   
    // when sum of array is more than 21 and contains more than 1 Aces
    while(countAces > 0 && cardSum > 21) {
        cardSum -= 10;
        countAces--;
        if(cardSum === 21) {
            blackjack(cardSum);
        }
    }
    //case of sum of array being less than 21
    if(cardSum < 21) {
        yourScore.textContent = 'Your Score: ' + cardSum;
    }    
    // case of sum or array being more than 21
    if(cardSum > 21) {
        busted(cardSum);
    }   
    playerScore = cardSum;
}
calculateBasketSum();

// ==== end of calculate function ======= //
var busted = function (cardSum) {
    announcement.textContent = 'You Bust! Play again...';
    yourScore.textContent = 'Your Score: ' + cardSum;
    disableBtns();
    setTimeout(() => {
        location.reload();
    }, 5000);
}

var blackjack = function (cardSum) {
    announcement.textContent = "Wow! Black Jack!!! You are so lucky!";
        yourScore.textContent = 'Your Score: ' + cardSum;
        setTimeout(() => {
            location.reload();
        }, 3000);
        btn.disabled = true;
}



var getAnotherCard = function() {
    var randomCardTypeNew = types[Math.floor(Math.random() * 4)];
    var variantNew = nums[Math.floor(Math.random() * 13)];
    var newCardCom = `${randomCardTypeNew}-${variantNew}`;


    if(!cardStack.includes(newCardCom)) {
       cardStack.push(newCardCom)
        var newCard = `<img class="card" src="img/SVG/${randomCardTypeNew}-${variantNew}.svg" />`
        pickedCards.insertAdjacentHTML('beforeend', newCard);
        cardBasket.push(variantNew);
        calculateBasketSum();
    }
}

var disableBtns = function() {
    for(let el of btn) {
        el.disabled = 'true';
    }
}

// hit or stand button click event
hit.addEventListener('click', () => getAnotherCard());
stand.addEventListener('click', () => {
    disableBtns();
    setTimeout(() => {
        location.reload();
    }, 1000);
});








