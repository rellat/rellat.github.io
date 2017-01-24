window.onload = function() {
  var text = document.getElementById('my-text');

  var editableCodeMirror = CodeMirror.fromTextArea(text, {
    mode: "javascript",
    theme: "default",
    lineNumbers: true,
  });
  //Manual syncing isn't needed for POST requests, 
  //but *is* needed if the <textarea> value is used client-side..
  //http://stackoverflow.com/a/18167210
  editableCodeMirror.on('change', function(cm) {
    text.value = cm.getValue();
  });

  document.getElementById('test').onclick = function() {
    //console.log(text.value);
    var para = document.createElement("DIV"); // Create a <p> element
    para.setAttribute("style", "padding: 5px;height:50px; background-color: #eeeeff;");
    var t = document.createTextNode("This is a paragraph"); // Create a text node
    para.appendChild(t); // Append the text to <p>
    editableCodeMirror.addLineWidget(editableCodeMirror.getCursor().line, para);
  };

  //coverGutter: boolean
  //Whether the widget should cover the gutter. 줄번호를 침범할지 여부.
  //noHScroll: boolean
  //Whether the widget should stay fixed in the face of horizontal scrolling.
  //above: boolean
  //Causes the widget to be placed above instead of below the text of the line.
  //handleMouseEvents: boolean
  //Determines whether the editor will capture mouse and drag events occurring in this widget. Default is false—the events will be left alone for the default browser handler, or specific handlers on the widget, to capture.
  //insertAt: integer
  //By default, the widget is added below other widgets for the line. This option can be used to place it at a different position (zero for the top, N to put it after the Nth other widget). Note that this only has effect once, when the widget is created.
};