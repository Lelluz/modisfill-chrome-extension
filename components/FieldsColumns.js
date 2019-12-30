class FieldsColumns {

  constructor() {
    this.fieldsColumns = []
  }

  async createColumnsFields() {

    await fetch(chrome.extension.getURL('../data.json'))
      .then(response => response.json())
      .then(jsonData => {

        const fieldsColumns = JSON.parse(JSON.stringify(jsonData)).fieldsColumns
        this.fieldsColumns = [...fieldsColumns]

      })
      .then(() => this._loadUserData())

  }

  _loadUserData() {

    this.fieldsColumns.forEach(field => {

      chrome.storage.local.get([field.keyValueName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          field.value = result[field.keyValueName]
        }
      })

      chrome.storage.local.get([field.keyEnabledName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          field.enabled = result[field.keyEnabledName]
        }
      })

    })

  }

  saveUserData() {

    this.fieldsColumns.forEach(field => {

      field.enabled = document.querySelector('#' + field.keyEnabledName).checked
      chrome.storage.local.set({ [field.keyEnabledName]: field.enabled })

      if (field.enabled) {
        field.value = document.querySelector('#' + field.keyValueName).value
        chrome.storage.local.set({ [field.keyValueName]: field.value })
      }
    })

  }

}

export default new FieldsColumns()