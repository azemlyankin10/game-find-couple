(() => {
    const container = document.querySelector('.my-game')
    const iconArray = [
        './img/bike.png',
        './img/car.png',
        './img/city.png',
        './img/durian.png',
        './img/hookah.png',
        './img/money-bag.png',
        './img/pen.png',
        './img/quill.png',
        './img/setting.png',
        './img/smartphone.png',
        './img/right-arrow.png',
        './img/001-telephone.png',
        './img/002-smartphone.png',
        './img/003-arrow-right.png',
        './img/004-vehicle.png',
        './img/005-sport-car.png',
        './img/006-car.png',
        './img/007-car-1.png',
        './img/008-piston.png',
        './img/009-sport-car-1.png',
        './img/010-dog.png',
        './img/001-black-cat.png',
        './img/002-cool.png',
        './img/003-paw.png',
        './img/004-happy.png',
        './img/005-cat.png',
        './img/006-cat-1.png',
        './img/007-cat-2.png',
        './img/008-cat-3.png',
        './img/009-cat-4.png',
        './img/010-happy-1.png',
        './img/001-spaceship.png',
        './img/002-launch.png',
        './img/003-solar-system.png',
        './img/004-spaceship-1.png',
        './img/005-planet.png',
        './img/006-space-invaders.png',
        './img/007-universe.png',
        './img/008-astronaut.png',
        './img/009-uranus.png',
        './img/010-space.png',
        './img/001-programing.png',
        './img/002-coding.png',
        './img/003-coding-language.png',
        './img/004-programing-1.png',
        './img/005-programmer.png',
        './img/006-hacker.png',
        './img/007-book.png',
        './img/008-read.png',
        './img/009-reading.png',
    ]

    //скрипт перемешивания массива
    const shuffle = ([...arr]) => {
        let m = arr.length;
        while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr  
    }    
    ///

    function createMainPage(title) {
        const firstScreen = document.createElement('div')
        firstScreen.classList.add('firstScreen')

        const firstScreenContainer = document.createElement('div')
        firstScreenContainer.classList.add('firstScreenContainer')

        const startGameTitle = document.createElement('h2')
        startGameTitle.classList.add('startGameTitle')
        startGameTitle.textContent = title

        const startBtn = document.createElement('button')
        startBtn.classList.add('startBtn')
        startBtn.textContent = 'Начать игру'

        const inputsWrapp = document.createElement('div')
        inputsWrapp.classList.add('inputsWrapp')
        function validation() {
            let value = +this.value
            console.log(value);
            if(value < 2 || value > 10 || value % 2 === 1) {
                this.style.backgroundColor = '#ff00007a'
                startBtn.classList.add('disableBtn')
            } else {
                this.style.backgroundColor = 'rgba(255, 255, 255, .5)'
                startBtn.classList.remove('disableBtn')
            }
        }
        const input1 = document.createElement('input')
        input1.setAttribute('type', 'number')
        input1.setAttribute('value', '4')
        input1.classList.add('input')
        input1.placeholder = 'По горизонтали'
        input1.addEventListener('input', validation)
        const input2 = document.createElement('input')
        input2.setAttribute('type', 'number')
        input2.setAttribute('value', '4')
        input2.classList.add('input')
        input2.placeholder = 'По вертикали'
        input2.addEventListener('input', validation)
        inputsWrapp.append(input1)
        inputsWrapp.append(input2)

        container.append(firstScreen)
        firstScreen.append(firstScreenContainer)
        firstScreenContainer.append(startGameTitle)
        firstScreenContainer.append(startBtn)
        firstScreenContainer.append(inputsWrapp)
        return {
            firstScreen,
            startGameTitle,
            startBtn,
            input1,
            input2
        }
    }

    function createGamePage(countCards, ArrayIcons, timeMinut) {
        const iconArr = ArrayIcons.splice(1, countCards / 2)
        
        const newArr = shuffle([...iconArr, ...iconArr]) 

        const gameContainer = document.createElement('div')
        gameContainer.classList.add('game-container')
        setTimeout(() => {
            gameContainer.style.transform = 'translateY(-100%)' //delete
        }, 0)
        const table = document.createElement('div')
        table.classList.add('table')
        const score = document.createElement('p')
        score.classList.add('score')
        score.textContent = 'Собрано пар:'
        const spanScore = document.createElement('span')
        spanScore.textContent = '0'
        const timer = document.createElement('span')
        timer.classList.add('timer')

        let seconds = 60
        let minutes = (timeMinut * 60) / 60 % 60
        let strTimer
        let timerIcr = setInterval(function () {
            if(seconds === 0) {
                seconds = 60
            }

            if(seconds === 60) {
                --minutes
            }  
            seconds--
            strTimer = `${Math.trunc(minutes)}:${seconds < 10 ? `0${seconds}` : seconds}`
            timer.innerHTML = strTimer
            if (minutes < 0) {
                gameArea.style.display = 'none'
                strTimer = '0:00'
                timer.innerHTML = strTimer
                clearInterval(timerIcr)
                let timeOver =  gameOver(undefined, true)
                timeOver.btn.addEventListener('click', () => {
                    gameContainer.remove()
                    startGame(countCards)
                })
            } 
        }, 1000)

        score.append(spanScore)

        const gameArea = document.createElement('div')
        gameArea.classList.add('game-area')
        const gorisontal = document.querySelector('input').value
        gameArea.style.gridTemplateColumns = `repeat(${gorisontal}, 1fr)`

        const cards = []
        for(let i = 0; i < countCards; i++) {
            const gameCard = document.createElement('div')
            gameCard.classList.add('game-card')
            gameCard.setAttribute('data-number', `${i}`)
            gameCard.innerHTML = `<img src=${newArr[i]} class="icon-card">`
            gameArea.append(gameCard)
            cards.push(gameCard)
        }

        const gameOver = (score, timeOver) => {
            const gameOverWindow = document.createElement('div')
            gameOverWindow.classList.add('gameOverWindow')

            const gameOverText = document.createElement('p')
            gameOverText.classList.add('gameOverText')
            gameOverText.textContent = !timeOver ? `Урра! Вы собрали все ${score} пары` : 'Время вышло'

            const btn = document.createElement('button')
            btn.classList.add('startBtn')
            btn.textContent = 'Сыграть еще раз'

            const btnToMainPage = document.createElement('btn')
            btnToMainPage.classList.add('startBtn', 'btnToMainPage')
            btnToMainPage.textContent = 'Перейти на стартовую страницу'
            btnToMainPage.addEventListener('click', () => {
                gameContainer.style.transform = 'translateY(0)'
                document.querySelector('.firstScreen').style.transform = 'translateY(0)'
                gameContainer.remove()
            })

            gameOverWindow.append(gameOverText)
            gameOverWindow.append(btnToMainPage)
            gameOverWindow.append(btn)
            gameContainer.append(gameOverWindow)

            clearInterval(timerIcr)
            return {
                gameOverWindow,
                btn
            }
        }

        table.append(score)
        table.append(timer)
        gameContainer.append(table)
        gameContainer.append(gameArea)
        container.append(gameContainer)

        return {
            gameContainer,
            gameArea,
            cards,
            spanScore,
            gameOver
        }
    }

    function startGame(countCardOnArea) {
        let gamePage = createGamePage(countCardOnArea, iconArray, 1)
        let count = 0
        let activeCard
        let cardNumber
        let score = 0
        let prevCard 
        gamePage.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                let imgLink = e.target.firstChild.attributes[0].textContent
                let numberCardLink = e.target.dataset.number
                if(e.target === prevCard || e.target.classList.contains('open')) {
                    return
                }
                if(count === 0) {
                    prevCard = e.target
                    e.target.classList.add('open')
                    count++
                    activeCard = imgLink
                    cardNumber = numberCardLink
                } else if(count === 1 && activeCard === imgLink && cardNumber !== numberCardLink) {
                    e.target.classList.add('open')
                    count = 0
                    score++
                    gamePage.spanScore.textContent = `${score}`
                    activeCard = null
                    cardNumber = null
                } else {
                    e.target.classList.add('miss')
                    prevCard.classList.remove('open')
                    prevCard = null
                    count = 0
                    activeCard = null
                    cardNumber = null
                    setTimeout(() => {
                        e.target.classList.remove('miss')
                    }, 1000)
                }

                if(score === countCardOnArea / 2) {
                    setTimeout(() => {
                        gamePage.gameArea.style.display = 'none'
                        let gameOver = gamePage.gameOver(score)
                        gameOver.btn.addEventListener('click', () => {
                            gamePage.gameContainer.remove()
                            startGame(countCardOnArea)
                        })
                    }, 1000)
                }
            })
        })
    }


    document.addEventListener('DOMContentLoaded', () => {
        function playGame() {
            const mainPage = createMainPage('Найди пару')

            mainPage.startBtn.addEventListener('click', () => {
            const countCard = mainPage.input1.value * mainPage.input2.value 
            mainPage.firstScreen.style.transform = 'translateY(-100vh)'
            startGame(countCard)
          })


        }

        playGame()
    })
})()