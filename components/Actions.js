class Actions {

  constructor() { }

  fillAllWeek(fieldsColumns, daysColumn) {

    document.querySelector('.button[name=fillAll]').addEventListener('click', () => {

      let newFieldsColumns = [...fieldsColumns]
      let newDaysColumn = [...daysColumn]

      newFieldsColumns.forEach(field => {

        field.enabled = document.querySelector('#' + field.keyEnabledName).checked
        chrome.storage.local.set({ [field.keyEnabledName]: field.enabled })

        if (field.enabled) {
          field.value = document.querySelector('#' + field.keyValueName).value
          chrome.storage.local.set({ [field.keyValueName]: field.value })
        }
      })

      newDaysColumn.forEach(day => {
        day.enabled = document.querySelector('#' + day.keyEnabledName).checked
        chrome.storage.local.set({ [day.keyEnabledName]: day.enabled })
      })

      fieldsColumns = newFieldsColumns
      daysColumn = newDaysColumn

      chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {

          const wrappedTemplate = [fieldsColumns, daysColumn]
          const jsonTemplate = JSON.stringify(wrappedTemplate)

          chrome.tabs.sendMessage(tabs[0].id, {
            message: 'fillAll button click',
            data: jsonTemplate
          })
        }
      )

    }, false)
  }

  fillAllMonth() { }

  fillCurrentDay() { }

  cleanAll(fieldsColumns) {

    document.querySelector('.button[name=clean]').addEventListener('click', () => {

      const newFieldsColumns = [...fieldsColumns]

      chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {

          const jsonTemplate = JSON.stringify(newFieldsColumns)

          chrome.tabs.sendMessage(tabs[0].id, {
            message: 'clean button click',
            data: jsonTemplate
          })
        })
    }, false)
    
  }

}

export default Actions;
