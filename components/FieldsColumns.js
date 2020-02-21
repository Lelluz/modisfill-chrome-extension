class FieldsColumns {

  constructor() {
    this.fieldsColumns = []
  }

  createColumnsFields(fieldsColumns) {

    this.fieldsColumns = [...fieldsColumns]
    this._loadUserData()
  }

  _loadUserData() {

    let fieldsColumns = [...this.fieldsColumns]

    fieldsColumns.forEach(field => {

      chrome.storage.sync.get([field.keyValueName], result => {
        if (Object.getOwnPropertyNames(result).length !== 0) {
          field.value = result[field.keyValueName]
        } 
      })

      chrome.storage.sync.get([field.keyEnabledName], result => {
        if (Object.getOwnPropertyNames(result).length !== 0) {
          field.enabled = result[field.keyEnabledName]
        }
      })

    })

    this.fieldsColumns = fieldsColumns
  }

  saveUserData() {

    this.fieldsColumns.forEach(field => {

      field.enabled = document.querySelector('#' + field.keyEnabledName).checked
      chrome.storage.sync.set({ [field.keyEnabledName]: field.enabled })

      if (field.enabled) {
        field.value = document.querySelector('#' + field.keyValueName).value
        chrome.storage.sync.set({ [field.keyValueName]: field.value })
      }
    })

  }

}

export default new FieldsColumns()