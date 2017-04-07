
/* 所有的常量保存在这里 */

// 信件到达周期，时间单位是秒
var letter_all_times = [ 1800, 3600, 10800, 21600, 43200 ];

// 精神状况
var master_all_mentals = [ '安定', '丫丫安定', '普通', '丫丫不安定', '不安定' ];

// 武器
var master_all_categories = [ '刃', '弓', '铳', '鞭' ];

// 所有战斗结果
var battle_all_results = ['优', '良', '可', '不'];

// 文豪的所有状态
var bungo_all_statuses = ['', '潜书', '补修'];
var BUNGO_STATUS = {
  leisure: 0,
  work: 1,
  repair: 2
};

/* all game status */
// CURRENT MAX 16
// 这里主要是为了方便，数字可以随便改，只要没重复就行
var GAME_STATUS = {
  mypage: 1,      // 图书馆
  workspaces: 3,  // 有魂书界面
  work_force_finish: 4,      // 有魂书结束，结束后会重新调用workspaces
  // 有魂书开始
  repair_docks: 5,// 修补界面，推测有给出所有人的id和修补速度
  repair_force_finish: 6,// 选择一个修补，是一串数字，结束后同样会重新调用repair_docks
  skill_tree: 7,  // 开花界面，推测有给出所有人的id和开花进展
  skill_tree_one: 8,// 选择一个进入开花界面，是一串数字
  deck: 9,        // 结成界面，有所有队伍的信息
  supply: 10,      // 食堂界面、吃的食物，两种都是这个supply，但是数据有所区别，吃supply之后，会重新调用食堂的supply
  myroom: 11,      // 司书室
  letters_open: 12,// 收信
  letters_settings: 13,//设置书信时间
  start: 14, //选择战场
  battle: 15,  // 出阵
  result: 16,  // 结果
  status: 17,   // 炼金术师资源&经验值更新
  supply: 18    // 吃饭
};

/* 信件信息 */
var letter_settings_seconds = 0;  // 设置好的信件周期
var letter_seconds = -1; // 信件倒计时
var letter_count = 0;   // 信件数目

/* 所有vue的app */
var res_app;  // 资源信息
var team_app; // 队伍信息
var bungo_app;// 文豪信息
var battle_log_app;  // 掉落记录
var build_log_app;   // 有魂书潜书记录

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
  $('#btn_battle_log_info').click(function(){
    show_div('battle_log_info');
  });
  $('#btn_build_log_info').click(function(){
    show_div('build_log_info');
  });
  $('#btn_egg_info').click(function(){
    show_div('egg_info');
  });

  /* 信件倒计时 */
  setInterval(letter_time_countdown, 1000);

  /* 文豪状态倒计时 */
  setInterval(bungo_status_countdown, 1000);

  /* 创建Vue */
  res_app = new Vue({
    el: '#res_info',
    data: {
      name: "USERNAME",
      level: "LEVEL",
      uid: "UID",
      next_exp: "NEXTEXP",
      res_ink: "INK",
      res_food: "FOOD",
      item_book: "BOOK",
      item_quick: "QUICK",
      selectedTime: "LETTER_TIME",
      selectedItem: "LETTER_ITEM",
      letter_num: "NUM",
      letter_time: "TIME"
    }
  });
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

  battle_log_app = new Vue({
    el: '#battle_log_info',
    data: {
      nos: 0,
      logs: []
    }
  });

  build_log_app = new Vue({
    el: '#build_log_info',
    data: {
      nos: 0,
      logs: []
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
  $('#battle_log_info').show();
  $('#build_log_info').show();
  $('#egg_info').show();
}
/*****************************/

/* UI animation of index.html */
function show_div(div_id){
  // $('#res_info').hide();
  $('#team_info').hide();
  $('#bungo_info').hide();
  $('#battle_log_info').hide();
  $('#build_log_info').show();
  $('#egg_info').hide();
  if(div_id) $('#' + div_id).show();
}

/* 信件倒计时 */
function letter_time_countdown() {
  if (letter_seconds > 0) {
    letter_seconds = letter_seconds - 1;
    var h = Math.floor(letter_seconds / 3600);
    var m = Math.floor( (letter_seconds - h * 3600) / 60 );
    var s = letter_seconds - h * 3600 - m * 60;
    res_app.letter_time = h.toString() + ":" + m.toString() + ":" + s.toString();
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
    res_app.letter_time = "0:0:0";
  }
}

/* 文豪状态倒计时 */
function bungo_status_countdown() {
  for (var i = 0; i < team_app.teams.length; i++) {
    for (var j = 0; j < team_app.teams[i].members.length; j++){
      if (team_app.teams[i].members[j].status != BUNGO_STATUS.leisure) {
        if (team_app.teams[i].members[j].status_countdown > 0) {
          // 倒计时减一
          var cur_sec = team_app.teams[i].members[j].status_countdown - 1;
          team_app.teams[i].members[j].status_countdown = cur_sec;
          var h = Math.floor(cur_sec / 3600);
          var m = Math.floor( (cur_sec - h * 3600) / 60 );
          var s = cur_sec - h * 3600 - m * 60;
          team_app.teams[i].members[j].status_show = bungo_all_statuses[team_app.teams[i].members[j].status] + ' ' + h.toString() + ':' + m.toString() + ':' + s.toString();
        } else if (team_app.teams[i].members[j].status_countdown == 0) {
          // 倒计时等于0的时候更新状态
          if (team_app.teams[i].members[j].status == BUNGO_STATUS.repair) {
            // 补修完成时额外更新hp
            team_app.teams[i].members[j].hp = 100;
          }
          team_app.teams[i].members[j].status = BUNGO_STATUS.leisure;
          team_app.teams[i].members[j].status_show = null;
        } else if (team_app.members[j].status_countdown < 0) {
          // 这种情况出现在，有人正在补修/work但是没有去过补修/work界面时
          team_app.teams[i].members[j].status_show = bungo_all_statuses[team_app.teams[i].members[j].status];
        }
      } else {
        team_app.teams[i].members[j].status_show = null;
      }
    }
  }

  for (var i = 0; i < bungo_app.bungos.length; i++) {
    if (bungo_app.bungos[i].status != BUNGO_STATUS.leisure) {
      if (bungo_app.bungos[i].status_countdown > 0) {
        // 倒计时减一
        var cur_sec = bungo_app.bungos[i].status_countdown - 1;
        bungo_app.bungos[i].status_countdown = cur_sec;
        var h = Math.floor(cur_sec / 3600);
        var m = Math.floor( (cur_sec - h * 3600) / 60 );
        var s = cur_sec - h * 3600 - m * 60;
        bungo_app.bungos[i].status_show = bungo_all_statuses[bungo_app.bungos[i].status] + ' ' + h.toString() + ':' + m.toString() + ':' + s.toString();
      } else if (bungo_app.bungos[i].status_countdown == 0) {
        // 倒计时等于0的时候更新状态
        if (bungo_app.bungos[i].status == BUNGO_STATUS.repair) {
          // 补修完成时额外更新hp
          bungo_app.bungos[i].hp = 100;
        }
        bungo_app.bungos[i].status = BUNGO_STATUS.leisure;
        bungo_app.bungos[i].status_show = null;
      } else if (team_app.members[j].status_countdown < 0) {
        // 这种情况出现在，有人正在补修但是没有去过补修界面时
        bungo_app.bungos[i].status_show = bungo_all_statuses[bungo_app.bungos[i].status];
      }
    } else {
      bungo_app.bungos[i].status_show = null;
    }
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
    return GAME_STATUS.start;
  }
  if (/.*stages\/battle/g.test(url)) {
    return GAME_STATUS.battle;
  }
  if (/.*stages\/result/g.test(url)) {
    return GAME_STATUS.result;
  }
  if (/.*status$/g.test(url)) {
    return GAME_STATUS.status;
  }
  if (/.*page\/supply$/g.test(url)){
    return GAME_STATUS.supply;
  }
  if (/.*repair_docks$/g.test(url)){
    return GAME_STATUS.repair_docks
  }
  if (/.*repair_docks\/\d+\/force_finish$/g.test(url)) {
    return GAME_STATUS.repair_force_finish;
  }
  if (/.*workspaces/g.test(url)) {
    return GAME_STATUS.workspaces;
  }
}

/* show data here */
function show_data(con, cur_state){
  if (con && cur_state == GAME_STATUS.mypage) { // 首页信息，包含用户信息、资源信息、信件信息
    show_mypage(con);
  } else if (con && cur_state == GAME_STATUS.deck) { // 队伍信息
    show_deck(con);
    show_bungos(con);
  } else if (con && cur_state == GAME_STATUS.start) {
    update_info_start(con);
  } else if (con && cur_state == GAME_STATUS.battle) {
    update_info_battle(con);
  } else if (con && cur_state == GAME_STATUS.result) {
    update_info_result(con);
  } else if (con && cur_state == GAME_STATUS.status) {
    update_info_status(con);
  } else if (con && cur_state == GAME_STATUS.supply) {
    update_info_supply(con);
  } else if (con && cur_state == GAME_STATUS.repair_docks) {
    update_info_repair_docks(con);
  } else if (con && cur_state == GAME_STATUS.repair_force_finish) {
    update_info_repair_force_finish(con);
  } else if (con && cur_state == GAME_STATUS.workspaces) {
    update_info_workspaces(con);
  } else {
    // 其他情况
  }
}

/* 展示首页信息，包含用户信息、资源信息、信件信息 */
function show_mypage(con) {
  // 用户信息
  res_app.name = con.header.name;
  res_app.level = con.header.level;
  res_app.uid = con.header.user_id;
  var ne = parseInt(con.header.next_level_exp) - parseInt(con.header.exp);
  ne = ne > 0 ? ne : 0;
  res_app.next_exp = ne;

  // 资源信息
  res_app.res_ink = con.header.res_ink;
  res_app.res_food = con.header.res_food;
  res_app.item_book = con.header.item_book;
  res_app.item_quick = con.header.item_quick;

  // 信件信息
  var sT = con.letter.settings.selectedTime;
  var sI = con.letter.settings.selectedItem;
  var unit = ['饭团', '墨汁'];
  res_app.selectedTime = con.letter.settings.times[sT];
  res_app.selectedItem = con.letter.settings.items[sI][sT] + unit[sI-1];
  res_app.letter_num = con.letter.check.num;
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

      var ne = parseInt(con.decks[d].units[m].next_level_exp) - parseInt(con.decks[d].units[m].exp);
      ne = ne > 0 ? ne : 0; // 满级经验是负数，统一成0

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
        next_exp: ne,
        status: con.decks[d].units[m].is_repair ? BUNGO_STATUS.repair : (con.decks[d].units[m].is_work ? BUNGO_STATUS.work : BUNGO_STATUS.leisure),
        status_no: -1,
        status_countdown: -1,
        status_show: null
      };
      amem.status_show = bungo_all_statuses[amem.status];
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
    var ne = parseInt(con.units[d].next_level_exp) - parseInt(con.units[d].exp);
    ne = ne > 0 ? ne : 0; // 满级经验是负数
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
      next_exp: ne,
      status: con.units[d].is_repair ? BUNGO_STATUS.repair : (con.units[d].is_work ? BUNGO_STATUS.work : BUNGO_STATUS.leisure),
      status_no: -1,
      status_countdown: -1,
      status_show: null
    };
    amem.status_show = bungo_all_statuses[amem.status];
    bungos_data.push(amem);
  }

  bungo_app.bungos = bungos_data;
}

/* 文豪出阵选择战场 */
// var current_stage = null;
function update_info_start(con) {
  // 重复了，这个函数暂时没有用
}

/* 文豪战斗，更新team数值和文豪列表的数值 */
var current_hexid = 0;
function update_info_battle(con) {
  // 捡到资源
  if (con.category == 2) return;

  // 战斗
  if (con.category == 1) {
    for (var d in con.result.units) {
      update_bungo(con.result.units[d].id, 'hp', con.result.units[d].hp);
    }
  }

  // 如果到了最后一个点，更新log信息
  current_hexid = con.nowHexId;
}

/* 在这里更新bungos_data和team_data */
function update_bungo(id, item, value) {
  // 更新文豪信息
  for (var i = 0; i < bungo_app.bungos.length; i++) {
    if (bungo_app.bungos[i].id == id) {
      bungo_app.bungos[i][item] = value;
      break; // 因为拥有的文豪不会重复
    }
  }
  // 更新队伍信息
  for (var i = 0; i < team_app.teams.length; i++) {
    for (var j = 0; j < team_app.teams[i].members.length; j++) {
      if (team_app.teams[i].members[j].id == id) {
        team_app.teams[i].members[j][item] = value;
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
    update_bungo(con.units[d].id, 'next_exp', parseInt(con.units[d].next_level_exp) - parseInt(con.units[d].exp));
  }

  // update log
  var date = new Date();
  var current_time = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  var alog = {
    no: battle_log_app.nos + 1,
    map: con.stage.mst_chapter_id + '-' + con.stage.id + ':' + current_hexid,
    result: battle_all_results[con.status - 1],
    bungo: con.hasDropUnit ? con.dropUnit.master.name : '无',
    timestamp: current_time
  }
  battle_log_app.logs.push(alog);
  battle_log_app.nos = battle_log_app.nos + 1;
  current_hexid = 0;
}

/* 根据战斗结束时的status更新炼金术师资源信息 */
function update_info_status(con) {
  // update master lv info
  res_app.level = con.level;
  var ne = parseInt(con.next_level_exp) - parseInt(con.exp);
  ne = ne > 0 ? ne : 0;
  res_app.next_exp = ne;
}

/* 根据文豪吃饭更新饭团信息和文豪fp信息 */
function update_info_supply(con) {
  // 更新饭团信息
  res_app.res_food = con.header.res_food;

  // 更新文豪信息
  for (var d in con.units) {
    update_bungo(con.units[d].id, 'fp', con.units[d].fp);
  }
}

/* 根据修复信息更新文豪状态信息 */
function update_info_repair_docks(con) {
  // 更新资源信息
  res_app.res_ink = con.header.res_ink;
  res_app.item_quick = con.header.item_quick;

  // 更新文豪（teams和bungos的状态信息）
  for (var d in con.repair_docks) {
    update_bungo(con.repair_docks[d].unit_id, 'status', BUNGO_STATUS.repair);
    update_bungo(con.repair_docks[d].unit_id, 'status_no', con.repair_docks[d].id);
    update_bungo(con.repair_docks[d].unit_id, 'status_countdown', con.repair_docks[d].repair_sec);
  }
}

/* 使用加速机进行补修时立刻更新信息 */
function update_info_repair_force_finish(con) {
  for (var i = 0; i < bungo_app.bungos.length; i++) {
    if (bungo_app.bungos[i].status_no == con.finish) {
      bungo_app.bungos[i].hp = 100;
      bungo_app.bungos[i].status = BUNGO_STATUS.leisure;
      bungo_app.bungos[i].status_no = -1;
      bungo_app.bungos[i].status_countdown = -1;
      bungo_app.bungos[i].status_show = null;
      break;
    }
  }

  for (var i = 0; i < team_app.teams.length; i++) {
    for (var j = 0; j < team_app.teams[i].members.length; j++) {
      if (team_app.teams[i].members[j].status_no == con.finish) {
        team_app.teams[i].members[j].hp = 100;
        team_app.teams[i].members[j].status = BUNGO_STATUS.leisure;
        team_app.teams[i].members[j].status_no = -1;
        team_app.teams[i].members[j].status_countdown = -1;
        team_app.teams[i].members[j].status_show = null;
        break;
      }
    }
  }
}

/* 根据有碍书潜书信息更新文豪状态信息 */
function update_info_workspaces(con) {
  res_app.res_ink = con.header.res_ink;
  res_app.item_book = con.header.item_book;
  res_app.item_quick = con.header.item_quick;

  for (var d in con.workspaces) {
    if (con.workspaces[d].do_work == 1) {
      update_bungo(con.workspaces[d].worker_unit.id, 'status', BUNGO_STATUS.work);
      update_bungo(con.workspaces[d].worker_unit.id, 'status_countdown', con.workspaces[d].work_sec);
    }
  }
}

function update_info_work_force_finish(con) {
  // TODO update bungo & teams here
}
