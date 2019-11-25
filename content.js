chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let response = false

    if(request === 'scan button click') {

        const wtc = document.querySelector('[name="formManageTimeCard"]')
        if(wtc !== null && window.m_sName !== null && window.m_sSurname !== null) {

            response = {
                valid: true,
                name: window.m_sName,
                surname: window.m_sSurname,
            }

        }
    }
    sendResponse(response)

})