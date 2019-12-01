document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.button.scan').addEventListener('click', () => {
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

            let fieldsColumns = [
                {
                    keyValueName: 'modisfill_entry1_value',
                    keyEnabledName: 'modisfill_entry1_enabled',
                    value: null,
                    enabled: true,
                    selector: 'input[id$="_1"]:not([disabled])',
                    labelName: 'Entry 1'
                },
                {
                    keyValueName: 'modisfill_entry2_value',
                    keyEnabledName: 'modisfill_entry2_enabled',
                    value: null,
                    enabled: true,
                    selector: 'input[id$="_3"]:not([disabled])',
                    labelName: 'Entry 2'
                },
                {
                    keyValueName: 'modisfill_entry3_value',
                    keyEnabledName: 'modisfill_entry3_enabled',
                    value: null,
                    enabled: false,
                    selector: 'input[id$="_5"]:not([disabled])',
                    labelName: 'Entry 3'
                },
                {
                    keyValueName: 'modisfill_entry4_value',
                    keyEnabledName: 'modisfill_entry4_enabled',
                    value: null,
                    enabled: false,
                    selector: 'input[id$="_7"]:not([disabled])',
                    labelName: 'Entry 4'
                },
                {
                    keyValueName: 'modisfill_exit1_value',
                    keyEnabledName: 'modisfill_exit1_enabled',
                    value: null,
                    enabled: true,
                    selector: 'input[id$="_2"]:not([disabled])',
                    labelName: 'Exit 1'
                },
                {
                    keyValueName: 'modisfill_exit2_value',
                    keyEnabledName: 'modisfill_exit2_enabled',
                    value: null,
                    enabled: true,
                    selector: 'input[id$="_4"]:not([disabled])',
                    labelName: 'Exit 2'
                },
                {
                    keyValueName: 'modisfill_exit3_value',
                    keyEnabledName: 'modisfill_exit3_enabled',
                    value: null,
                    enabled: false,
                    selector: 'input[id$="_6"]:not([disabled])',
                    labelName: 'Exit 3'
                },
                {
                    keyValueName: 'modisfill_exit4_value',
                    keyEnabledName: 'modisfill_exit4_enabled',
                    value: null,
                    enabled: false,
                    selector: 'input[id$="_8"]:not([disabled])',
                    labelName: 'Exit 4'
                }
            ]

            fieldsColumns.forEach(field => {
            
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

            const filler = cols => {
            
                if (cols.enabled) {
            
                    const fields = document.querySelectorAll(cols.selector)
                
                    fields.forEach(field => {
                        const day = field.id.replace('text_', '')[0];
                        if (enabledDays[day - 1]) field.value = cols.value
                    })
                }
            
            }
            
            const cleaner = cols => {
            
                const fields = document.querySelectorAll(cols.selector)
            
                fields.forEach(field => {
                    field.value = ''
                })
            }

            const enabledToChecked = enabled => { if (enabled) { return 'checked' }}

            const wtcTemplate = `
            <div class="wtcOverlay">
                <div class="hoursColumn">
                    <ul>
                    ${
                        fieldsColumns.map(field =>
                            `
                            <li>
                                <label for="">${field.labelName}</label>
                                <input type="time" name="${field.keyValueName}" id="${field.keyValueName}" value="${field.value}">
                                <input type="checkbox" name="" id="" ${enabledToChecked(field.enabled)}>
                            </li>
                            `.trim()
                        ).join('')
                    }
                    </ul>
                </div>
                <div class="daysColumn">
                    <ul>
                    <li>
                        <label for="">Monday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    <li>
                        <label for="">Tuesday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    <li>
                        <label for="">Wednesday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    <li>
                        <label for="">Thursday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    <li>
                        <label for="">Friday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    <li>
                        <label for="">Saturday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    <li>
                        <label for="">Sunday</label>
                        <input type="checkbox" name="" id="">
                    </li>
                    </ul>
                </div>
                <div class="buttonsRow">
                    <a class="button">Compile all</a>
                    <a class="button">Compile current day</a>
                </div>
            </div>
            `
            mainWrapper.insertAdjacentHTML('beforeend', wtcTemplate)

        }
    }

}, false)