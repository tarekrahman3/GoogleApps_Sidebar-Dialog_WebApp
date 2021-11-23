function onEdit(e) {
  var sheet = e.source.getActiveSheet().getName()
  var column = e.range.getColumn();
  var row = e.range.getRow();
  if (sheet == 'My Sheet' && column == 17 && String(e.value) != 'undefined') {
    var history = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Notes History').getRange('B'+String(row))
    main = generate_value(e, history)
    history.setValue(main)
  }
};

function generate_value(e, history){
  const new_value = e.value
  const history_value = history.getValue()
  var date = new Date().toDateString()
  if (history_value == '') {
    value =  String(date)+ ": " +new_value;
    }
  else if (history_value != '') {
    value = history_value + '\n' + String(date) + ": " + new_value;
    }
  return value;
};
