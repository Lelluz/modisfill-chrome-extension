class fieldsColumns {

  constructor() {
    this.fieldsColumns = []
  }

  createColumnField(entries) {

    let fieldsColumns = [...this.fieldsColumn]

    fieldsColumns = fieldsColumns.push(
      {
        keyValueName: entries.keyValueName,
        keyEnabledName: entries.keyEnabledName,
        value: entries.value,
        enabled: entries.enabled,
        selector: entries.selector,
        labelName: entries.labelName
      }
    )
    this.fieldsColumns = fieldsColumns
  }

  loadUserData() {

    this.fieldsColumns.forEach(field => {

      chrome.storage.local.get([field.keyValueName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          field.value = result[field.keyValueName]
          document.querySelector('#' + field.keyValueName).value = field.value
        }
      })

      chrome.storage.local.get([field.keyEnabledName], result => {

        if (Object.getOwnPropertyNames(result).length !== 0) {
          field.enabled = result[field.keyEnabledName]
          document.querySelector('#' + field.keyEnabledName).checked = field.enabled
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

export default fieldsColumns