# listchooose
下拉列表可以操作选择  
该插件是基于jQuery插件实现的，项目中需要有相应的文件
###### 创建一个chooselist对象
`/*  
  参数1：插入列表的第一个区域  
  参数2：创建列表类型  "hooklist":勾选框列表 "addcutlist"：增添操作框列表
  参数3：初始化列表的参数  每个数组中分别代表键和值
  */`  
  `const tot = new Total(".list_1","hooklist",[['html',false],['css',true],['c++',true],['java',true],['php',true],['c#',true],['c',true]]);`
###### 获得列表对象中存储的值——获取对象中的Map
   const totMap = tot.map;
