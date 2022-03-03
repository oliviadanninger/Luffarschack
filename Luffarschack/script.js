let divArr = document.getElementsByTagName('div');
let container = document.getElementById('container');
let circle = '<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2ZM10 15C12.76 15 15 12.76 15 10C15 7.24 12.76 5 10 5C7.24 5 5 7.24 5 10C5 12.76 7.24 15 10 15Z" fill="blue"/> </svg>';
let cross = '<svg width="50" height="50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.12 10L15.65 13.53L13.53 15.65L10 12.12L6.46003 15.66L4.34003 13.54L7.88003 10L4.34003 6.46003L6.46003 4.34003L10 7.88003L13.54 4.35003L15.66 6.47003L12.12 10Z" fill="red"></path></svg>';
let overlay = document.getElementById('overlay');
let modalStart = document.getElementById('modal-start');
let modalWin = document.getElementById('modal-win');
let symbolStart = document.getElementById('symbol-start');
let symbolWin = document.getElementById('symbol-win');
let clickCounter = 1;
let startPlayer = 1;
let pointsCross = 0;
let pointsCircle = 0;
let crossScore = document.getElementById('cross-score');
let circleScore = document.getElementById('circle-score');
let animation = document.getElementById('animation');


//Sakapar divar och individuellt id
function createBoard() {

    let rowCounter = 1;
    let divCounter = 0;

    for (i = 1; i <= 225; i++) {

        divCounter++

        let div = document.createElement('div');
        div.setAttribute('id', `div${i}`);
        div.setAttribute('class', `row${rowCounter}`);

        //Sätter kolumn-klasser
        div.classList.add(`column${divCounter}`);
        container.appendChild(div);

        //Sätter rad-klasser
        if (divCounter == 15) {
            divCounter = 0;
            rowCounter++
        }
    }

    //Sätter eventlistener på alla divar och skriver ut X/O varannan gång
    for (let i = 0; i <= divArr.length; i++) {

        if (divArr[i]) {
            let clicked = false;
            divArr[i].addEventListener('click', function () {

                if (clicked == false) {
                    clickCounter++;
                    let div = document.getElementById(`div${i+1}`);

                    if (clickCounter % 2 === 0) {
                        div.innerHTML = cross;

                    } else {
                        div.innerHTML = circle;
                    }

                    clicked = true;

                    rowStreak(i + 1, div);
                    columnStreak(i + 1, div);
                    diagonalLeftStreak(i + 1, div);
                    diagonalRightStreak(i + 1, div);
                }
            })
        }
    }
}

createBoard();
whoStarts();

//FUNKTIONER SOM KOLLAR EFTER 5 I RAD
//Kollar rader
function rowStreak(clickedNr, clickedDiv) {

    let divChecked = clickedNr;
    let streakLeft = true;
    let streakRight = true;
    streakCounter = 1;

    while (streakLeft) {
        let divLeft = document.getElementById(`div${divChecked-1}`);

        if (divLeft !== null) {
            if (divLeft.innerHTML == clickedDiv.innerHTML && clickedDiv.classList[0] == divLeft.classList[0]) { //Om symbolerna är av samma sort och på samma rad
                streakCounter++;
                divChecked--;
            } else {
                divChecked = clickedNr;
                streakLeft = false;
            }
        } else {
            divChecked = clickedNr;
            streakLeft = false;
        }
    }

    while (streakRight) {
        let divRight = document.getElementById(`div${divChecked+1}`);

        if (divRight !== null) {
            if (divRight.innerHTML == clickedDiv.innerHTML && clickedDiv.classList[0] == divRight.classList[0]) {
                streakCounter++;
                divChecked++;
            } else {
                streakRight = false;
            }
        } else {
            streakRight = false;
        }
    }
    checkWin(streakCounter, clickedDiv);
}

//Kollar kolumner
function columnStreak(clickedNr, clickedDiv) {

    let divChecked = clickedNr;
    streakCounter = 1;
    let streakUp = true;
    let streakDown = true;

    while (streakUp) {
        let divUp = document.getElementById(`div${divChecked-15}`);

        if (divUp !== null) {
            if (divUp.innerHTML == clickedDiv.innerHTML) {
                streakCounter++;
                divChecked = divChecked - 15;
            } else {
                divChecked = clickedNr;
                streakUp = false;
            }
        } else {
            divChecked = clickedNr;
            streakUp = false;
        }
    }

    while (streakDown) {
        let divDown = document.getElementById(`div${divChecked+15}`);

        if (divDown !== null) {
            if (divDown.innerHTML == clickedDiv.innerHTML) {
                streakCounter++;
                divChecked = divChecked + 15;
            } else {
                streakDown = false;
            }
        } else {
            streakDown = false;
        }
    }
    checkWin(streakCounter, clickedDiv);
}

//Kollar diagonalt
function diagonalRightStreak(clickedNr, clickedDiv) {

    let divChecked = clickedNr;
    streakCounter = 1;
    let streakUpRight = true;
    let streakDownLeft = true;

    while (streakUpRight) {
        let divUpRight = document.getElementById(`div${divChecked-14}`);
        if (divUpRight !== null) {
            if (divUpRight.classList[1] !== 'column1') {
                if (divUpRight.innerHTML == clickedDiv.innerHTML) {
                    streakCounter++;
                    divChecked = divChecked - 14;
                } else {
                    divChecked = clickedNr;
                    streakUpRight = false;
                }
            } else {
                divChecked = clickedNr;
                streakUpRight = false;
            }
        } else {
            divChecked = clickedNr;
            streakUpRight = false;
        }
    }

    while (streakDownLeft) {
        let divDownLeft = document.getElementById(`div${divChecked+14}`);
        if (divDownLeft !== null) {
            if (divDownLeft.classList[1] !== 'column15') {
                if (divDownLeft.innerHTML == clickedDiv.innerHTML) {
                    streakCounter++;
                    divChecked = divChecked + 14;
                } else {
                    streakDownLeft = false;
                }
            } else {
                streakDownLeft = false;
            }
        } else {
            streakDownLeft = false;
        }
    }
    checkWin(streakCounter, clickedDiv);
}

function diagonalLeftStreak(clickedNr, clickedDiv) {

    let divChecked = clickedNr;
    streakCounter = 1;
    let streakUpLeft = true;
    let streakDownRight = true;

    while (streakUpLeft) {
        let divUpLeft = document.getElementById(`div${divChecked-16}`);

        if (divUpLeft !== null) {
            if (divUpLeft.classList[1] !== 'column15'){
                if (divUpLeft.innerHTML == clickedDiv.innerHTML) {
                    streakCounter++;
                    divChecked = divChecked - 16;
                } else {
                    divChecked = clickedNr;
                    streakUpLeft = false;
                }
            } else {
                divChecked = clickedNr;
                streakUpLeft = false;
            }
        } else {
            divChecked = clickedNr;
            streakUpLeft = false;
        }
    }

    while (streakDownRight) {
        let divDownRight = document.getElementById(`div${divChecked+16}`);

        if (divDownRight !== null) {
            if (divDownRight.classList[1] !== 'column1') {
                if (divDownRight.innerHTML == clickedDiv.innerHTML) {
                    streakCounter++;
                    divChecked = divChecked + 16;
                } else {
                    divChecked = clickedNr;
                    streakDownRight = false;
                }
            } else {
                divChecked = clickedNr;
                streakDownRight = false;
            }
        } else {
            divChecked = clickedNr;
            streakDownRight = false;
        }
    }
    checkWin(streakCounter, clickedDiv);
}

//Kollar om man vunnit, displayar vinstmeddelande och räknar match-poäng
function checkWin(streakCounter, clickedDiv) {

    if (streakCounter == 5) {

        overlay.style.display = 'flex';
        animation.style.display = 'block';
        animation.style.animation = 'animation 4s linear';
        symbolWin.innerHTML = `${clickedDiv.innerHTML}`;

        if (symbolWin.innerHTML == cross) {
            pointsCross++;
            crossScore.innerHTML = `${pointsCross}`;
        } else {
            pointsCircle++;
            circleScore.innerHTML = `${pointsCircle}`;
        }
        //Gör så att man startar varannan gång
        startPlayer++;
        clickCounter = startPlayer;

        setTimeout(displayWinner, 5000);
    }
}

function displayWinner() {
    modalWin.style.display = 'flex';
}

//Startar om spelet
document.getElementById('play-again-btn').addEventListener('click', () => {
    container.innerHTML = '';
    overlay.style.display = 'none';
    modalWin.style.display = 'none';
    animation.style.display = 'none';
    createBoard();
    setTimeout(whoStarts, 500);
});

//Displayar vem som börjar
function whoStarts() {
    overlay.style.display = 'flex';
    modalStart.style.display = 'flex';

    if (clickCounter % 2 === 1) {
        symbolStart.innerHTML = `${cross}`;
    } else {
        symbolStart.innerHTML = `${circle}`;
    }
}

document.getElementById('start-btn').addEventListener('click', () => {
    overlay.style.display = 'none';
    modalStart.style.display = 'none';
})