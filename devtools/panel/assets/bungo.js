window.onload = function() {
  /* UI animation */
  show_div('res_info');
  $('#btn_res_info').click(function(){
    show_div('res_info');
  });
  $('#btn_team_info').click(function(){
    show_div('team_info');
  });
  $('#btn_log_info').click(function(){
    show_div('log_info');
  });

  /* dispatch data */
  chrome.devtools.network.onRequestFinished.addListener(function(request){
    console.log(request);
    show_url(request.request.url);
    show_content(request);
  });
}

/* UI animation of index.html */
function show_div(div_id){
  $('#res_info').hide();
  $('#team_info').hide();
  $('#log_info').hide();
  if(div_id) $('#' + div_id).show();
}

/* dispatch data here */
function show_url(url){
  $("#test").html(url);
}

function show_content(request){
  if (/.*mypage/g.test(request.request.url)) {
    var content = request.getContent(function(content, encoding){
      // TODO get content of response
    });
    $("#response_content").html(content);
  }
}
