function populateMolecules() {
  $.getJSON("/molecules.json", function(data){
    var mols = data.molecules.length;
    var playlist = $('#mols');


    for(var i = 0; i < mols; i++) {
      var btn = $('<a>');
      btn.text(data.molecules[i].name);
      btn.attr("draggable","true");
      btn.attr("ondragstart","drag(event)");
      btn.attr("id",data.molecules[i].name);
      btn.attr("class","btn-default btn");
      playlist.append(btn);
    }
  });
}

function createPlaylist() {
  var playlist = { 'molecules' : [

  ]};
  var name = $("#name").val();
   $('#playlist').children().each(function () {
    console.log($(this).text()); //log every element found to console output
    var text = $(this).text();
    var mol = {text};
    playlist.molecules.push(mol);
  });
  console.log(playlist);
  if(name === "") {
    alert("Please give the playlist a name.");
    return;
  }
  writeToFile(playlist);
}

function writeToFile(jsonObject) {
  $.getJSON("/playlists.json", function(data) {
    var tmp = data;
    tmp.playlists.push(jsonObject);
    $.ajax({
      type : "POST",
      url : "playlists.json",
      dataType : 'json',
      data : {
          tmp /* convert here only */
      }
    });
  });
}
