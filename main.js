let column1 = [0, 0, 0, 0, 0, 0]
let column2 = [0, 0, 0, 0, 0, 0]
let column3 = [0, 0, 0, 0, 0, 0]
let column4 = [0, 0, 0, 0, 0, 0]
let column5 = [0, 0, 0, 0, 0, 0]
let column6 = [0, 0, 0, 0, 0, 0]
let column7 = [0, 0, 0, 0, 0, 0]

let turn = true
let isAnimating = false
let victory = false

dropCoin = (ranura) => {
	if (!isAnimating && !victory) {
		isAnimating = true
		switch (ranura) {
			case 'r1':
				calculateHeight(column1, 1)
				break
			case 'r2':
				calculateHeight(column2, 2)
				break
			case 'r3':
				calculateHeight(column3, 3)
				break
			case 'r4':
				calculateHeight(column4, 4)
				break
			case 'r5':
				calculateHeight(column5, 5)
				break
			case 'r6':
				calculateHeight(column6, 6)
				break
			case 'r7':
				calculateHeight(column7, 7)
				break
			default:
				break
		}
	}
}

calculateHeight = (column, value) => {
	let i = 0
	while (column[i] === 0) {
		if (column[i + 1] !== 0 || column[i + 1] === undefined) {
			column[i] = turn
			animationCoin(i, value)
		}
		i++
	}
	if (column[0] !== 0) {
		isAnimating = false
	}
}

animationCoin = (index, value) => {
	let time = 0
	let id = value
	for (let i = 0; i <= index; i++) {
		if (index !== i) {
			animationTimers(id, time, false, value, i)
			time += 100
			id += 7
		} else {
			animationTimers(id, time, true, value, i)
			time += 100
			id += 7
		}
	}
}

animationTimers = (id, time, last, column, space) => {
	let clase = turn ? 'redCoin' : 'yellowCoin'
	if (!last) {
		setTimeout(() => {
			document.getElementById(`${id}`).className = clase
		}, time)
		setTimeout(() => {
			document.getElementById(`${id}`).className = 'agujero'
		}, time + 50)
	} else {
		setTimeout(() => {
			document.getElementById(`${id}`).className = clase
			checkWinner(space, column, id)
			changeTurn()
			isAnimating = false
		}, time)
	}
}

checkWinner = (id, column, casilla) => {
	let array = [column1, column2, column3, column4, column5, column6, column7]
	checkWinnerVertical(array, column - 1)
	checkWinnerHorizontal(array, id)
	checkDiagonals(array, id, column - 1, casilla)
}

checkDiagonals = (array, height, column, casilla) => {
	let lD = height - column
	switch (lD) {
		case 2:
			checkWinnerDiagonal(1, 0, 2, array)
			break
		case 1:
			checkWinnerDiagonal(2, 0, 1, array)
			break
		case 0:
			checkWinnerDiagonal(3, 0, 0, array)
			break
		case -1:
			checkWinnerDiagonal(3, 1, 0, array)
			break
		case -2:
			checkWinnerDiagonal(2, 2, 0, array)
			break
		case -3:
			checkWinnerDiagonal(1, 3, 0, array)
			break
		default:
			break
	}
	checkCasilla(casilla, array)
}

checkCasilla = (casilla, array) => {
	if (casilla == 39 || casilla === 33 || casilla === 27 || casilla === 21) {
		return checkWinnerAnotherDiagonal(1, 3, 5, array)
	}
	if (
		casilla === 38 ||
		casilla === 32 ||
		casilla === 26 ||
		casilla === 20 ||
		casilla === 14
	) {
		return checkWinnerAnotherDiagonal(2, 2, 5, array)
	}
	if (
		casilla === 37 ||
		casilla === 31 ||
		casilla === 25 ||
		casilla === 19 ||
		casilla === 13 ||
		casilla === 7
	) {
		return checkWinnerAnotherDiagonal(3, 1, 5, array)
	}
	if (
		casilla === 36 ||
		casilla === 30 ||
		casilla === 24 ||
		casilla === 18 ||
		casilla === 12 ||
		casilla === 6
	) {
		return checkWinnerAnotherDiagonal(3, 0, 5, array)
	}
	if (
		casilla === 29 ||
		casilla === 23 ||
		casilla === 17 ||
		casilla === 11 ||
		casilla === 5
	) {
		return checkWinnerAnotherDiagonal(2, 0, 4, array)
	}
	if (casilla === 22 || casilla === 16 || casilla === 10 || casilla === 4) {
		return checkWinnerAnotherDiagonal(1, 0, 3, array)
	}
}

checkWinnerAnotherDiagonal = (repeticiones, columna, renglon, array) => {
	for (let i = 0; i < repeticiones; i++) {
		if (
			array[i + columna][i + renglon] === turn &&
			array[i + columna + 1][i + renglon - 1] === turn &&
			array[i + columna + 2][i + renglon - 2] === turn &&
			array[i + columna + 3][i + renglon - 3] === turn
		) {
			showWinner()
		}
	}
}

checkWinnerDiagonal = (repeticiones, columna, renglon, array) => {
	for (let i = 0; i < repeticiones; i++) {
		if (
			array[i + columna][i + renglon] === turn &&
			array[i + columna + 1][i + renglon + 1] === turn &&
			array[i + columna + 2][i + renglon + 2] === turn &&
			array[i + columna + 3][i + renglon + 3] === turn
		) {
			showWinner()
		}
	}
}

checkWinnerVertical = (array, column) => {
	for (let i = 0; i <= array[column].length - 4; i++) {
		if (
			array[column][i] === turn &&
			array[column][i + 1] === turn &&
			array[column][i + 2] === turn &&
			array[column][i + 3] === turn
		) {
			showWinner()
		}
	}
}

checkWinnerHorizontal = (array, id) => {
	for (i = 0; i < array.length - 3; i++) {
		if (
			array[i][id] === turn &&
			array[i + 1][id] === turn &&
			array[i + 2][id] === turn &&
			array[i + 3][id] === turn
		) {
			showWinner()
		}
	}
}

changeTurn = () => {
	if (turn === true) {
		document.getElementById('r1').className = 'ranuraYellow'
		document.getElementById('r2').className = 'ranuraYellow'
		document.getElementById('r3').className = 'ranuraYellow'
		document.getElementById('r4').className = 'ranuraYellow'
		document.getElementById('r5').className = 'ranuraYellow'
		document.getElementById('r6').className = 'ranuraYellow'
		document.getElementById('r7').className = 'ranuraYellow'
	} else {
		document.getElementById('r1').className = 'ranuraRed'
		document.getElementById('r2').className = 'ranuraRed'
		document.getElementById('r3').className = 'ranuraRed'
		document.getElementById('r4').className = 'ranuraRed'
		document.getElementById('r5').className = 'ranuraRed'
		document.getElementById('r6').className = 'ranuraRed'
		document.getElementById('r7').className = 'ranuraRed'
	}

	turn = !turn
}

showWinner = () => {
	label = document.getElementById('spanWinner')
	turn === true
		? ((label.innerText = 'Red Wins'), (label.style.color = 'red'))
		: ((label.innerText = 'Yellow Wins'), (label.style.color = 'yellow'))
	victory = true
}

reload = () => {
	history.go('/')
}
