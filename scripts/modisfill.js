//https://zainali.altervista.org/come-creare-estensione-per-google-chrome/
//https://candidate.it.modis.com/candidate.modis/css/ui.css

(function () {

  const entryOne = '09.00',
    entryTwo = '14.00',
    entryThree = '',
    entryFour = '',
    exitOne = '13.00',
    exitTwo = '18.00',
    exitThree = '',
    exitFour = '',
    /* enabledEntries = [true, true, false, false],
    enabledExit = [true, true, false, false], */
    enabledDays = [true, true, true, true, true, false, false]

  const fieldsColumns = [
    {
      enabled: true,
      selector: 'input[id$="_1"]:not([disabled])',
      value: entryOne
    },
    {
      enabled: true,
      selector: 'input[id$="_3"]:not([disabled])',
      value: entryTwo
    },
    {
      enabled: false,
      selector: 'input[id$="_5"]:not([disabled])',
      value: entryThree
    },
    {
      enabled: false,
      selector: 'input[id$="_7"]:not([disabled])',
      value: entryFour
    },
    {
      enabled: true,
      selector: 'input[id$="_2"]:not([disabled])',
      value: exitOne
    },
    {
      enabled: true,
      selector: 'input[id$="_4"]:not([disabled])',
      value: exitTwo
    },
    {
      enabled: false,
      selector: 'input[id$="_6"]:not([disabled])',
      value: exitThree
    },
    {
      enabled: false,
      selector: 'input[id$="_8"]:not([disabled])',
      value: exitFour
    },
  ]

  const filler = cols => {

    if (cols.enabled) {

      const fields = document.querySelectorAll(cols.selector)

      fields.forEach(field => {
        const day = field.id.replace('text_', '')[0];
        if (enabledDays[day - 1]) field.value = cols.value
      })
    }

  }

  const cleaner = cols => {

    const fields = document.querySelectorAll(cols.selector)

    fields.forEach(field => {
      field.value = ''
    })
  }


  //main
  fieldsColumns.forEach(cols => {
    filler(cols)
  })

  //cleaner funzionante
  //fieldsColumns.forEach(cols => { cleaner(cols) })

})();