/* global CodeMirror */
var editor = CodeMirror;
// CodeMirror 오브젝트를 전역변수에 넣는다.

var rellatreply = { //댓글을 저장하는 전역변수이다.
  replies: [], // 댓글 오브젝트를 저장하는 배열이다. reply { person, level, order, containerID, containerParent, widget }
  reinputs: [], // 댓글입력노드를 저장하는 배열이다. replyInput { person, containerID, containerParent, textID, widget }
  counter: 0 // 댓글 생성시 부여하는 ID를 세는 카운터이다.
};

var identicon = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAADAFBMVEX///+ZjNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUd6f7AAABAHRSTlP//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKmfXxgAABnNJREFUeNoBaAaX+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEAAAAAAAABAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQAAAAAAAAEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAAAAAAAAAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEAAAAAAAABAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQAAAAAAAAEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAAAAAAAAAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5oB1S3l1P8AAAAASUVORK5CYII=','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAADAFBMVEX////YjMMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4LXa3AAABAHRSTlP//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKmfXxgAABnNJREFUeNoBaAaX+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkroB+f7ZZ3IAAAAASUVORK5CYII='];
// 댓글을 달때 사람사진 란에 들어갈 아이덴티콘을 담은 배열이다.
var personname = ['John Doe','Jane Doe'];
// 댓글을 달때 표시한 사람 이름을 담은 배열이다.
var currentperson = 0;
// 현재 댓글을 다는 사람 계정을 선택하는 변수이다. 0: John, 1: Jane

function addReplyInput(editorline, person) {
  // 댓글 입력 노드를 삽입하는 함수이다.
  // editorline은 에디터 줄의 번호나 lineHandle 오브젝트, 혹은 이미 등록된 댓글 노드의 id가 될 수 있다.
  // person은 댓글을 다는 계정이다.
  removeReplyInput(); // 댓글 입력 노드가 여러개 생기지 않도록 이전에 생성된 입력노드를 제거한다.
  var widgetdom = document.createElement("DIV"); // 삽입할 노드를 생성한다.
  widgetdom.setAttribute("class", "reply-box");
  widgetdom.setAttribute("id", "reply-input-container-" + rellatreply.counter);
  widgetdom.innerHTML = '<div class="reply" style="margin:0;padding:5px; background-color:#f6f7f9;"><div class="reply-img" style="padding:5px; display:inline-block;"><img src="'+identicon[person]+'"></div><div class="reply-text-container" style="margin:0;padding-top:5px; vertical-align: top; display:inline-block;line-height:1.4;width: calc(100% - 60px);min-height:37px;"><div class="reply-input-box" style="border:1px solid #aaa; background:#ffffff;"><div id="reply-input-'+ rellatreply.counter +'" class="reply-input-cell" style="padding:8px;color:#000;" contenteditable="true" onkeydown="return addReply(event,'+ rellatreply.counter +')" onfocus="return replyinputfocus(event)" tabindex="-1"><span style="color:#888;">답글 달기...</span></div></div></div></div>';
  // 미리 작성한 html 템플레이트를 사용한다. https://thimbleprojects.org/mohawkduck/194618/

  // editorline 변수가 에디터 줄의 번호인지, lineHandle 오브젝트인지, 이미 등록된 댓글 노드의 id인지 알아낸다.
  var widget, containerParent;
  if (typeof editorline == "string") {
    // editorline 변수가 이미 등록된 댓글 노드의 id인 경우
    for (var i = 0; i < rellatreply.replies.length; ++i) {
      if(rellatreply.replies[i].containerID == editorline) {
        // 해당 id를 rellatreply.replies 배열에서 찾는다.
        widget = rellatreply.replies[i].widget;
        containerParent = document.getElementById(rellatreply.replies[i].containerID);
        // widget, containerParent는 댓글입력노드를 rellatreply.reinputs에 저장할 때 필요하다.
        if( widget.node != containerParent.parentNode) containerParent = containerParent.parentNode;
        // 댓글노드가 2단계까지만 달리도록 고정하는 조건문이다.
        containerParent.appendChild(widgetdom);
        // 댓글 노드 하단에 댓글 입력 노드를 삽입한다.
        widget.changed();
        // CodeMirror 에디터의 높이를 재설정해준다. 재설정 안하면 에디터 높이를 잘못 계산해서 텍스트 커서가 이상한 곳에 가서 붙게된다.
        break;
      }
    }
    if (!widget) { console.log("Cannot insert reply input because node doesn't exist."); return; }
    // 없는 노드의 id를 참조한 경우
  }else {
    var eline = (editorline) ? editorline : editor.getCursor().line;
    // editorline이 false, undefined 등인 경우 현재 텍스트 커서 위치를 가져온다.
    widget = getWidget(eline);
    // rellatreply.replies 배열을 뒤져서 이미 생성된 line widget을 가져온다.
    if(widget !== undefined) {
      // put input in the widget
      widget.node.appendChild(widgetdom);
      widget.changed();
    }else {
      // 해당 줄에 이미 생성된 line widget이 없는 경우
      // make a widget
      var newdom = document.createElement("DIV");
      newdom.setAttribute("class", "reply-container");
      newdom.appendChild(widgetdom)
      widget = editor.addLineWidget(eline, newdom);
      // line widget을 삽입한다.
    }
    containerParent = widget.node;
  }

  rellatreply.reinputs.push({
    // rellatreply.reinputs 배열에 새로 만든 댓글입력노드를 삽입한다.
    person: person,
    containerID: "reply-input-container-" + rellatreply.counter,
    containerParent: containerParent,
    textID: "reply-input-"+ rellatreply.counter,
    widget: widget
  });
  rellatreply.counter++; // id 카운터를 갱신한다.
}

function replyinputfocus(e) {
  // 댓글입력노드에 텍스트 커서가 붙으면 호출된다.
  if(e.target.textContent != "답글 달기...") return;
  // 안내문구가 있을 경우 안내문구를 삭제한다.
  e.target.innerHTML='';
  while (e.target.firstChild) {
    e.target.removeChild(e.target.firstChild);
  }
}

function addReply(event,idcounter) {
  // 댓글입력노드에서 키를 누르면 호출된다. enter 키를 감지하면 댓글노드를 삽입한다.
  // event는 onkeydown 이벤트에서 전달된 이벤트 오브젝트이다.
  // idcounter는 해당 노드 id의 번호이다.
  if(event.keyCode == 13 || event.which == 13) {
    // event.keyCode == 13 은 enter 키이다. event.which는 브라우져 호환성을 위해 삽입했다.
    var textdom = document.getElementById("reply-input-" + idcounter);
    // 댓글 입력 내용을 가져올 노드이다.
    var targetinput;
    for (var i = 0; i < rellatreply.reinputs.length; ++i) {
      // rellatreply.reinputs 배열에서 댓글입력노드를 찾는다.
      if(rellatreply.reinputs[i].containerID == "reply-input-container-"+idcounter) {
        targetinput = rellatreply.reinputs[i];
      }
    }
    if(!targetinput) return;

    var replydom = document.createElement("DIV");
    replydom.setAttribute("class", "reply-box");
    replydom.setAttribute("id", "reply-" + rellatreply.counter);
    replydom.innerHTML = '<div class="reply" style="margin:0;padding:5px; background-color:#f6f7f9;border-top: 1px solid #aaaaff;"><div class="reply-img" style="padding:5px; display:inline-block;"><img src="'+identicon[targetinput.person]+'"></div><div class="reply-text-container" style="margin:0;padding-top:5px; vertical-align: top; display:inline-block;line-height:1.4;max-width: calc(100% - 60px);word-wrap:break-word;"><a style="color:#365899;margin-right:5px;font-weight:bold;text-decoration:none;" href="#"><span>'+personname[targetinput.person]+'</span></a><span>'+ textdom.textContent +'</span><div><a style="text-decoration:none;color:#365899;" href="#"><span>Like</span></a> · <a style="text-decoration:none;color:#365899;" href="#" onclick="return addReplyInput(\'reply-'+ rellatreply.counter +'\',currentperson)"><span>Reply</span></a> · <a style="color:#888888;text-decoration:none;" href="#"><span>5 minute ago</span></a></div></div><div class="reply-button" style="color:#888888;float:right;visibility: hidden;">x</div></div>';
    targetinput.containerParent.appendChild(replydom);
    // 댓글입력노드가 달린 container노드에 댓글노드를 삽입한다.
    rellatreply.replies.push({
      // rellatreply.replies 배열에 댓글노드를 삽입한다.
      person: targetinput.person,
      level: 0,
      order: 0,
      containerID: "reply-" + rellatreply.counter,
      containerParent: targetinput.containerParent,
      widget: targetinput.widget
    });
    rellatreply.counter++;
    if(targetinput.containerParent == targetinput.widget.node) addReplyInput(targetinput.widget.line, targetinput.person);
    else addReplyInput(targetinput.containerParent.getAttribute('id'), targetinput.person);
    // 댓글입력노드를 하단에 삽입한다. 댓글입력노드가 2단계까지만 달리도록 고정한다.
  }
}

function removeReplyInput() {
  // rellatreply.reinputs 배열에 있는 댓글입력노드를 dom과 배열에서 제거한다.
  for (var i = 0; i < rellatreply.reinputs.length; ++i) {
    var p =  rellatreply.reinputs[i].containerParent;
    p.removeChild(document.getElementById(rellatreply.reinputs[i].containerID));
    //remove all input boxs for replies
    if(!p.firstChild) editor.removeLineWidget(rellatreply.reinputs[i].widget);
  }
  rellatreply.reinputs.length = 0;
}

function getWidget(linehandle) {
  // 댓글노드 혹은 댓글입력노드가 삽입되는 line widget 오브젝트를 가져오는 함수이다.
  // linehandle은 에디터 줄의 번호나 lineHandle 오브젝트, 혹은 이미 등록된 댓글 노드의 id가 될 수 있다.
  if (typeof linehandle == "string") {
    for (var i = 0; i < rellatreply.replies.length; ++i) {
      if(rellatreply.replies[i].containerID == linehandle) {
        return rellatreply.replies[i].widget;
      }
    }
    return undefined;
  }
// linehandle에서 line no를 가지고 오거나, line no에서 linehandle을 가지고 온다.
// 조건문 구조는 https://codemirror.net/lib/codemirror.js 5283줄의 changeLine 함수 참고
// 관련 함수: doc.getLineNumber(handle: LineHandle) → integer
  var no = linehandle, line = linehandle
  if (typeof linehandle == "number") { line = editor.getLineHandle(no) }
  else { no = editor.getLineNumber(line) }
  for (var i = 0; i < rellatreply.replies.length; ++i) {
    if(editor.getLineNumber(rellatreply.replies[i].widget.line) == no) {
      // line no가 일치하는 댓글노드의 line widget 오브젝트를 가져온다.
      return rellatreply.replies[i].widget;
    }
  }
  return undefined;
}

window.onload = function() {
  // 페이지가 로드되면 CodeMirror 에디터를 설정한다.
  var text = document.getElementById('my-text');
  editor = CodeMirror.fromTextArea(text, {
    mode: "javascript",
    theme: "ambiance",
    lineNumbers: true,
    lineWrapping: true
  });

  // 댓글 버튼 이벤트를 등록한다.
  document.getElementById('comment-john').onclick = function() {
    addReplyInput(0,0);
  };
  document.getElementById('comment-jane').onclick = function() {
    addReplyInput(0,1);
  };
};
