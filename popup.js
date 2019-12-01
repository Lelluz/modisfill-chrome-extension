document.addEventListener('DOMContentLoaded', () => {

    let fieldsColumns = null;
    let daysColumn = null;

    document.querySelector('.button[name=scan]').addEventListener('click', () => {
        chrome.tabs.query({ currentWindow: true, active: true },
            tabs => {
                chrome.tabs.sendMessage(tabs[0].id, 'scan button click', manageOverlays)
            })
    }, false)

    const manageOverlays = result => {

        if (result) {

            const mainWrapper = document.querySelector('#main')

            const welcomeOverlay = mainWrapper.querySelector('.welcomeOverlay')
            welcomeOverlay.parentElement.removeChild(welcomeOverlay)

            fieldsColumns = [
                {
                    keyValueName: 'modisfill_entry1_value',
                    keyEnabledName: 'modisfill_entry1_enabled',
                    value: '',
                    enabled: true,
                    selector: 'input[id$="_1"]:not([disabled])',
                    labelName: 'Entry 1'
                },
                {
                    keyValueName: 'modisfill_exit1_value',
                    keyEnabledName: 'modisfill_exit1_enabled',
                    value: '',
                    enabled: true,
                    selector: 'input[id$="_2"]:not([disabled])',
                    labelName: 'Exit 1'
                },
                {
                    keyValueName: 'modisfill_entry2_value',
                    keyEnabledName: 'modisfill_entry2_enabled',
                    value: '',
                    enabled: true,
                    selector: 'input[id$="_3"]:not([disabled])',
                    labelName: 'Entry 2'
                },
                {
                    keyValueName: 'modisfill_exit2_value',
                    keyEnabledName: 'modisfill_exit2_enabled',
                    value: '',
                    enabled: true,
                    selector: 'input[id$="_4"]:not([disabled])',
                    labelName: 'Exit 2'
                },
                {
                    keyValueName: 'modisfill_entry3_value',
                    keyEnabledName: 'modisfill_entry3_enabled',
                    value: '',
                    enabled: false,
                    selector: 'input[id$="_5"]:not([disabled])',
                    labelName: 'Entry 3'
                },
                {
                    keyValueName: 'modisfill_exit3_value',
                    keyEnabledName: 'modisfill_exit3_enabled',
                    value: '',
                    enabled: false,
                    selector: 'input[id$="_6"]:not([disabled])',
                    labelName: 'Exit 3'
                },
                {
                    keyValueName: 'modisfill_entry4_value',
                    keyEnabledName: 'modisfill_entry4_enabled',
                    value: '',
                    enabled: false,
                    selector: 'input[id$="_7"]:not([disabled])',
                    labelName: 'Entry 4'
                },
                {
                    keyValueName: 'modisfill_exit4_value',
                    keyEnabledName: 'modisfill_exit4_enabled',
                    value: '',
                    enabled: false,
                    selector: 'input[id$="_8"]:not([disabled])',
                    labelName: 'Exit 4'
                }
            ]

            daysColumn = [
                {
                    keyEnabledName: 'modisfill_monday',
                    enabled: true,
                    labelName: 'Monday'
                },
                {
                    keyEnabledName: 'modisfill_tuesday',
                    enabled: true,
                    labelName: 'Tuesday'
                },
                {
                    keyEnabledName: 'modisfill_wednesday',
                    enabled: true,
                    labelName: 'Wednesday'
                },
                {
                    keyEnabledName: 'modisfill_thursday',
                    enabled: true,
                    labelName: 'Thursday'
                },
                {
                    keyEnabledName: 'modisfill_friday',
                    enabled: true,
                    labelName: 'Friday'
                },
                {
                    keyEnabledName: 'modisfill_saturday',
                    enabled: false,
                    labelName: 'Saturday'
                },
                {
                    keyEnabledName: 'modisfill_sunday',
                    enabled: false,
                    labelName: 'Sunday'
                }
            ]

            fieldsColumns.forEach(field => {
            
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

            daysColumn.forEach(day => {

                chrome.storage.local.get([day.keyEnabledName], result => {

                    if (Object.getOwnPropertyNames(result).length !== 0) {
                        day.enabled = result[day.keyEnabledName]
                        document.querySelector('#' + day.keyEnabledName).checked = day.enabled
                    }
                })
            })

            const enabledToChecked = enabled => { if (enabled) { return 'checked' }}

            const wtcTemplate = `
            <div class="wtcOverlay">
                <p>Set your tipical working week and auto fill WTC table</p>
                <div class="hoursColumn">
                    <ul>
                    ${
                        fieldsColumns.map(field =>
                            `
                            <li>
                                <label for="${field.keyValueName}">${field.labelName}</label>
                                <input type="time" name="${field.keyValueName}" id="${field.keyValueName}" value="${field.value}">
                                <input type="checkbox" name="${field.keyEnabledName}" id="${field.keyEnabledName}" ${enabledToChecked(field.enabled)}>
                            </li>
                            `.trim()
                        ).join('')
                    }
                    </ul>
                </div>
                <div class="daysColumn">
                    <ul>
                    ${
                        daysColumn.map(day => 
                            `
                            <li>
                                <label for="${day.keyEnabledName}">${day.labelName}</label>
                                <input type="checkbox" name="${day.keyEnabledName}" id="${day.keyEnabledName}" ${enabledToChecked(day.enabled)}>
                            </li>
                            `.trim()
                        ).join('')
                    }
                    </ul>
                </div>
                <div class="buttonsRow">
                    <a class="button" name="fillAll">Fill all</a>
                    <a class="button" name="fillCurday">Fill current day</a>
                    <a class="button" name="clean">Clean</a>
                </div>
            </div>
            `
            mainWrapper.insertAdjacentHTML('beforeend', wtcTemplate)

            document.querySelector('.button[name=fillAll]').addEventListener('click', () => {

                let newFieldsColumns = fieldsColumns
                let newDaysColumn = daysColumn

                newFieldsColumns.forEach(field => {

                    field.enabled = document.querySelector('#' + field.keyEnabledName).checked
                    chrome.storage.local.set({[field.keyEnabledName]: field.enabled})
                    
                    if (field.enabled) {
                        field.value = document.querySelector('#' + field.keyValueName).value
                        chrome.storage.local.set({[field.keyValueName]: field.value})
                    }
                })
                
                newDaysColumn.forEach(day => {
                    day.enabled = document.querySelector('#' + day.keyEnabledName).checked
                    chrome.storage.local.set({[day.keyEnabledName]: day.enabled})
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
                })
            }, false)

            document.querySelector('.button[name=clean]').addEventListener('click', () => {

                chrome.tabs.query({ currentWindow: true, active: true },
                tabs => {

                    const jsonTemplate = JSON.stringify(fieldsColumns)

                    chrome.tabs.sendMessage(tabs[0].id, {
                        message: 'clean button click',
                        data: jsonTemplate
                    })
                })
            }, false)

        }
    }

}, false)