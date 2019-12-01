const filler = (fldCol, daysCol) => {

    if (fldCol.enabled) {
        const fields = document.querySelectorAll(fldCol.selector)

        fields.forEach(field => {
            const day = field.id.replace('text_', '')[0]
            if (daysCol[day - 1].enabled) field.value = fldCol.value
        })
    }
}

const cleaner = fldCol => {
    const fields = document.querySelectorAll(fldCol.selector)

    fields.forEach(field => {
        field.value = ''
    })
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let response = false

    if (request === 'scan button click') {

        const wtc = document.querySelector('[name="formManageTimeCard"]')
        if (wtc !== null) {
            response = true
        }
        sendResponse(response)

    }else if (request.message === 'fillAll button click' && request.data !== undefined) {
    
        const wrappedTemplate = JSON.parse(request.data)
        const fieldsColumns = wrappedTemplate[0]
        const daysColumn = wrappedTemplate[1]
    
        fieldsColumns.forEach(cols => {
            filler(cols, daysColumn)
        })

    }else if (request.message === 'clean button click' && request.data !== undefined) {

        const fieldsColumns = JSON.parse(request.data)
    
        fieldsColumns.forEach(cols => {
            cleaner(cols)
        })
    }

})