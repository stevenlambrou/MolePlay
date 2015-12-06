function populateMolecules() {
  $.getJSON("/molecules.json", function(data){
    var numCol = data.molecules.length;
    var tabBody = document.getElementsByTagName("tbody").item(1);


    for(var i = 0; i < numCol; i++) {
      var btn = document.createElement("button");
      var t = document.createTextNode("Add");
      btn.appendChild(t);
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var name = document.createTextNode(data.molecules[i].name);
      cell.appendChild(name);
      row.appendChild(cell);
      cell = document.createElement("td");
      var auth = document.createTextNode(data.molecules[i].author);
      cell.appendChild(auth);
      row.appendChild(cell);
      row.appendChild(btn);
      tabBody.appendChild(row);
      $("button").addClass("btn-default");
      $("button").addClass("btn");
      var $btn = $(btn).click(function() {
        console.log(data.molecules[i]);
        console.log(i);
            addToPlaylist(data.molecules[i])

      });
    }
  }
)};

function addToPlaylist(data) {
  $.parseJSON(data, function(data){
    var tabBody = document.getElementsByTagName("tbody").item(0);

      var btn = document.createElement("button");
      var t = document.createTextNode("Add");
      btn.appendChild(t);
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(data.name));
      row.appendChild(cell);
      cell = document.createElement("td");
      cell.appendChild(document.createTextNode(data.author));
  }
)};
