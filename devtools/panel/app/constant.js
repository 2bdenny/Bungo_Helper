/* 所有的常量保存在这里 */

// 信件到达周期，时间单位是秒
var letter_all_times = [ 1800, 3600, 10800, 21600, 43200 ];

// 精神状况
var master_all_mentals = [ '安定', '丫丫安定', '普通', '丫丫不安定', '不安定' ];

// 武器
var master_all_categories = [ '刃', '弓', '铳', '鞭' ];

// 所有战斗结果
var battle_all_results = [ '优', '良', '可', '不' ];

// 文豪现在在干啥
var bungo_all_statuses = [ '', '潜书', '补修' ];
var BUNGO_STATUS = {
  leisure: 0,
  work: 1,
  repair: 2
};

// 文豪的hp状态
var bungo_hp_statuses = {
  weak: 20,
  lost: 10
};

// 文豪的肚子状态
var bungo_fp_statuses = {
  full: 100
};

/* all game status */
// CURRENT MAX 16
// 这里主要是为了方便，数字可以随便改，只要没重复就行
var GAME_STATUS = {
  mypage: 1,      // 图书馆
  workspaces: 2,  // 有魂书界面
  work: 3,
  work_finish: 4, // 有魂书自然结束
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
  supply: 18,    // 吃饭
  mission: 19,   // 任务完成时更新资源
  mission_one: 20, // 专门根据任务奖励内是否有"内装金貨"更新res_app（后续其他奖励了//TODO）
  furniture: 21,  // 金币
  flower_one: 22  // 一个文豪开花了
};

// 以下信息跟开花相关
// 10种材料的列表
var material_names = [ '文魂(小)', '文魂(中)', '文魂(大)', '想魂(小)', '想魂(中)', '想魂(大)', '語魂(小)', '語魂(中)', '語魂(大)', '魂ノ歯車' ];
// road-map，按照 '刃', '弓', '铳', '鞭' 的顺序排列
var bungo_roadmaps = [
  {
    // "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1, 1]},
    // "2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [2, 19]},
    // "3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [2, 4]},
    // "4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3, 20]},
    // "5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [3, 5]},
    // "6": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [4, 19]},
    // "7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [4, 8]},
    // "8": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [5, 20]},
    // "9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [5, 9]},
    // "10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [6, 19]},
    // "11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [6, 12]},
    // "12": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [7, 17]},
    // "13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [7, 20]},
    // "14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [7, 16]},
    // "15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [8, 19]},
    // "16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [8, 20]},
    // "17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [8, 18]},
    // "18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [9, 20]},
    // "19": {"level": 35,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [9, 19]},
    // "20": {"level": 35,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [10, 20]}
    "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1, 1]},
    "2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [2, 3]},
    "3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [2, 4]},
    "4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3, 4]},
    "5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [5, 5]},
    "6": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [6, 10]},
    "7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [6, 8]},
    "8": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [7, 11]},
    "9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [7, 9]},
    "10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [8, 10]},
    "11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [12, 12]},
    "12": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [13, 15]},
    "13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [9, 11]},
    "14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [13, 16]},
    "15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [14, 16]},
    "16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [14, 17]},
    "17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [18, 18]},
    "18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [15, 17]},
    "19": {"level": 35,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [19, 19]},
    "20": {"level": 35,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [20, 20]}
  },
  {
		// "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1, 1]},
		// "2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [2, 2]},
		// "3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3, 4]},
		// "4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3, 20]},
		// "5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [4, 7]},
		// "6": {"level": 0,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [4,19]},
		// "7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [5,9]},
		// "8": {"level": 0,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [5,20]},
		// "9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [5,20]},
		// "10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [6,10]},
		// "11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [7,12]},
		// "12": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [8,18]},
		// "13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [7,20]},
		// "14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [8,16]},
		// "15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [9,19]},
		// "16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [9,19]},
		// "17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [10,20]},
		// "18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [10,20]},
		// "19": {"level": 20,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [9,19]},
		// "20": {"level": 20,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [10,20]}
    "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1, 1]},
		"2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [2, 2]},
		"3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3, 4]},
		"4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3, 6]},
		"5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [7, 7]},
		"6": {"level": 0,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [4,5]},
		"7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [8,9]},
		"8": {"level": 0,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [5,6]},
		"9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [8,11]},
		"10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [9,10]},
		"11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [12,12]},
		"12": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [13,17]},
		"13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [10,11]},
		"14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [13,16]},
		"15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [14,18]},
		"16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [14,19]},
		"17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [20,20]},
		"18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [15,19]},
		"19": {"level": 20,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [14,18]},
		"20": {"level": 20,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [15,19]}
	},
  {
		// "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1,1]},
		// "2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [3,19]},
		// "3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [4,20]},
		// "4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [2,2]},
		// "5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [3,5]},
		// "6": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [4,19]},
		// "7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [4,8]},
		// "8": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [5,20]},
		// "9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [5,9]},
		// "10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [6,19]},
		// "11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [6,12]},
		// "12": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [7,15]},
		// "13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [7,20]},
		// "14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [9,19]},
		// "15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [8,16]},
		// "16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [7,19]},
		// "17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [10,20]},
		// "18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [8,20]},
		// "19": {"level": 20,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [9,19]},
		// "20": {"level": 20,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [10,20]}
    "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1,1]},
		"2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [3,3]},
		"3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [4,4]},
		"4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [2,2]},
		"5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [5,5]},
		"6": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [6,10]},
		"7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [6,8]},
		"8": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [7,11]},
		"9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [7,9]},
		"10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [8,10]},
		"11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [12,12]},
		"12": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [13,15]},
		"13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [9,11]},
		"14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [15,19]},
		"15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [14,16]},
		"16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [13,18]},
		"17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [20,20]},
		"18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [14,19]},
		"19": {"level": 20,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [15,18]},
		"20": {"level": 20,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [16,19]}
	},
  {
		// "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1,1]},
		// "2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [2,19]},
		// "3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3,20]},
		// "4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [2,4]},
		// "5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [3,6]},
		// "6": {"level": 0,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [3,20]},
		// "7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [5,10]},
		// "8": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [4,7]},
		// "9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [5,19]},
		// "10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [6,19]},
		// "11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [6,13]},
		// "12": {"level": 8,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [7,20]},
		// "13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [6,20]},
		// "14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [8,15]},
		// "15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [7,14]},
		// "16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [9,19]},
		// "17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [9,18]},
		// "18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [10,20]},
		// "19": {"level": 35,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [10,20]},
		// "20": {"level": 35,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [10,20]}
    "1": {"level": 0,"materials": [{"num": 5,"id": 1}],"step": [1,1]},
		"2": {"level": 0,"materials": [{"num": 10,"id": 7}],"step": [2,4]},
		"3": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [3,5]},
		"4": {"level": 0,"materials": [{"num": 10,"id": 4}],"step": [2,4]},
		"5": {"level": 8,"materials": [{"num": 40,"id": 7}, {"num": 4,"id": 8}, {"num": 1,"id": 10}],"step": [6,6]},
		"6": {"level": 0,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [3,5]},
		"7": {"level": 8,"materials": [{"num": 200,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 1,"id": 10}],"step": [8,10]},
		"8": {"level": 8,"materials": [{"num": 120,"id": 4}, {"num": 10,"id": 5}],"step": [7,7]},
		"9": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}, {"num": 1,"id": 9}],"step": [8,11]},
		"10": {"level": 8,"materials": [{"num": 200,"id": 7}, {"num": 20,"id": 8}],"step": [9,11]},
		"11": {"level": 20,"materials": [{"num": 400,"id": 1}, {"num": 40,"id": 2}, {"num": 2,"id": 3}, {"num": 10,"id": 10}],"step": [13,13]},
		"12": {"level": 8,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [10,12]},
		"13": {"level": 8,"materials": [{"num": 100,"id": 1}, {"num": 20,"id": 2}, {"num": 1,"id": 3}, {"num": 10,"id": 10}],"step": [9,12]},
		"14": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [15,15]},
		"15": {"level": 20,"materials": [{"num": 400,"id": 4}, {"num": 40,"id": 5}, {"num": 2,"id": 6}],"step": [14,14]},
		"16": {"level": 20,"materials": [{"num": 800,"id": 7}, {"num": 80,"id": 8}, {"num": 1,"id": 9}],"step": [16,16]},
		"17": {"level": 35,"materials": [{"num": 2000,"id": 4}, {"num": 200,"id": 5}, {"num": 4,"id": 6}, {"num": 10,"id": 10}],"step": [18,18]},
		"18": {"level": 20,"materials": [{"num": 1000,"id": 1}, {"num": 100,"id": 2}, {"num": 10,"id": 3}, {"num": 10,"id": 10}],"step": [17,17]},
		"19": {"level": 35,"materials": [{"num": 2000,"id": 7}, {"num": 200,"id": 8}, {"num": 5,"id": 9}, {"num": 10,"id": 10}],"step": [19,20]},
		"20": {"level": 35,"materials": [{"num": 2000,"id": 1}, {"num": 200,"id": 2}, {"num": 10,"id": 3}, {"num": 20,"id": 10}],"step": [19,20]}
	}
];
