function fillTable(elements) {
   if (!document.getElementsByTagName) {
     return;
  }
  var numCol = document.getElementsByTagName("table")[0].rows[0].cells.length;
  var tabBody = document.getElementsByTagName("tbody").item(0);
  var row = document.createElement("tr");
  for(var i = 0; i < numCol; i++) {
    var cell = document.createElement("td");
    cell.appendChild(document.createTextNode(elements[i]));
    row.appendChild(cell);
  }
  tabBody.appendChild(row);
};
