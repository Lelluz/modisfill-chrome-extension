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


function dayToIndex(day) {

    const dayStep = 7

    if (day <= dayStep) {
        return day - 1
    }
    if (day % dayStep === 0) {
        return day - (dayStep * (parseInt(day / dayStep) - 1) + 1)
    }
    return day - (dayStep * parseInt(day / dayStep) + 1)
}


function clean(fldCols) {

    fldCols.forEach(fldCol => {
        document.querySelectorAll(fldCol.selector).forEach(field => field.value = '')
    })
}


function autoFill(fieldsColumns, daysColumn) {
    fieldsColumns.forEach(fldCol => {
        
        if (fldCol.enabled) {
            const fields = document.querySelectorAll(fldCol.selector)

            fields.forEach(field => {

                const rawDay = field.id.replace('text_', ''),
                    day = isNaN(parseInt(rawDay[1])) ? rawDay[0] : `${rawDay[0]}${rawDay[1]}`,
                    dayIdx = dayToIndex(day)

                //works only for last filled tr when take a click
                field.blur()
                field.focus()

                if (daysColumn[dayIdx].enabled) {
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
        if (wtc !== null) response = true
        
        sendResponse(response)

    }
    if (request.message === 'autoFill button click' && request.data !== undefined) {
        
        const wrappedTemplate = JSON.parse(request.data),
            fieldsColumns = wrappedTemplate[0],
            daysColumn = wrappedTemplate[1],
            firstMonthDay = getFirstMonthDay()
            wtcTemplateType = firstMonthDay === 0 ? 'week' : 'month'

        if (wtcTemplateType === 'week') autoFill(fieldsColumns, daysColumn)
        if (wtcTemplateType === 'month') autoFill(fieldsColumns, sortDays(daysColumn, firstMonthDay))

    }
    if (request.message === 'clean button click' && request.data !== undefined) {

        const fieldsColumns = JSON.parse(request.data)

        clean(fieldsColumns)
        
    }

})