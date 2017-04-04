
/* 所有的常量保存在这里 */

// 信件到达周期，时间单位是秒
var letter_all_times = [ 1800, 3600, 10800, 21600, 43200 ];

// 精神状况
var master_all_mentals = [ '安定', '丫丫安定', '普通', '丫丫不安定', '不安定' ];

// 武器
var master_all_categories = [ '刃', '弓', '铳', '鞭' ];

/* all game status */
// CURRENT MAX 16
// 这里主要是为了方便，数字可以随便改，只要没重复就行
var GAME_STATUS = {
  mypage: 1,      // 图书馆
  select_dive: 2, // 潜书界面
  workspaces: 3,  // 有魂书界面
  finish: 4,      // 有魂书结束，结束后会重新调用workspaces
  // 有魂书开始
  repair_docks: 5,// 修补界面，推测有给出所有人的id和修补速度
  repair_docks_one: 6,// 选择一个修补，是一串数字，结束后同样会重新调用repair_docks
  skill_tree: 7,  // 开花界面，推测有给出所有人的id和开花进展
  skill_tree_one: 8,// 选择一个进入开花界面，是一串数字
  deck: 9,        // 结成界面，有所有队伍的信息
  supply: 10,      // 食堂界面、吃的食物，两种都是这个supply，但是数据有所区别，吃supply之后，会重新调用食堂的supply
  myroom: 11,      // 司书室
  letters_open: 12,// 收信
  letters_settings: 13,//设置书信时间
  stages: 14, //选择战场
  battle: 15,  //出阵
  result: 16  // 结果
};

/* 信件信息 */
var letter_settings_seconds = 0;  // 设置好的信件周期
var letter_seconds = -1; // 信件倒计时
var letter_count = 0;   // 信件数目

/* 所有vue的app */
var team_app;
var bungo_app;

/* main */
window.onload = function() {
  /* UI animation */
  show_div('team_info');
  $('#btn_team_info').click(function(){
    show_div('team_info');
  });
  $('#btn_bungo_info').click(function(){
    show_div('bungo_info');
  });
  $('#btn_log_info').click(function(){
    show_div('log_info');
  });

  /* 信件倒计时 */
  setInterval(letter_time_countdown, 1000);

  /* 创建Vue */
  team_app = new Vue({
    el: '#team_info',
    data: {
      teams: null
    }
  });

  bungo_app = new Vue({
    el: '#bungo_info',
    data: {
      bungos: null
    }
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

/*****************************/
  /* TEST ONLY */
  //TEST_ONLY_show_all();
/*****************************/

}

/*****************************/
/* TEST ONLY */
function TEST_ONLY_show_all() {
  $('#team_info').show();
  $('#bungo_info').show();
  $('#log_info').show();
}
/*****************************/

/* UI animation of index.html */
function show_div(div_id){
  // $('#res_info').hide();
  $('#team_info').hide();
  $('#bungo_info').hide();
  $('#log_info').hide();
  if(div_id) $('#' + div_id).show();
}

function letter_time_countdown() {
  if (letter_seconds > 0) {
    letter_seconds = letter_seconds - 1;
    var h = Math.floor(letter_seconds / 3600);
    var m = Math.floor( (letter_seconds - h * 3600) / 60 );
    var s = letter_seconds - h * 3600 - m * 60;
    $('#letter_time').html(h.toString() + ":" + m.toString() + ":" + s.toString());
  } else if (letter_seconds == 0 ){
    if (letter_count == 0) {
      letter_count = letter_count + 1;
      letter_seconds = letter_settings_seconds - 1;
      return ;
    }
    if (letter_count == 1) {
      letter_count = letter_count + 1;
      letter_seconds = - 1;
      return ;
    }
    if (letter_count == 2) {
      letter_seconds = -1;
      return ;
    }
  } else {
    $('#letter_time').html("0:0:0");
  }
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
  if (/.*stages\/start\/\d+/g.test(url)) {
    return GAME_STATUS.stages;
  }
  if (/.*stages\/battle/g.test(url)) {
    return GAME_STATUS.battle;
  }
  if (/.*stages\/result/g.test(url)) {
    return GAME_STATUS.result;
  }
}

/* show data here */
function show_data(con, cur_state){
  if (con && cur_state == GAME_STATUS.mypage) { // 首页信息，包含用户信息、资源信息、信件信息
    show_mypage(con);
  } else if (con && cur_state == GAME_STATUS.deck) { // 队伍信息
    show_deck(con);
    show_bungos(con);
  } else if (con && cur_state == GAME_STATUS.stages) {
    update_log_stage(con);
  } else if (con && cur_state == GAME_STATUS.battle) {
    update_info_battle(con);
  } else if (con && cur_state == GAME_STATUS.result) {
    update_info_result(con);
  } else {
    // 其他情况
  }
}

/* 展示首页信息，包含用户信息、资源信息、信件信息 */
function show_mypage(con) {
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
  letter_settings_seconds = letter_all_times[sT];
  letter_seconds = con.letter.check.time;
  letter_count = con.letter.check.num;
}

/* 展示队伍信息 */
function show_deck(con) {
  var teams_data = [];
  for (var d in con.decks) {
    var mems = [];
    // 获取一个队员的信息
    for (var m in con.decks[d].units) {
      if (!con.decks[d].units[m]) continue;
      var amem = {
        id: con.decks[d].units[m].id,
        name: con.decks[d].units[m].master.name,
        level: con.decks[d].units[m].level,
        category: master_all_categories[con.decks[d].units[m].master.category - 1],
        hp: con.decks[d].units[m].hp,
        fp: con.decks[d].units[m].fp,
        mental: master_all_mentals[con.decks[d].units[m].master.mental - 1],
        sp: con.decks[d].units[m].sp,
        lb: con.decks[d].units[m].lb,
        next_exp: parseInt(con.decks[d].units[m].next_level_exp) - parseInt(con.decks[d].units[m].exp)
      };
      mems.push(amem);
    }
    // 整合一个队伍的信息
    var ateam = {
      id: parseInt(d)+1,
      name: con.decks[d].name,
      members: mems
    };
    teams_data.push(ateam);
  }

  team_app.teams = teams_data;
}

/* 展示所有文豪信息 */
function show_bungos(con) {
  var bungos_data = [];
  for (var d in con.units) {
    var amem = {
      id: con.units[d].id,
      name: con.units[d].master.name,
      level: con.units[d].level,
      category: master_all_categories[con.units[d].master.category - 1],
      hp: con.units[d].hp,
      fp: con.units[d].fp,
      mental: master_all_mentals[con.units[d].master.mental - 1],
      sp: con.units[d].sp,
      lb: con.units[d].lb,
      next_exp: parseInt(con.units[d].next_level_exp) - parseInt(con.units[d].exp)
    };
    bungos_data.push(amem);
  }

  bungo_app.bungos = bungos_data;
}

/* 文豪出阵选择战场 */
function update_log_stage(con) {
  // TODO 战场信息，更新log
}

/* 文豪战斗，更新team数值和文豪列表的数值 */
function update_info_battle(con) {
  // 捡到资源
  if (con.category == 2) return;

  // 战斗
  if (con.category == 1) {
    for (var d in con.result.units) {
      var bungo_id = con.result.units[d].id;
      var bungo_hp = con.result.units[d].hp;

      update_bungo(bungo_id, 'hp', bungo_hp);
    }
  }
}

/* 在这里更新bungos_data和team_data */
function update_bungo(id, item, value) {
  for (var i = 0; i < bungo_app.bungos.length; i++) {
    if (bungo_app.bungos[i].id == id) {
      if (item == 'hp') {
        bungo_app.bungos[i].hp = value;
      } else if (item == 'fp') {
        bungo_app.bungos[i].fp = value;
      } else if (item == 'lb') {
        bungo_app.bungos[i].lb = value;
      }
      break; // 因为拥有的文豪不会重复
    }
  }
  for (var i = 0; i < team_app.teams.length; i++) {
    for (var j = 0; j < team_app.teams[i].members.length; j++) {
      if (team_app.teams[i].members[j].id == id) {
        if (item == 'hp') {
          team_app.teams[i].members[j].hp = value;
        } else if (item == 'fp') {
          team_app.teams[i].members[j].fp = value;
        } else if (item == 'lb') {
          team_app.teams[i].members[j].lb = value;
        }
        break; // 因为一个队伍里不会有相同的文豪
      }
    }
  }
}

/* 根据战斗结束的信息对bungos_data和team_data进行更新 */
function update_info_result(con) {
  // 更新文豪fp/lb信息
  for (var d in con.units) {
    update_bungo(con.units[d].id, 'fp', con.units[d].fp);
    update_bungo(con.units[d].id, 'lb', con.units[d].lb);
  }

  // TODO update log
}
