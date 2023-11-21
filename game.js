const field = document.querySelector('table')
const cells = document.querySelectorAll('#field td');

const commonBlock = document.querySelector('.common-block');
const buttonBot = document.getElementById('bot');
const buttonFriends = document.getElementById('friends');
const buttonAgain = document.getElementById('again');

const resultBlock = document.getElementById('result-info'); 
const resultTitle = document.getElementById('result-title');

let identifier = 0;
let temp = 0;


buttonBot.addEventListener('click', function() {
    field.classList.remove('none');
    commonBlock.classList.add('none');
    bot();
});

buttonFriends.addEventListener('click', function() {
    field.classList.remove('none');
    commonBlock.classList.add('none');
    friends()
})

function bot() {

start(cells);

function start(cells) {
    for (let cell of cells) {
        cell.addEventListener('click', function step() {
            if (identifier % 2 === 0) {
                this.textContent = 'X';
                this.removeEventListener('click', step);
                identifier++;
                temp++;
                if (victory(cells)) {
                    console.log('Победил ' + this.textContent);
                    resultTitle.textContent = 'Победил ' + this.textContent + '-player'
                } else if (identifier === 9) {
                    // console.log('Ничья')
                }
            }
            stepBot();
        })
    }
}


function stepBot() {
    if (identifier % 2 > 0) {
        let emptyCellIndices = [...cells].reduce((acc, cell, index) => {
            if (cell.textContent === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptyCellIndices.length === 0) {
            console.log('Ничья');
            return; // здесь прекращаем выполнение функции stepBot
        }

        let randomStep = emptyCellIndices[Math.floor(Math.random() * emptyCellIndices.length)];
        cells[randomStep].textContent = 'O';
        identifier++;
        if (victory(cells)) {
            console.log('Победил ' + cells[randomStep].textContent);
        } else if (identifier === 9) {
            console.log('Ничья');
        }
    }
}

}

function friends() { 
    start(cells)

    function start(cells) {
        for (let cell of cells) {
            cell.addEventListener('click', function step() {
                this.textContent = ['X', 'O'][identifier % 2];
                this.removeEventListener('click', step)
                identifier++
                if (victory(cells)) {
                    console.log('Победил ' + this.textContent);
                    resultTitle.textContent = 'Won ' + this.textContent
                    field.classList.add('none');
                    resultBlock.classList.remove('none');
                } else if (identifier === 9) {
                    console.log('Ничья');
                }
            })
        }
    }
}

function victory(cells) {
    const vinOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];

    for (let vinOption of vinOptions) {
        if (cells[vinOption[0]].textContent == cells[vinOption[1]].textContent && cells[vinOption[1]].textContent == cells[vinOption[2]].textContent && cells[vinOption[0]].textContent != '') return true;

    }
    return false;
}

buttonAgain.addEventListener('click', function() {
    resultBlock.classList.add('none');
    commonBlock.classList.remove('none');
    cells.forEach(cell => cell.textContent = '');
})