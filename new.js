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
    // proceed if not every element is a number
    if(!isNumber) {
       for(let i = 0; i < newBasket.length; i++) {
           var el = newBasket[i];
           if(el === 'k' || el === 'j' || el === 'q') {
               newBasket.splice(i, 1, 10);
           } else if (el === 'ace') {
                newBasket.splice(i, 1, 11);               
           }
        }        
    }
    //this is the total sum of the generated cards
    var cardSum = newBasket.reduce((prev, curr) =>  prev + curr, 0);

    if(cardSum < 21) {
        yourScore.textContent = 'Your Score: ' + cardSum;
    }
    if(cardSum === 21) {
        announcement.textContent = "Wow! Black Jack!!! You are so lucky!";
        yourScore.textContent = 'Your Score: ' + cardSum;
        disableBtns();
        setTimeout(() => {
            location.reload();
        }, 5000);
    } else if(cardSum > 21) { //if the sum of elements is over 21 and contains 'ace'
        if(cardBasket.includes('ace')) {
            cardSum -= 10;
            if(cardSum === 21) {
                announcement.textContent = "Wow! Black Jack!!! You are so lucky!";
                yourScore.textContent = 'Your Score: ' + cardSum;
                disableBtns();
                setTimeout(() => {
                    location.reload();
                }, 5000);
            }
            if(cardSum < 21) {
                yourScore.textContent = 'Your Score: ' + cardSum;
                return;
            } else if (cardSum > 21) {
                console.log(cardSum)
                yourScore.textContent = 'Your Score: ' + cardSum;
                announcement.textContent = 'You Bust! Play again...';
                disableBtns();
                setTimeout(() => {
                    location.reload();
                }, 5000);
            }           
        }
        else {
            announcement.textContent = 'You Bust! Play again...';
            yourScore.textContent = 'Your Score: ' + cardSum;
            disableBtns();
            setTimeout(() => {
                location.reload();
            }, 5000);
        }    
    } 
    playerScore = cardSum;
}

calculateBasketSum();

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

hit.addEventListener('click', () => getAnotherCard());
stand.addEventListener('click', () => {
    disableBtns();
    setTimeout(() => {
        location.reload();
    }, 1000);
});








