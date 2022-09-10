// Your code here
// function createEmployeeRecord(str) {
//     const obj = {
//         firstName : str[0],
//     familyName: str[1],
//     title: str[2],
//     payPerHour: str[3],
//     timeInEvents: [],
//     timeOutEvents: []
//     }

//     return obj
// }

// function createEmployeeRecords(arr) {
//     return arr.map((str)=> createEmployeeRecord(str));
//   };
// function createTimeInEvent(employee, dates) {

//     let [date, hour] = dates.split(" ");
  
//     employee.timeInEvents.push({
//       type: "TimeIn",
//       hour: parseInt(hour, 10),
//       date,
//     });
  
//     return employee;
    
// }

// function createTimeOutEvent(employee, dates) {
//     let [date, hour] = dates.split(" ");
  
//     employee.timeInEvents.push({
//       type: "TimeOut",
//       hour: parseInt(hour, 10),
//       date,
//     });
  
//     return employee;
// }
// function hoursWorkedOnDate(employee, dates) {
//    let timeInevent = employee.timeInEvents.find((event)=>event.date ===dates)
//     let timeOutevent = employee.timeInEvents.find((event)=>event.date ===dates)
//     return timeOutevent.hour - timeInevent.hour
// }
// function wagesEarnedOnDate(employee, dates) {
//     return (hoursWorkedOnDate(employee, dates)* paidHours).toString()
// }
// function allWagesFor(employee) {
//     employee.timeInEvents.map((events)=> events.date)
//     return events.reduce((e, dates)=>memo + wagesEarnedOnDate(e, dates), 0 )
// }
// function calculatePayroll(employees) {
//     employees.reduce((e, employeesData)=>e+ allWagesFor(employeesData), 0)
// }

// function findEmployeeByFirstName(srcArray, firstName) {
//     return srcArray.find(function(rec){
//       return rec.firstName === firstName
//     })
//   }

let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}