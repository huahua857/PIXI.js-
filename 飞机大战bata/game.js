import './js/libs/weapp-adapter'
import * as PIXI from './js/libs/pixi.min'

//显示适配
const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()

//创建 PIXI fjdz 应用
const fjdz = new PIXI.Application({
  width: windowWidth ,
  height: windowHeight ,
  view: canvas
})

//兼容 PIXI 屏幕操作适配
fjdz.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
  point.x = x 
  point.y = y 
}

//创建背景
document.body.appendChild(fjdz.view);

//变量的定义
var di_boss_List=[];          //diboss图片数组
for(var i=1;i<12;i++){
  di_boss_List.push("img/diBOSS/planplay_"+i+".png");
}
var di_boss;                  //敌方boss声明
var xue                       //敌方boss血条声明
var leftgz,rightgz;           //僚机变量声明
var zengjia=0,zengjia1=0;     //僚机增加
var c=0,c1=0,c2=0,boss_yi=1,sui_2=0,bai=0;            //其他变量声明 
var wode=0,a=0;
var dj_sui=Math.floor(Math.random()*(2000-1500)+1500);      
var fen=0;                    //分数
var fen1=0;                   //历史最高分
var isplay=0;                 //游戏开始暂停控制
var difficulty=1;             //难度定义
var diList=[];                //敌方飞机数组
var didanList=[];             //敌方子弹数组
var medanList=[];             //me子弹数组
var daoju                     //道具变量声明

//导入背景图片
let bj=new PIXI.Sprite.fromImage("img/background_1.jpg");
fjdz.stage.addChild(bj);

//导入飞机
var xfj=new PIXI.Sprite.fromImage("img/hero.png");
xfj.x=windowWidth/2;
xfj.y=windowHeight*2/3;
xfj._anchor.set(0.5,0.5);
xfj.scale.x=0.2;
xfj.scale.y=0.2;
fjdz.stage.addChild(xfj);
xfj.visible=false;


//云朵导入
var yun = new PIXI.Sprite.fromImage("img/yun02.png");
yun.anchor.set(0.5,0.5);
yun.scale.x=0.3;
yun.scale.y=0.3;
yun.x=20;
yun.y=150;
fjdz.stage.addChild(yun);
yun.visible=false;

//得分面板
var feel=new PIXI.Text("得分：");
feel.style.fill="white";
feel.y=20;
fjdz.stage.addChild(feel);
feel.visible=false;
var feel1=new PIXI.Text('0');
feel1.x=65;
feel1.y=20;
feel1.style.fill="white";
fjdz.stage.addChild(feel1);
feel1.visible=false;

//添加开始按钮
let start=new PIXI.Sprite.fromImage("img/start.png");
start._anchor.set(0.5,0.5);
start.x=windowWidth/2;
start.y=windowHeight/2;
start.scale.x=0.8;
start.scale.y=0.8;
fjdz.stage.addChild(start);
start.visible=true;

//难度选择按钮添加
var easy=new PIXI.Sprite.fromImage("img/nan_1.png");
easy.anchor.set(0.5,0.5);
easy.scale.x=0.4;
easy.scale.y=0.4;
easy.x=windowWidth/2;
easy.y=windowHeight*2/6;
fjdz.stage.addChild(easy);
easy.visible=false;
var common=new PIXI.Sprite.fromImage("img/nan_2.png");
common.anchor.set(0.5,0.5);
common.scale.x=0.4;
common.scale.y=0.4;
common.x=windowWidth/2;
common.y=windowHeight*3/6;
fjdz.stage.addChild(common);
common.visible=false;
var hard=new PIXI.Sprite.fromImage("img/nan_3.png");
hard.anchor.set(0.5,0.5);
hard.scale.x=0.4;
hard.scale.y=0.4;
hard.x=windowWidth/2;
hard.y=windowHeight*4/6;
fjdz.stage.addChild(hard);
hard.visible=false;

//暂停按钮导入
let zt=new PIXI.Sprite.fromImage("img/暂停_.png");
zt._anchor.set(0.5,0.5);
zt.x=windowWidth-50;
zt.y=90;
zt.scale.x=0.3;
zt.scale.y=0.3;
fjdz.stage.addChild(zt);
zt.visible=false;

//添加继续游戏按钮
let jxyx=new PIXI.Sprite.fromImage("img/juxuyouxi.png");
jxyx._anchor.set(0.5,0.5);
jxyx.x=windowWidth/2;
jxyx.y=windowHeight/2;
fjdz.stage.addChild(jxyx);
jxyx.visible=false;

/*
 *	飞机大战部件控制部分，控制逻辑
 */

//me飞机移动    拖拽事件
bj.interactive=true;
bj.on("touchmove",gensui);
function gensui(event){
  if(isplay==1){
    var wo=event.data.getLocalPosition(fjdz.stage);
    xfj.x=wo.x;
    xfj.y=wo.y;
  }
}

//开始按钮功能实现
start.interactive=true;
start.on("touchstart",function(){
  start.visible=false;
  easy.visible=true;
  common.visible=true;
  hard.visible=true;
});

//难度选择实现
easy.interactive=true;
easy.on("touchstart",function(){
  difficulty=0.5;
  count_down();
});
common.interactive=true;
common.on("touchstart",function(){
  difficulty=1;
  count_down();
});
hard.interactive=true;
hard.on("touchstart",function(){
  difficulty=1.5;
  count_down();
});

//倒计时部分实现
function count_down(){
  //难度按钮消失
  easy.visible=false;
  common.visible=false;
  hard.visible=false;
  //设置倒计时
  var timeList = ["img/tame_3.png","img/tame_2.png","img/tame_1.png","img/tame_0.png"];
  //将纹理集合的所有图片转化为逐帧动画
  var times = new PIXI.extras.AnimatedSprite.fromImages(timeList);
  fjdz.stage.addChild(times);
  times.anchor.set(0.5,0.5);
  times.x =　windowWidth/2;
  times.y = windowHeight/2;
  times.scale.x = 0.5;
  times.scale.y = 0.5;
  //loop  false  true;
  times.loop = false;
  //设置动画的播放的速度
  times.animationSpeed = 0.05;
  times.play();
  //动画播放完成
  times.onComplete = function(){
    //移出动画
    fjdz.stage.removeChild(times);
    sui();
  }
}
function sui(){
  dj_sui=Math.floor(Math.random()*(2400-1500)+1500);   
  fjdz.stage.addChild(xfj);
  var bgMusic = wx.createInnerAudioContext();       //全局背景音乐
  bgMusic.src = "audio/bgm.mp3";
  bgMusic.loop = true;
  bgMusic.play();
  yun.visible=true;
  xfj.visible=true;
  zt.visible=true;
  feel.visible=true;
  feel1.visible=true;
  isplay=1;
}
//暂停按钮功能实现
zt.interactive=true;
zt.on("touchstart",function(){
  jxyx.visible=true;
  zt.visible=false;
  isplay=0;
});

//继续游戏功能实现
jxyx.interactive=true;
jxyx.on("touchstart",function(){
  jxyx.visible=false;
  zt.visible=true;
  isplay=1;
});

//帧频动画
fjdz.ticker.add(function(){
  if(isplay==1){
    zidanyx();                 //me子弹生成调用
    mezidan_move();            //me子弹移动调用
   if(c1==Math.floor(70/difficulty)){     //敌机生成频率控制
     ddjsc();                  //敌机生成调用
     c1=0;
   }
   c1++;
   diji_move();
   if(c2==Math.floor(80/difficulty)){     //敌机子弹生成频率控制
     dizidan();                //敌机子弹生成调用
     c2=0;
   }
   c2++;
   dizidan_move();
   if(zengjia==0&&sui_2==dj_sui&&zengjia1==0){
    yun_plan();
    wode=1;
    sui_2=0;
   }
   sui_2++;
   if(wode==1){
    yun_move();
    crash_5();
    crash_6();
   }
  
    if(zengjia==1){           //增加僚机的函数
      if(a==0){
        liaoji();
        a=1;
      }
      //函数编写处
      zengjia1=1;
      zengjia=0;
    }
    if(zengjia1==1){
      fjyd();                 //僚机跟随调用
    }
    if(difficulty==0.5){
      crash_1();
    }
    crash_2();
    crash_3();
    crash_4();
    if(bai == 1){
      yun.x-=0.2;
    }else if(bai == 0){
      yun.x+=0.2;
    }
    if(Math.floor(yun.x) == Math.floor(windowWidth)){
      bai=1;
    } else if(Math.floor(yun.x) == Math.floor(windowWidth/20)){
      bai = 0;
    }
    if(fen==35&&boss_yi==1&&(difficulty==1||difficulty==1.5)){
      boss_shengcheng();
      boss_yi=0;
    }
  }
});

//敌机BOSS添加
function boss_shengcheng(){
  di_boss=new PIXI.extras.AnimatedSprite.fromImages(di_boss_List);
  di_boss.anchor.set(0.5,0.5);
  di_boss.x=windowWidth/2;
  di_boss.y=windowHeight/4;
  fjdz.stage.addChild(di_boss);
  xue=new PIXI.Sprite.fromImage("img/4.png");
  xue.anchor.set(0.5,0.5);
  xue.scale.x=0.1;
  xue.scale.y=0.1;
  xue.x=di_boss.x;
  xue.y=di_boss.y-40;
  fjdz.stage.addChild(xue);
  di_boss.animationSpeed=0.2;
  di_boss.loop = true;
  di_boss.play();
}

//云朵道具 增加僚机 如果有不执行
function yun_plan(){
  daoju = new PIXI.Sprite.fromImage("img/daoju.png");
  daoju.anchor.set(0.5,0.5);
  daoju.x=yun.x;
  daoju.y=yun.y;
  daoju.scale.x=0.5;  //缩放比例
  daoju.scale.y=0.5;
  fjdz.stage.addChild(daoju);
}

//云道具移动
function yun_move(){
  daoju.y+=0.5;
  daoju.rotation+=0.1;
  if(daoju.y>windowHeight){
    fjdz.stage.removeChild(daoju);
    wode=0;
  }

}

//自己子弹生成
function zidanyx(){
  if(c==Math.floor(60*difficulty)){							//子弹生成频率控制，当前为25帧
    
      //飞机子弹导入
      let zidan=new PIXI.Sprite.fromImage("img/zidan_zhu.png");
      zidan.anchor.set(0.5,0.5);
      zidan.scale.x=2;
      zidan.scale.y=2;
      zidan.x=xfj.x;
      zidan.y=xfj.y-50;
      fjdz.stage.addChild(zidan);
      medanList.push(zidan);
      if(zengjia1==1){
        //左僚机子弹导入
        let zidan_1=new PIXI.Sprite.fromImage("img/zidan_fu.png");
        zidan_1.anchor.set(0.5,0.5);
        zidan_1.x=leftgz.x;
       zidan_1.y=leftgz.y;
        fjdz.stage.addChild(zidan_1);
        medanList.push(zidan_1);
        //右僚机子弹导入
        let zidan_2=new PIXI.Sprite.fromImage("img/zidan_fu.png");
        zidan_2.anchor.set(0.5,0.5);
        zidan_2.x=rightgz.x;
        zidan_2.y=rightgz.y;
        fjdz.stage.addChild(zidan_2);
        medanList.push(zidan_2); 
      }
      c=0;
  }
  c++;	
}

//自己子弹控制
function mezidan_move(){
  for(var i=0;i<medanList.length;i++){
    var zidan=medanList[i];
    zidan.y-=3;
    if(zidan.y<0){
      fjdz.stage.removeChild(zidan);
      medanList.splice(i,1);
    }
  }
}

//敌机生成函数
function ddjsc(){
  var dj=new PIXI.Sprite.fromImage("img/enemy.png");
  dj.scale.x=0.3;
  dj.scale.y=0.3;
  dj.anchor.set(0.5,0.5);
  dj.x=Math.round(Math.random()*(windowWidth-50)+50);
  dj.y=50;
  fjdz.stage.addChild(dj);
  diList.push(dj);
}

//敌机移动
function diji_move(){
  for(var i3=0;i3<diList.length;i3++){
    var dj=diList[i3];
    dj.y+=1.5*difficulty;
    if(dj.y>windowHeight){
      fjdz.stage.removeChild(dj);
      diList.splice(i3,1);
    }
  }
}

//敌机子弹添加
function dizidan(){
  for(var i1=0;i1<diList.length;i1++){
    var dj=diList[i1];
    let hd=new PIXI.Sprite.fromImage("img/原子弹.png");
    hd.anchor.set(0.5,0.5);
    hd.scale.x=0.2;
    hd.scale.y=0.2;
    hd.x=dj.x;
    hd.y=dj.y+20;
    fjdz.stage.addChild(hd);
    didanList.push(hd);
  }
}

//敌机子弹移动
function dizidan_move(){
  for(var i4=0;i4<didanList.length;i4++){
    var dan=didanList[i4];
    dan.y+=2.5*difficulty;
    if(dan.y>windowHeight){
      fjdz.stage.removeChild(dan);
      didanList.splice(i4,1);
    }
  }
}

//僚机增加函数
function liaoji(){
  leftgz=new PIXI.Sprite.fromImage("img/飞机素材1.png");
  leftgz.anchor.set(0.5,0.5);
  leftgz.x=xfj.x-60;
  leftgz.y=xfj.y+20;
  leftgz.scale.x=0.5;
  leftgz.scale.y=0.5;
  fjdz.stage.addChild(leftgz);
  rightgz=new PIXI.Sprite.fromImage("img/飞机素材1.png");
  rightgz.anchor.set(0.5,0.5);
  rightgz.x=xfj.x+60;
  rightgz.y=xfj.y+20;
  rightgz.scale.x=0.5;
  rightgz.scale.y=0.5;
  fjdz.stage.addChild(rightgz);
}

//飞机僚机跟随
function fjyd(){
  leftgz.x=xfj.x-60;	//左僚机的跟随实现
  leftgz.y=xfj.y+20;	
  rightgz.x=xfj.x+60;	//右僚机的跟随实现
  rightgz.y=xfj.y+20;
}

//碰撞检测1 子弹和子弹碰撞
function crash_1(){
  for(var j1=0;j1<didanList.length;j1++){
    var dan1=didanList[j1];
    for(var j2=0;j2<medanList.length;j2++){
      var dan2=medanList[j2];
      if(detection(dan1,dan2,30)){
        blast(dan1);
        fjdz.stage.removeChild(dan1);
        didanList.splice(j1,1);
        fjdz.stage.removeChild(dan2);
        medanList.splice(j2,1);
      }
    }
  }
}

//碰撞检测2 子弹和敌机碰撞
function crash_2(){
  for(var i1=0;i1<diList.length;i1++){
    var di=diList[i1];
    for(var j1=0;j1<medanList.length;j1++){
      var dan=medanList[j1];
      if(detection(di,dan,50)){
        blast(dan);
        fjdz.stage.removeChild(di);
        diList.splice(i1,1);
        fjdz.stage.removeChild(dan);
        medanList.splice(j1,1);
        fen++;
        feel1.text=fen;
      }
    }
  }
}

//碰撞检测3 敌机子弹与me飞机的碰撞
function crash_3(){
  for(var i6=0;i6<didanList.length;i6++){
    var dan9=didanList[i6];
    if(detection(xfj,dan9,50)){
      blast(xfj);
      isplay=0;
      shibai();
      fjdz.stage.removeChild(xfj);
      //失败界面调用
    }
  }
}

//碰撞检测4 敌机和me飞机的碰撞
function crash_4(){
  for(var i5=0;i5<diList.length;i5++){
    var dj=diList[i5];
    if(detection(dj,xfj,60)){
      blast(xfj);
      shibai();
      isplay=0;
      fjdz.stage.removeChild(xfj);
      //失败界面调用
    }
  }
}

//碰撞检测5 自己拾取道具
function crash_5(){
  if(detection(daoju,xfj,60)){
    zengjia=1;
    fjdz.stage.removeChild(daoju);
  }
}

//碰撞检测6 敌机打掉道具实现
function crash_6(){
  for(var i=0;i<didanList.length;i++){
    if(detection(didanList[i],daoju,50)){
      fjdz.stage.removeChild(daoju);
      fjdz.stage.removeChild(didanList[i]);
      didanList.splice(i,1);
      wode=0;
    }
  }
}

//爆炸效果函数定义
function blast(zhi){
  var baozu=[];
  baozu.push("img/bao/bao01.png");
  baozu.push("img/bao/bao02.png");
  baozu.push("img/bao/bao03.png");
  baozu.push("img/bao/bao04.png");
  baozu.push("img/bao/bao05.png");
  baozu.push("img/bao/bao06.png");
  baozu.push("img/bao/bao07.png");
  baozu.push("img/bao/bao07.png");
  let wc1 =PIXI.extras.AnimatedSprite.fromImages(baozu);
  wc1.x=zhi.x;
  wc1.y=zhi.y;
  wc1.anchor.set(0.5,0.5);
  fjdz.stage.addChild(wc1);
  wc1.animationSpeed=0.2;
  var www=setTimeout(wow,500);
  function wow(){
    fjdz.stage.removeChild(wc1);
  }
  wc1.loop = false;
  wc1.play();
  var misc=wx.createInnerAudioContext();      //爆炸音频
  misc.src="audio/boom.mp3";
  misc.loop=false;
  misc.play();
}

//碰撞检测判断
function detection(ad,ap,x){        //传值：物体1，物体2，碰撞检测大小
  var sum=(ad.x-ap.x)*(ad.x-ap.x)+(ad.y-ap.y)*(ad.y-ap.y);
  return (sum<x*x)?true:false;
}

//失败功能函数定义
function shibai(){
  fjdz.stage.removeChild(leftgz);
  fjdz.stage.removeChild(rightgz);
  fjdz.stage.removeChild(xue);
  fjdz.stage.removeChild(di_boss);
  yun.visible=false;
  feel.visible=false;
  feel1.visible=false;
  for(var i=0;i<diList.length;i++){
    fjdz.stage.removeChild(diList[i]);
  }
  diList=[];
  for(var i=0;i<didanList.length;i++){
    fjdz.stage.removeChild(didanList[i]);
  }
  didanList=[];
  for(var i=0;i<medanList.length;i++){
    fjdz.stage.removeChild(medanList[i]);
  }
  medanList=[];
  zengjia=0;
  zengjia1=0;
  //历史最高分
  if(fen>fen1){
    fen1=fen;
  }
  var fenfenfen=new PIXI.Text("历史最高分："+fen1);
  fenfenfen.anchor.set(0.5,0.5);
  fenfenfen.y=windowHeight*1/3;
  fenfenfen.x=windowWidth/2;
  fjdz.stage.addChild(fenfenfen);
  //重新开始按键定义和时间添加
  var cxks=new PIXI.Sprite.fromImage("img/重新开始.png");
  cxks.anchor.set(0.5,0.5);
  cxks.scale.x=1.2;
  cxks.scale.y=1.2;
  cxks.x=windowWidth/2;
  cxks.y=windowHeight*2/3;
  fjdz.stage.addChild(cxks);
  cxks.interactive=true;
  cxks.on("touchstart",function(){
    fjdz.stage.removeChild(cxks);
    fjdz.stage.removeChild(fenfenfen);
    easy.visible=true;
    common.visible=true;
    hard.visible=true;
    fen=0;
    boss_yi=1;
    feel1.text=fen;
    yun.x=30;
  });
}