class Manager {

  constructor() {

    this.mainWrapper = document.querySelector('#main')

    this.fieldsColumns = new fieldsColumns()
    this.daysColumn = new daysColumn()
  }

  initTableObjects() {

  }

  manageResult(result) {

    if (result) { }

  }

  enabledToChecked(enabled) {
    if (enabled) return 'checked'
  }

  generateWtcOverlay() {

    const wtcTemplate = `
    <div class="wtcOverlay">
        <p>Set your tipical working week and auto fill WTC table</p>
        <div class="hoursColumn">
            <ul>
            ${this.fieldsColumns.map(field => `
            <li>
                <label for="${field.keyValueName}">${field.labelName}</label>
                <input type="time" name="${field.keyValueName}" id="${field.keyValueName}" value="${field.value}">
                <input type="checkbox" name="${field.keyEnabledName}" id="${field.keyEnabledName}" ${this.enabledToChecked(field.enabled)}>
            </li>
            `.trim()).join('')}
            </ul>
        </div>
        <div class="daysColumn">
            <ul>
            ${this.daysColumn.map(day => `
            <li>
                <label for="${day.keyEnabledName}">${day.labelName}</label>
                <input type="checkbox" name="${day.keyEnabledName}" id="${day.keyEnabledName}" ${this.enabledToChecked(day.enabled)}>
            </li>
            `.trim()).join('')}
            </ul>
        </div>
        <div class="buttonsRow">
            <a class="button" name="fillAll">Fill all</a>
            <a class="button" name="fillCurday">Fill current day</a>
            <a class="button" name="clean">Clean</a>
        </div>
    </div>
    `
    this.mainWrapper.insertAdjacentHTML('beforeend', wtcTemplate)
  }

}

export default Manager