let firstCard = getRandomNumber()
let secondCard = getRandomNumber()
let cards=[firstCard, secondCard]
let sum = firstCard + secondCard
let cardEl=document.getElementById("card-el")
let sumEl=document.getElementById("sum-el")
let hasBlackjack=false
let isAlive=true
let msgEl=document.getElementById("msg")
function getRandomNumber(){ 
    let randomNumber=Math.floor(Math.random() * 13) + 1
    return randomNumber
}
let 

function startGame(){
    cardEl.textContent = "Cards : "
    for(let i=0; i<cards.length; i++){
        cardEl.textContent+=cards[i]+ " "
    }
    sumEl.textContent= "Sum : "+ sum
    if(sum<=20){
        message= "Do you want to draw new card ? " 
     }
    else if(sum===21){
       message= "You've got Blackjack"   
        hasBlackjack=true
        }
    else {
        message = "You're out of game!!!"
        isAlive=false
    }
    msg.innerText=message
}

function newCard(){
    if(hasBlackjack===false && isAlive===true){
        
    let card=getRandomNumber()
    sum+=card
    cards.push(card)
    startGame()
    
    }

}
