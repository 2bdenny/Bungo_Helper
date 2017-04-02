/* all game status */
// CURRENT MAX 12
var GAME_STATUS = {
  mypage: 1,      // 图书馆
  select_dive: 2, // 潜书界面
  workspaces: 3,  // 有魂书界面
  finish: 4,      // 有魂书结束，结束后会重新调用workspaces
  // 有魂书开始
  repair_docks: 5,// 修补界面，推测有给出所有人的id和修补速度
  repair_docks_one: 10,// 选择一个修补，是一串数字，结束后同样会重新调用repair_docks
  skill_tree: 6,  // 开花界面，推测有给出所有人的id和开花进展
  skill_tree_one: 11,// 选择一个进入开花界面，是一串数字
  deck: 7,        // 结成界面，有所有队伍的信息
  supply: 8,      // 食堂界面、吃的食物，两种都是这个supply，但是数据有所区别，吃supply之后，会重新调用食堂的supply
  myroom: 9,      // 司书室
  letters_open: 12,// 收信
  letters_settings: 13//设置书信时间
};

/* current game status */
//var cur_game_status;

/* main */
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
    request.getContent(function(content, encoding) {
      var con = JSON.parse(content);
      show_data(con, cur_state);
    });
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
  // $('#test').html(url);
  if (/.*mypage$/g.test(url)) {
    return GAME_STATUS.mypage;
  }
  if (/.*deck$/g.test(url)) {
    return GAME_STATUS.deck;
  }
}

/* show data here */
function show_data(con, cur_state){
  // 首页信息，包含用户信息、资源信息、信件信息
  if (con && cur_state == GAME_STATUS.mypage) {
    // 用户信息
    $('#name').html(con.header.name);
    $('#level').html(con.header.level);
    $('#user_id').html(con.header.user_id);

    // 资源信息
    $('#res_ink').html(con.header.res_ink);
    $('#res_food').html(con.header.res_food);
    $('#item_book').html(con.header.item_book);
    $('#item_quick').html(con.header.item_quick);

    // 信件信息
    var sT = con.letter.settings.selectedTime;
    var sI = con.letter.settings.selectedItem;
    var unit = ['饭团', '墨汁'];
    $('#selectedTime').html(con.letter.settings.times[sT]);
    $('#selectedItem').html(con.letter.settings.items[sI][sT] + unit[sI-1]);
    $('#letter_num').html(con.letter.check.num);
    $('#letter_time').html(con.letter.check.time);//TODO: 倒计时
  } else {
    // 其他情况
  }
}
