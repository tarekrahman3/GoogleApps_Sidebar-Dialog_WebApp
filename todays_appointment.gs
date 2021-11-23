function onOpen() {
  SpreadsheetApp.getUi().createMenu('Schedules')
    .addItem('Todays Appointments', 'showTodaysAppointments')
    .addToUi();  
};

function showTodaysAppointments(){
  var html = HtmlService.createHtmlOutput(html_source(checkTodaysAppointments()));
  html.setWidth(1200);
  html.setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'Todays Follow up Calls ');
};

function evaluate_date(date_string) {
  d_m = String(date_string).split('/');
  if (String(date_string).substring(0,15) == new Date().toDateString() || new Date(d_m[1] + ',' + d_m[0] + ',' + 2021).toDateString() == new Date().toDateString()){
    return true;
  };
};

function checkTodaysAppointments(){
  sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  date_column = sheet.getRange('A:R').getValues();
  obj = []
  for (var i=0;i<date_column.length; i++){
    if (evaluate_date(date_column[i][15])==true){
      //console.log(evaluate_date(date_column[i][15])==true)
      obj.push({
        'Serial':date_column[i][0],
        'Store_Name':date_column[i][2],
        'State':date_column[i][6],
        'Employee_Name':date_column[i][11],
        'Note':date_column[i][16]
      }); 
    };
  };
  return obj;
};

function html_source(obj){
  console.log(obj)
  let new_obj = []
  for (var i=0;i<obj.length;i++)
  {
    let note = obj[i].Note.toLowerCase(); 
    if (note.includes('call after') || note.includes('call before') || note.includes('call between'))
    {
      new_obj.unshift(obj[i])
    } else {
      new_obj.push(obj[i])
    };
  };
  obj = new_obj;
  console.log(new_obj)
  if (obj.length!=0){
    s = "<style> table, th, td {border: 1px solid black;} </style>";
    const headers = 
      "<tr>"+
        '<th>' + 'Serial'+ '</th>' + 
        '<th>' + 'Store Name'+ '</th>' + 
        '<th>' + 'State' + '</th>' + 
        '<th>' + 'Employee Name' + '</th>'+ 
        '<th>' + 'Latest Note' + '</th>'+
      '</tr>';
    var content = ''
    for (var i in obj) {
      content =  content +
        '<tr>'+
          '<td>' + obj[i].Serial + '</td>' +
          '<td>' + obj[i].Store_Name + '</td>' +
          '<td>' + obj[i].State + '</td>' +
          '<td>' + obj[i].Employee_Name + '</td>' + 
          '<td>' + obj[i].Note + '</td>' + 
        '</tr>';
    };
    return s + "<table><tbody>"+ headers + content + "</tbody></table>";
  } 
  else {
    return '<h4>No appointments found for today</h4>';
  };
};



/*
function debugging(){
  sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  date_column = sheet.getRange('A:R').getValues();
  date_string=date_column[9][15]
  console.log(String(date_string).substring(0,15) === new Date().toDateString())
  console.log(date_string)
  console.log(new Date().toDateString())
}
*/
