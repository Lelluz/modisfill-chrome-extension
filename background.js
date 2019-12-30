function isLastMonthDay(date) {
  return new Date(date.getTime() + 86400000).getDate() === 1
}

function show() {
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

const today = new Date();

if (window.Notification && isLastMonthDay(today)) {

  if (JSON.parse(localStorage.isActivated)) show()

  let interval = 0

  setInterval(() => {

    interval++

    if (
      JSON.parse(localStorage.isActivated) &&
      localStorage.frequency <= interval
    ) {
      show()
      interval = 0
    }

  }, 10000000)
}