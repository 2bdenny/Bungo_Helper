### Bungo Helper
顾名思义，想试试能不能做一个文豪与炼金术师的小助手（类似于凌大大的婶婶忙这样的）。但是因为第一次接触插件编程，各种都不熟悉，所以进度会很慢。

第一次写chrome扩展，工程结构参考的是<a href="http://weibo.com/moelynn">凌大大</a>的婶婶忙，但是婶婶忙太专业了，代码看不懂Orz。。。所以没有直接fork他的工程而是新开了一个。。。但是还是感谢他。。。

### 版本更新说明
- v1.0.0 可以查看队伍信息，可以实时更新侵蚀和降临信息
- v1.0.1
  - 增加地图掉落记录（目前无法导出&保存，地图显示也可能有点奇怪）
  - 增加有魂书潜书记录（也无法导出）
  - 吃饭及时更新饱腹度
  - 完成任务及时更新资源信息
  - 增加状态，可以显示补修和潜书倒计时（有±5秒的误差），使用加速机时，及时更新侵蚀和状态
  - 队伍里不再显示精神，仅在所有文豪界面显示
  - 仅在队伍里显示疲劳度，因为只有在队伍里的时候才是准确的

### TODO
- <del>显示炼金术师资源信息</del> v0.1
  - <del>获取request的url</del>
  - <del>获取response的content</del>
- <del>显示队伍信息</del>
- <del>信件的倒计时功能</del>
- <del>Vue调试，为啥会失败。。</del>
- <del>2017.04.04 显示队伍中所有人的信息、组队时及时更新</del>
- <del>显示疲劳、吃饭值</del>
- <del>2017.04.04 分析战斗数值</del>
  - <del>HP变化及时更新</del>
  - <del>满腹度变化及时更新</del>
  - <del>降临变化及时更新</del>
  - <del>经验变化及时更新</del> v1.0.0
- <del>2017.04.04 进行战斗记录</del>
  - <del>在哪个地图、掉落了谁、获得时间</del>
  - 存储掉落记录
- **疲劳值怎么计算的？**
- <del>2017.04.04 吃饭时数值更新</del>
- <del>2017.04.04 满级经验为负，需要修正</del>
- 2017.04.05
  - <del>修补提醒</del>、开花材料总数、开花统计、内装金币
  - 疲劳了变成红字
  - <del>侵蚀变成耗弱时改变颜色</del>
  - <del>满腹度0最好有提醒</del>
  - 家具、饭团能隔开
  - [bug] 队伍信息和文豪信息两边疲劳度不一样
    - [fixed] 发现只有在队伍中时才能看到正确疲劳度，所以文豪信息界面不再显示疲劳度 2017.04.06
  - 收信提醒
  - 不用加速器就能看到结果
    - 看了下，这个好像没法搞。。。跟刀乱不太一样
- 潜书时丧失提醒
- <del>2017.04.06 使用加速机&吃饭后数值没有变化</del>
- <del>2017.04.06 有魂书&修补信息+时间倒数计时</del>
- <del>2017.04.07 有魂书潜书记录</del>
- <del>2017.04.07 队伍结成的时候会覆盖文豪状态信息</del>
- <del>2017.04.08 队长吃饭信息有时更新有时不更新。。。</del> v1.1.1
