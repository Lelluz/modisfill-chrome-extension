function isLastMonthDay(date) {
  return new Date(date.getTime() + 86400000).getDate() === 1
}

function getDaysInMonth(month, year) {
  let date = new Date(year, month, 1)
  const days = []

  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

function isValidDate(lastMonthDay, day) {
  return day.getDate() == lastMonthDay.getDate()
}

function isLastMonthDay(date) {
  return new Date(date.getTime() + 86400000).getDate() === 1
}

function isLastWorkingDay(monthDays, date) {
  const monthDay = date.getDate()
  let nextDayDate = new Date()

  nextDayDate.setDate(monthDay + 1)
  return (isValidDate(monthDays[monthDays.length - 1], nextDayDate))
}

function isLastWorkingDayOfWeek(day) {
  return day.getDay() === 5
}

function handleShowPopup() {
  if (JSON.parse(localStorage.isActivated)) showPopup()
  let interval = 0

  setInterval(() => {
    interval++
    if (
      JSON.parse(localStorage.isActivated)
      && localStorage.frequency <= interval
    ) {
      showPopup()
      interval = 0
    }
  }, 10000000)
}

function showPopup() {
  new Notification('Modisfill reminder', {
    icon: 'icon.png',
    body: 'Oggi è l\'ultimo giorno del mese, ricordati di compilare e validare il tuo WTC'
  });
}


if (!localStorage.isInitialized) {
  localStorage.isActivated = true
  localStorage.frequency = 1
  localStorage.isInitialized = true
}

if (window.Notification) {
  const today = new Date(),
    monthDays = getDaysInMonth(today.getMonth(), today.getFullYear())

  if (isLastMonthDay(today) && !isLastWorkingDay(monthDays, today)) {
    handleShowPopup()
  } else if (isLastWorkingDayOfWeek(monthDays[monthDays.length - 1]) || isLastWorkingDayOfWeek(monthDays[monthDays.length - 2])) {
    handleShowPopup()
  }
}