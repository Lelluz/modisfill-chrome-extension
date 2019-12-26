class DaysColumn {

  constructor() {
    this.daysColumn = []
  }

  createDays() {

    fetch(chrome.extension.getURL('../data.json'))
    .then(response => response.json())
    .then(jsonData => {

      const daysColumn = JSON.parse(JSON.stringify(jsonData)).daysColumn
      this.daysColumn = [...daysColumn]
      
    })
    .then(() => this._loadUserData())
  }

  _loadUserData() {

    this.daysColumn.forEach(day => {

      chrome.storage.local.get([day.keyEnabledName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          day.enabled = result[day.keyEnabledName]
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

export default new DaysColumn()