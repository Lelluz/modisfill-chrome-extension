wtcTemplate = null

function getFirstMonthDay() {

    const startDaySelector = document.querySelectorAll('#spanTimeTable > table > tbody > tr:not([style="display:none"])')[1],
        startDay = startDaySelector.innerText.substr(startDaySelector.length - 3)

    let startDayIndex = null

    if (startDay.indexOf('LUN') >= 0) startDayIndex = 0
    if (startDay.indexOf('MAR') >= 0) startDayIndex = 1
    if (startDay.indexOf('MER') >= 0) startDayIndex = 2
    if (startDay.indexOf('GIO') >= 0) startDayIndex = 3
    if (startDay.indexOf('VEN') >= 0) startDayIndex = 4
    if (startDay.indexOf('SAB') >= 0) startDayIndex = 5
    if (startDay.indexOf('DOM') >= 0) startDayIndex = 6
    
    return startDayIndex
}

function sortDays(daysColumn, startDayIdx) {

    let sortedDays = [...daysColumn]

    daysColumn.forEach(day => {
      if (day.id >= startDayIdx) {
        sortedDays.push(day)
      }
    })

    daysColumn.forEach(day => {
      if (day.id < startDayIdx) {
        sortedDays.push(day)
      }
    })

    return sortedDays
}

function reduceDay(day) {

    let reducedDay = null

    if (day < 8) {
        reducedDay = day - 1
    } else if (day > 7 && day < 15) {
        reducedDay = day - 8
    } else if (day > 14 && day < 22) {
        reducedDay = day - 15
    } else if (day > 21 && day < 29) {
        reducedDay = day - 22
    } else if (day > 28 && day < 36) {
        reducedDay = day - 29
    } else if (day > 35 && day < 43) {
        reducedDay = day - 36
    }

    return reducedDay
}

function clean(fldCol) {
    const fields = document.querySelectorAll(fldCol.selector)

    fields.forEach(field => {
        field.value = ''
    })
}

function fillAll(fieldsColumns, daysColumn) {
    fieldsColumns.forEach(fldCol => {
        
        if (fldCol.enabled) {
            const fields = document.querySelectorAll(fldCol.selector)

            fields.forEach(field => {

                const rawDay = field.id.replace('text_', ''),
                    day = isNaN(parseInt(rawDay[1])) ? rawDay[0] : `${rawDay[0]}${rawDay[1]}`,
                    reducedDay = reduceDay(day)

                //works only for last filled tr when take a click
                field.blur()
                field.focus()

                if (daysColumn[reducedDay].enabled) {
                    field.value = fldCol.value.replace(/:/, '.')
                }
                
            })
        }
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let response = false

    if (request === 'scan button click') {

        const wtc = document.querySelector('[name="formManageTimeCard"]')
        if (wtc !== null) {

            wtcTemplate = getFirstMonthDay() === 0 ? 'week' : 'month'

            response = true
        }
        
        sendResponse(response)

    } else if (request.message === 'fillAll button click' && request.data !== undefined) {

        const wrappedTemplate = JSON.parse(request.data),
            fieldsColumns = wrappedTemplate[0],
            daysColumn = wrappedTemplate[1]

        if (wtcTemplate === 'week') {
            fillAll(fieldsColumns, daysColumn)
            
        }else if (wtcTemplate === 'month') {
            const sortedDaysColumn = sortDays(daysColumn, getFirstMonthDay())
            fillAll(fieldsColumns, sortedDaysColumn)
        }

    } else if (request.message === 'clean button click' && request.data !== undefined) {

        const fieldsColumns = JSON.parse(request.data)

        fieldsColumns.forEach(cols => {
            clean(cols)
        })
    }

})