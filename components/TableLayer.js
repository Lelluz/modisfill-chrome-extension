class TableLayer {

  constructor() {
    this.mainLayer = document.querySelector('#main')
    this.fieldsColumns = null
    this.daysColumn = null
  }

  _append(template) {
    this.mainLayer.insertAdjacentHTML('beforeend', template)
  }

  _generate() {

    this._append(`
    <div class="wtcOverlay">
      <p>Imposta la tua tipica settimana di lavoro</p>
      <div class="hoursColumn">
          <ul>
          ${this.fieldsColumns.fieldsColumns.map(field => `
          <li>
            <label class="material-checkbox">
              <input type="checkbox" name="${field.keyEnabledName}" id="${field.keyEnabledName}" ${field.enabled ? 'checked' : ''}>
              <span>${field.labelName}</span>
            </label>
            <input type="time" name="${field.keyValueName}" id="${field.keyValueName}" value="${field.value}">
          </li>
          `.trim()).join('')}
          </ul>
      </div>
      <div class="daysColumn">
          <ul>
          ${this.daysColumn.daysColumn.map(day => `
          <li>
            <label class="material-checkbox">
              <input type="checkbox" name="${day.keyEnabledName}" id="${day.keyEnabledName}" ${day.enabled ? 'checked' : ''}>
              <span>${day.labelName}</span>
            </label>
          </li>
          `.trim()).join('')}
          </ul>
      </div>
      <hr>
      <div class="buttonsRow">
          <a class="button" name="autoFill">Autofill</a>
          <a class="button" name="manualFill">Selettivo</a>
          <a class="button" name="clean">Pulisci WTC</a>
      </div>
    </div>
    `)

  }

  _setEvents() {

    document.querySelector('.button[name=autoFill]').addEventListener('click', () => {

      this.fieldsColumns.saveUserData()
      this.daysColumn.saveUserData()

      chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {

          const wrappedTemplate = [this.fieldsColumns.fieldsColumns, this.daysColumn.daysColumn]
          const jsonTemplate = JSON.stringify(wrappedTemplate)

          chrome.tabs.sendMessage(tabs[0].id, {
            message: 'autoFill button click',
            data: jsonTemplate
          })
        }
      )
    }, false)

    document.querySelector('.button[name=manualFill]').addEventListener('click', () => {

      this.fieldsColumns.saveUserData()
      this.daysColumn.saveUserData()

      chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {

          const jsonTemplate = JSON.stringify(this.fieldsColumns.fieldsColumns)

          chrome.tabs.sendMessage(tabs[0].id, {
            message: 'manualFill button click',
            data: jsonTemplate
          })
        }
      )
    }, false)

    document.querySelector('.button[name=clean]').addEventListener('click', () => {

      chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {

          const jsonTemplate = JSON.stringify(this.fieldsColumns.fieldsColumns)

          chrome.tabs.sendMessage(tabs[0].id, {
            message: 'clean button click',
            data: jsonTemplate
          })
        }
      )
    }, false)
  }

  init(FieldsColumns, DaysColumn) {

    this.fieldsColumns = FieldsColumns
    this.daysColumn = DaysColumn

    this._generate()
    this._setEvents()
  }

}

export default new TableLayer()