function onOpen() {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('CRM Functions')
      .addItem('Start', 'start')
      .addItem('Name & Mobile', 'inputNameAndMobile')
      .addToUi();
}
function start() {
 var widget = HtmlService.createHtmlOutputFromFile('sidebar');
 SpreadsheetApp.getUi().showSidebar(widget);
}
function inputNameAndMobile() {
 var widget = HtmlService.createHtmlOutputFromFile('individuals_details');
 SpreadsheetApp.getUi().showSidebar(widget);
}

function set_name (name){
  SpreadsheetApp.getActiveSheet().getRange("I"+row()).setValue(name);
}

function set_mobile (mobile){
  SpreadsheetApp.getActiveSheet().getRange("J"+row()).setValue(mobile);
}

function set_email (email){
  SpreadsheetApp.getActiveSheet().getRange("G"+row()).setValue(email);
}


function set_call_date(call_date){
  SpreadsheetApp.getActiveSheet().getRange("K"+row()).setValue(call_date);
}

function set_follow_up_date(follow_up_date){
 SpreadsheetApp.getActiveSheet().getRange("L"+row()).setValue(follow_up_date);
}

function set_note(note){
 cell =SpreadsheetApp.getActiveSheet().getRange("M"+row());
 
 if (cell.getValue() == ''){
   cell.setValue(note)
   } else {
    cell.setValue(cell.getValue()+'\n'+note)
     }
}

function row() {
  return Number(SpreadsheetApp.getActive().getActiveSheet().getActiveCell().getRow());
}
