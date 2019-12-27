function dayToIndex(day) {

    const dayStep = 7

    if (day <= dayStep) return day - 1
    if (day % dayStep === 0) return day - (dayStep * (parseInt(day / dayStep) - 1) + 1)

    return day - (dayStep * parseInt(day / dayStep) + 1)
}


function autoFill(fieldsColumns, daysColumn) {

    fieldsColumns.forEach(fldCol => {

        if (fldCol.enabled) {
            const fields = document.querySelectorAll(fldCol.selector)

            fields.forEach(field => {

                const rawDay = field.id.replace('text_', ''),
                    day = isNaN(parseInt(rawDay[1])) ? rawDay[0] : `${rawDay[0]}${rawDay[1]}`,
                    dayIdx = dayToIndex(day)

                field.blur()
                field.focus()

                if (daysColumn[dayIdx].enabled) {
                    field.value = fldCol.value.replace(/:/, '.')
                }

            })
        }
    })
}


function manualFill(fieldsColumns) {

    const inputRows = document.querySelectorAll('#spanTimeTable > table > tbody > tr:not([style="display:none"]) input')

    inputRows.forEach(row => {

        row.addEventListener("mouseover", event => event.target.style.background = "#FFB81C", false)
        row.addEventListener("mouseout", event => event.target.style.background = "", false)

        row.addEventListener("click", event => {

            event.target.style.background = ""
            event.target.style.border = ""

            fieldsColumns.forEach(fldCol => {

                const fields = document.querySelectorAll(fldCol.selector)

                fields.forEach(field => {

                    if (field === event.target) {
                        field.value = fldCol.value.replace(/:/, '.')
                    }
                })
            })

        }, false)
    })
}


function clean(fldCols) {

    fldCols.forEach(fldCol => {
        document.querySelectorAll(fldCol.selector).forEach(field => field.value = '')
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
            daysColumn = wrappedTemplate[1]

        autoFill(fieldsColumns, daysColumn)

    }
    if (request.message === 'manualFill button click' && request.data !== undefined) {

        const fieldsColumns = JSON.parse(request.data)

        manualFill(fieldsColumns)

    }
    if (request.message === 'clean button click' && request.data !== undefined) {

        const fieldsColumns = JSON.parse(request.data)

        clean(fieldsColumns)

    }

})