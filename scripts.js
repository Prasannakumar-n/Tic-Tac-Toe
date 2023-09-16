document.addEventListener('DOMContentLoaded', function () {

let playerText = document.getElementById('playerText')
let boxes = Array.from(document.getElementsByClassName('title'))
let resetbtn = document.getElementById('resetbtn')
let turn = document.getElementsByClassName('display-player')[0]
let r = document.querySelector(':root')
let body = document.body
let new_el = document.createElement('h3')


// console.log(turn)
// console.log(r)

const O_TEXT = 'O'
const X_TEXT = 'X'
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
// console.log(spaces)

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function playerHasWon(){
    for (const condition of winningCombos){
        let [a, b, c] = condition
        if (spaces[a] && spaces[a]==spaces[b] && spaces[a]==spaces[c]){
            return [a,b,c]
        }
    }
    return false
}

const startGame = () =>{
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
function boxClicked(e){
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.style.color = currentPlayer==X_TEXT? 'red' : 'blue'
        e.target.innerText = currentPlayer
        currentPlayer = currentPlayer==X_TEXT? O_TEXT : X_TEXT
        turn.innerText = currentPlayer
        currentPlayer==O_TEXT?r.style.setProperty('--black', 'blue'):r.style.setProperty('--black', 'red')
        
    }
    if(playerHasWon()){
        boxes.forEach(box => box.removeEventListener('click', boxClicked));
        for (const win of playerHasWon()){
            boxes[win].style.backgroundColor = 'rgba(0,255,0,0.2)'
            
        }
        body.append(new_el)
        currentPlayer = currentPlayer==X_TEXT? O_TEXT : X_TEXT
        new_el.innerText = `Player ${currentPlayer} has won!!`
        new_el.style.color = currentPlayer==X_TEXT? 'red' : 'blue'
        currentPlayer = currentPlayer==X_TEXT? O_TEXT : X_TEXT

    }
}

resetbtn.addEventListener('click', resetCLicked)
function resetCLicked(e){
    boxes.forEach(box => box.innerText = '')
    spaces.fill(null)
    currentPlayer = X_TEXT
    turn.innerText = currentPlayer
    currentPlayer==O_TEXT?r.style.setProperty('--black', 'blue'):r.style.setProperty('--black', 'red')
    boxes.forEach(box =>{
        box.addEventListener('click', boxClicked);
        box.style.backgroundColor = "";
        
    })
    new_el.remove()
}

startGame()

});