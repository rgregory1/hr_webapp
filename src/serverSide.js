function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Employees')

  let data = ws.getDataRange().getDisplayValues()

  let headers = data.shift()
  // console.log(data)
  return [headers, data]
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent()
}

function processForm(data) {

  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let dataSheet = ss.getSheetByName('Employees')

  // console.log(data)
  dataSheet.appendRow([
    getIdForNewEmployees(),
    '23-24',
    data.firstName,
    data.lastName,
    data.location,
    data.category,
    data.position,
    data.personalEmail,
    data.effectiveDate
  ])
}


function getIdForNewEmployees() {
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let employeeData = ss.getSheetByName('Employees').getDataRange().getValues()

  employeeData.shift()
  let employeeIds = employeeData.map(x => parseInt(x[0]))

  var largest = 0;

  for (i = 0; i < employeeIds.length; i++) {
    if (employeeIds[i] > largest) {
      largest = employeeIds[i];
    }
  }

  return ++largest
}


/**
 *  return objects from employee sheet
 *  if id is supplied, return single oject, otherwise return all in array
 */
function createEmployeeOjbects(id) {

  // console.log(id)
  let dataFromEmployeeSheet = getData()

  let headers = dataFromEmployeeSheet[0]
  let data = dataFromEmployeeSheet[1]

  let empolyeeArray = []

  data.forEach(employee => {

    let employeeObject = {}

    headers.forEach((header, index) => {
      employeeObject[header] = employee[index]
    })

    empolyeeArray.push(employeeObject)
  })

  if (!id) {

    // console.log('no id')
    return empolyeeArray

  } else {
    // console.log('id found')

    let individual = empolyeeArray.find(obj => {
      return obj.id == id
    })

    // console.log(individual)
    return individual
  }

}

function getListOfNewEmplyees() {

  let empolyeeArray = createEmployeeOjbects()

  let listOfNames = empolyeeArray.map(emp => [emp.id, emp.first, emp.last])

  // console.log(listOfNames)

  return listOfNames

}

function packageEmployeeData(id = 2) {

  const crossWalkPage = SpreadsheetApp.getActiveSpreadsheet()
  const crossWalkData = crossWalkPage.getSheetByName('crossWalk').getDataRange().getValues()

  console.log('crossWalkData')
  console.log(crossWalkData)

  let rawData = createEmployeeOjbects(id)

  let employeePackage = {
    id: rawData.id,
    year: rawData.year,
    first: rawData.first,
    last: rawData.last,
    location: rawData.location,
    category: rawData.category,
    position: rawData.position,
    personalEmail: rawData.personal_email,
    effectiveDate: rawData.effective_date,
    hrd_section: [],
    hra_section: [],
    bec_section: [],
    fis_section: [],
    tec_section: [],
  }

  let sections = ['hrd_', 'hra_', 'bec_', 'fis_', 'tec_']

  sections.forEach(header => {

    for (const [key, value] of Object.entries(rawData)) {
      console.log(`${key}: ${value}`)

      // let theKey = key.toString()
      // let theValue = value.toString()

      if (key.startsWith(header)) {
        console.log('starts with ' + header)

        let textPair = crossWalkData.find(x => x[0] == key)
        console.log(textPair)
        // employeePackage[header+'section'].push({[key]: value})
        employeePackage[header+'section'].push({header: key,status: value, text: textPair[1]})

      } else console.log('nope')
    }

  })

  // console.log('the end')
  return employeePackage
}

function updateNewEmployee(id=2,header='hrd_transcripts', value='D'){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('Employees')

  let data = ws.getDataRange().getDisplayValues()

  let headers = data[0]

  let xIndex = headers.indexOf(header)

  let idList = data.map(x => x[0].toString())

  let yIndex = idList.indexOf(id.toString())

  console.log(xIndex, yIndex)

  ws.getRange(yIndex+1,xIndex+1).setValue(value)
}




















