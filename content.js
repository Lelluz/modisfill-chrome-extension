chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let response = false

    if (request === 'scan button click') {

        const wtc = document.querySelector('[name="formManageTimeCard"]')
        if (wtc !== null) {
            response = true
        }
    }
    sendResponse(response)

})