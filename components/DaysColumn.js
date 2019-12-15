class DaysColumn {

  constructor() {
    this.daysColumn = []
  }

  createDay(entries) {

    let daysColumn = [...this.daysColumn]

    daysColumn.push(
      {
        keyEnabledName: entries.keyEnabledName,
        enabled: entries.enabled,
        labelName: entries.labelName
      }
    )

    this.daysColumn = daysColumn
  }

  loadUserData() {

    this.daysColumn.forEach(day => {

      chrome.storage.local.get([day.keyEnabledName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          day.enabled = result[day.keyEnabledName]
          document.querySelector('#' + day.keyEnabledName).checked = day.enabled
        }
      })
    })

  }

  saveUserData() {

    this.daysColumn.forEach(day => {
      day.enabled = document.querySelector('#' + day.keyEnabledName).checked
      chrome.storage.local.set({ [day.keyEnabledName]: day.enabled })
    })
    
  }

}

export default DaysColumn