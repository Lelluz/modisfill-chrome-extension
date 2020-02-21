class DaysColumn {

  constructor() {
    this.daysColumn = []
  }

  createDays(daysColumn) {

    this.daysColumn = [...daysColumn]
    this._loadUserData()
  }

  _loadUserData() {

    let daysColumn = [...this.daysColumn]

    daysColumn.forEach(day => {

      chrome.storage.sync.get([day.keyEnabledName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          day.enabled = result[day.keyEnabledName]
        }
      })
    })
    
    this.daysColumn = daysColumn
  }

  saveUserData() {

    this.daysColumn.forEach(day => {
      day.enabled = document.querySelector('#' + day.keyEnabledName).checked
      chrome.storage.sync.set({ [day.keyEnabledName]: day.enabled })
    })

  }

}

export default new DaysColumn()