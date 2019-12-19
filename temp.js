function getFirstMonthDay() {

  const startDaySelector = document.querySelector('#day_1_7'),
    startDay = startDaySelector.innerText.substr(startDaySelector.length - 3)

  let startDayIndex = null

  switch (startDay) {

    case 'LUN': startDayIndex = 0; break
    case 'MAR': startDayIndex = 1; break
    case 'MER': startDayIndex = 2; break
    case 'GIO': startDayIndex = 3; break
    case 'VEN': startDayIndex = 4; break
    case 'SAB': startDayIndex = 5; break
    case 'DOM': startDayIndex = 6; break

    default: startDayIndex = null; break
  }

  return startDayIndex
}

function getSortedDays(daysColumn, startDayIdx) {

  let sortedDays = []

  daysColumn.forEach(day => {
    if (day.id >= startDayIdx) {
      sortedDays.push(day)
    }
  })

  daysColumn.forEach(day => {
    if (day.id < startDayIdx) {
      sortedDays.push(day)
    }
  })

  return sortedDays
}

function reducedDay(day) {

  let reducedDay = null

  if (day < 8) {
    reducedDay = day
  } else if (day > 7 && day < 15) {
    reducedDay = day - 7
  } else if (day > 14 && day < 22) {
    reducedDay = day - 14
  } else if (day > 21 && day < 27) {
    reducedDay = day - 21
  } else if (day > 26 && day < 34) {
    reducedDay = day - 28
  } else if (day > 33 && day < 41) {
    reducedDay = day - 35
  }

  return reducedDay
}