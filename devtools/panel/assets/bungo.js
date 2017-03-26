

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
    var url = request.request.url;
    var cur_state = route(url);
    if (/.*mypage$/g.test(url)) {
      /* Only for test */
      $('#test').html(url);

      /* Information update */
      request.getContent(function(content, encoding) {
        var con = JSON.parse(content);
        show_data(con);
      });
    }
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
function route(url) {

}

/* show data here */
function show_data(con){
  if (con) {
    $('#tip').html();
    $('#name').html(con.header.name);
    $('#level').html(con.header.level);
    $('#res_ink').html(con.header.res_ink);
    $('#res_food').html(con.header.res_food);
    $('#item_book').html(con.header.item_book);
    $('#item_quick').html(con.header.item_quick);
  } else {
    $('#tip').html("回到首页可以看到信息");
  }
}
