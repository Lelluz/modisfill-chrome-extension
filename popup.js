import FieldsColumns from './components/FieldsColumns.js'
import DaysColumn from './components/DaysColumn.js'
import WelcomeLayer from './components/WelcomeLayer.js'
import TableLayer from './components/TableLayer.js'
import HoursDisableer from './components/HoursDisableer.js'

WelcomeLayer.init()

let welcomeLayerInDom = document.body.contains(WelcomeLayer.welcomeLayer)

const welcomeLayerObserver = new MutationObserver(async mutations => {

    if (welcomeLayerInDom) {
        welcomeLayerInDom = false

        await FieldsColumns.createColumnsFields()
        await DaysColumn.createDays()

        TableLayer.init(FieldsColumns, DaysColumn)
        HoursDisableer.init()

    }
})
welcomeLayerObserver.observe(WelcomeLayer.mainLayer, { childList: true })
