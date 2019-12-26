import FieldsColumns from './components/FieldsColumns.js'
import DaysColumn from './components/DaysColumn.js'
import WelcomeLayer from './components/WelcomeLayer.js'
import TableLayer from './components/TableLayer.js'

WelcomeLayer.init()

let welcomeLayerInDom = document.body.contains(WelcomeLayer.welcomeLayer)

const welcomeLayerObserver = new MutationObserver(mutations => {

    if (welcomeLayerInDom) {

        welcomeLayerInDom = false

        FieldsColumns.createColumnsFields()
        DaysColumn.createDays()

        setTimeout(() => TableLayer.init(FieldsColumns, DaysColumn), 100)

    }
})
welcomeLayerObserver.observe(WelcomeLayer.mainLayer, { childList: true })

