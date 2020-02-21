class DataLoader {

  async loadData(json) {
    const response = await fetch(json)
    return JSON.parse(JSON.stringify(await response.json()))
  }
}

export default new DataLoader()