var pickedCards = document.querySelector('.cards');
var buttons = document.querySelector('.buttons');
var hit = document.querySelector('.hit');
var stand = document.querySelector('.stand');
var announcement = document.querySelector('h1');
var yourScore = document.querySelector('.yourScore');

var nums = ['ace',2,3,4,5,6,7,8,9,10,'j','k','q'];

var types = ['aclover','aspade','adia','aheart'];

var playerScore = 0;
var cardBasket = [];
var checkDuplicate = [];



var getFirstCards = function() {
    var randomCardType1 = types[Math.floor(Math.random() * 3 + 1)];
    var randomCardType2 = types[Math.floor(Math.random() * 3 + 1)];
    
    var variant1 = nums[Math.floor(Math.random() * 13)];
    var variant2 = nums[Math.floor(Math.random() * 13)];

    if((randomCardType1 + variant1) !== (randomCardType2 + variant2)) {
        var card1 = `<img class="card" src="img/SVG/${randomCardType1}-${variant1}.svg" />`
        var card2 = `<img class="card" src="img/SVG/${randomCardType2}-${variant2}.svg" />`

        pickedCards.innerHTML = card1 + card2;
        cardBasket.push(variant1, variant2);
        checkDuplicate.push(randomCardType1+variant1, randomCardType2+variant2);
        console.log(checkDuplicate)
    } else {
        location.reload();
    }
    console.log(cardBasket)
}

getFirstCards();


var calculateInitialSum = function() {
    var initialSumAmount = 0;

    if(cardBasket.reduce((prev, curr) => prev + curr, 0) === 21) {
        h1.textContent = 'Black Jack!!! The game will re-start.'
    }
    if(cardBasket.every((el) => !isNaN(el))) {
        initialSumAmount = cardBasket.reduce((prev, curr) => prev + curr, 0);
    } else {
        if(cardBasket.every(el => el === 'ace')) {
            initialSumAmount = 12;
        } else {
            if(cardBasket.every(el => isNaN(el))) {
                if(cardBasket.includes('ace')) {
                    initialSumAmount = 1 + 10;
                } else {
                    initialSumAmount = 20;
                }
            } else {
                if(!isNaN(cardBasket[0])) {
                    initialSumAmount = cardBasket[0] + 10;
                }
                if(!isNaN(cardBasket[1])) {
                    initialSumAmount = cardBasket[1] + 10;
                }
            }
        }
    } 
    return initialSumAmount;
}

calculateInitialSum()



hit.addEventListener('click', () => getANewCard());

var getANewCard = function() {
    var newCardType = types[Math.floor(Math.random() * 3 + 1)];    
    var newVariant = nums[Math.floor(Math.random() * 12 + 1)];
    console.log(newVariant)

   
        if(checkDuplicate.every(el => el !== newCardType + newVariant)) {
            var newCard =  document.createElement('img');
            newCard.classList.add('card');
            newCard.src = `img/SVG/${newCardType}-${newVariant}.svg`
            pickedCards.insertAdjacentElement('beforeend', newCard)
            cardBasket.push(newVariant);
            calculateNewSum(cardBasket, newVariant)
        }
}

var playOrNot = function() {
    if(confirm('play again?')) {
        location.reload();
    }
}

var blackJackCase = function (array) {   
    yourScore.textContent = array.reduce((prev, curr) => prev+curr,0);
    announcement.textContent = "Black Jack! You Rock! 🎉🥳"
    playOrNot();
}

// var measureSumAfterNewVariant = function(array, num) {    
//     if(calculateInitialSum() + num === 21) {
//         array.push(num);
//         blackJackCase(array);
//     } else if(calculateInitialSum() + num < 21) {
//         array.push(num);
//         announcement.textContent = 'Hit or Stand!';
//         yourScore.textContent = array.reduce((prev, curr) => prev + curr, 0)     
//     } else if(calculateInitialSum() + num > 21) {
//         array.push(num);
//         console.log(array)
//         announcement.textContent = 'You Bust!';
//         yourScore.textContent = array.reduce((prev, curr) => prev + curr, 0)         
//         playOrNot();
//     }
// }

// var calculateNewSum = function(array, variant) {
//     if(variant === 'ace') {
//         measureSumAfterNewVariant(array,11);
//     }
//     else if (variant === 'j' || variant === 'k' || variant === 'q') {
//         measureSumAfterNewVariant(array,10);
//     } else {
//         yourScore.textContent = array.reduce((prev, curr) => prev + curr, 0) 
        
//     }
// }


// for(let i = 0; i < nums.length; i++) {
//     let eachCard = nums[i];    
// }


