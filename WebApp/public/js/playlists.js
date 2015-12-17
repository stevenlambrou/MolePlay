function populateMolecules(molecules) {
  /*$.getJSON(molecules, function(data){
    var mols = data.length;
    var playlist = $('#mols');


    for(var i = 0; i < mols; i++) {
      var div = $('<div>');
      var time = $('<input>');
      div.text(data[i].name);
      div.attr("draggable","true");
      div.attr("ondragstart","drag(event)");
      div.attr("id",data[i].name);
      div.attr("class","btn-default btn");
      div.attr("author",data[i].author);
      div.attr("index", i);
      time.attr("name","time");
      time.attr("placeholder","Sec.");
      time.attr("size","5");
      div.append("<br>");
      div.append(time);
      playlist.append(div);
    }
    
  });*/
  var moles = JSON.parse(molecules);
  
  var mols = moles.length;
  var playlist = $('#mols');
  for(var i = 0; i < mols; i++) {
    var div = $('<div>');
    var time = $('<input>');
    div.text(moles[i].name);
    div.attr("draggable","true");
    div.attr("ondragstart","drag(event)");
    div.attr("id",moles[i].name);
    div.attr("class","btn-default btn");
    div.attr("author",moles[i].author);
    div.attr("index", i);
    time.attr("name","time");
    time.attr("placeholder","Sec.");
    time.attr("size","5");
    div.append("<br>");
    div.append(time);
    playlist.append(div);
  }
}