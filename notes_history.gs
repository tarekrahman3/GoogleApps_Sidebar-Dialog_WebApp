function onEdit(e) {
  var sheet=e.source.getActiveSheet().getName()
  var column = e.range.getColumn();
  var row = e.range.getRow();
  const history = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Notes History').getRange('B'+String(row))
  main = generate_value(e, history)
  if (sheet=='My Sheet' && column===17) {
    history.setValue(main)
    e.range.setNote(main)
  }
}

function generate_value(e, history){
  const new_value = e.value
  const history_value = history.getValue()
  if (history_value == '') {
    value = new_value
    }
  else if (history_value != '') {
    value = history_value + '\n' + new_value
    SpreadsheetApp.getActive().toast(e.value+' | '+new_value + '|' + history_value)
    }
  return value;
};
