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

let movingObj = null

daysColumn.forEach((dayObj, idx) => {
  if (idx === startDayIndex) {
    movingObj = daysColumn[0]
    daysColumn[0] = dayObj
    return
  }
})

if (movingObj !== null) {
  
  daysColumn.forEach((dayObj, idx) => {
    if (day) {
      
    }
  })

}