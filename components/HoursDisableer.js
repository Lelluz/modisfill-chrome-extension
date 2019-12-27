class HoursDisableer {

  constructor() {
    this.hours = []
  }

  scanHours() {

    const hours = document.querySelectorAll('.hoursColumn ul li'),
      newHours = [...this.hours]

    hours.forEach(hour => {

      const checkbox = hour.querySelector('input[type="checkbox"]'),
        field = hour.querySelector('input[type="time"]')

      newHours.push({
        'field': field,
        'checkbox': checkbox
      })

      field.disabled = !checkbox.checked
      if (field.disabled) field.value = ''

    })

    this.hours = newHours
  }

  changeInputStatus(target) {

    const currentCheckboxState = target.checked

    this.hours.forEach(hour => {

      if (hour.checkbox === target) {
        hour.field.disabled = currentCheckboxState ? false : true
        if (hour.field.disabled) hour.field.value = ''
      }
    })
  }

  setEvents() {
    this.hours.forEach(hour => {
      hour.checkbox.addEventListener('click', event => {
        this.changeInputStatus(event.target)
      }, false)
    })
  }

  init() {
    this.scanHours()
    this.setEvents()
  }

}

export default new HoursDisableer()