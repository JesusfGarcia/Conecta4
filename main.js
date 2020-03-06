let column1 = [0, 0, 0, 0, 0, 0]
let column2 = [0, 0, 0, 0, 0, 0]
let column3 = [0, 0, 0, 0, 0, 0]
let column4 = [0, 0, 0, 0, 0, 0]
let column5 = [0, 0, 0, 0, 0, 0]
let column6 = [0, 0, 0, 0, 0, 0]
let column7 = [0, 0, 0, 0, 0, 0]

let turn = true
let isAnimating = false

dropCoin = (ranura) => {
	if (!isAnimating) {
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
			checkWinner(space, column)
			changeTurn()
			isAnimating = false
		}, time)
	}
}

checkWinner = (id, column) => {
	let array = [column1, column2, column3, column4, column5, column6, column7]
	checkWinnerVertical(array, column - 1)
	checkWinnerHorizontal(array, id)
	checkDiagonals(array, id, column - 1)
}

checkDiagonals = (array, height, column) => {
	let lD = height - column
	switch (lD) {
		case 2:
			if (
				array[0][2] === turn &&
				array[1][3] === turn &&
				array[2][4] === turn &&
				array[3][5] === turn
			) {
				alert('gano Diagonalmente Xd')
			}
			break
		case 1:
			for (let i = 0; i < 2; i++) {
				if (
					array[i][i + 1] === turn &&
					array[i + 1][i + 2] === turn &&
					array[i + 2][i + 3] === turn &&
					array[i + 3][i + 4] === turn
				) {
					alert('gano Diagonalmente Xd')
				}
			}
			break
		case 0:
			for (let i = 0; i < 3; i++) {
				if (
					array[i][i] === turn &&
					array[i + 1][i + 1] === turn &&
					array[i + 2][i + 2] === turn &&
					array[i + 3][i + 3] === turn
				) {
					alert('gano Diagonalmente Xd')
				}
			}
			break
		case -1:
			for (let i = 0; i < 3; i++) {
				if (
					array[i + 1][i] === turn &&
					array[i + 2][i + 1] === turn &&
					array[i + 3][i + 2] === turn &&
					array[i + 4][i + 3] === turn
				) {
					alert('gano Diagonalmente Xd')
				}
			}
			break
		case -2:
			break
		case -3:
			break
		default:
			break
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
			alert('gano horizontalmente')
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
			alert('Gano Verticalmente')
		}
	}
}

changeTurn = () => {
	turn = !turn
}
