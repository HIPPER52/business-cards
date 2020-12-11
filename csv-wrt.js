const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'persons.csv',
    header: [
        {id: 'id', title: 'Id'},
        {id: 'first_name', title: 'Name'},
        {id: 'last_name', title: 'Surname'},
        {id: 'email', title: 'Email'},
    ]
  })

/*
function createCsv(data) {
    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'))
}*/


module.exports = function(data) {
    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'))
}