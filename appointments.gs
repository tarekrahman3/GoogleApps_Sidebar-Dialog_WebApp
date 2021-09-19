function onOpen() {
  var html = HtmlService.createHtmlOutput(html_source());
  html.setWidth(800);
  html.setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'Todays Follow up Calls ');

  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Schedules')
    .addItem('Todays Appointments', 'todaysAppointments')
    .addItem('Tomorrows Appointments', 'tomorrowsAppointments')
    .addToUi();
}

function evaluate_date(date_string) {
  var today = new Date();
  var date = new Date(date_string);
  if (today.getDate() + '/'+ today.getMonth() == date.getDate() +'/' + date.getMonth()){
    return true;
  };
};

function checkTodaysAppointments(){
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  date_column = sheet.getRange('A:R').getValues();
  obj = []
  for (var i in date_column){
    if (evaluate_date(date_column[i][15])==true){
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

function html_source(){
  obj = checkTodaysAppointments();
  s = "<style> table, th, td {border: 1px solid black;} </style>";
  t = 
    "<tr>"+
      '<th>' + 'Serial'+ '</th>' + 
      '<th>' + 'Store Name'+ '</th>' + 
      '<th>' + 'State' + '</th>' + 
      '<th>' + 'Employee Name' + '</th>'+ 
      '<th>' + 'Notes' + '</th>'+
    '</tr>';
  for (var i = 0; i < obj.length; i++) {
    t = t +
      '<tr>'+
        '<td>' + obj[i].Serial + '</td>' +
        '<td>' + obj[i].Store_Name + '</td>' +
        '<td>' + obj[i].State + '</td>' +
        '<td>' + obj[i].Employee_Name + '</td>' + 
        '<td>' + obj[i].Note + '</td>' + 
      '</tr>';
  };
  return s + "<table><tbody>"+ t + "</tbody></table>";
};

function todaysAppointments(){
  var html = HtmlService.createHtmlOutput(html_source());
  html.setWidth(800);
  html.setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'Todays Follow up Calls ');
};
