function first_pass(){
	if(s==35){
		dyutj();
		s=0;
	}
	s++;
	diyuyd();
	collision_detection(fanwei*fanwei);
	if(wudi==1){
		wudi_zhen();
	}
}
//敌方鱼添加
function dyutj(){
	var fu=0;
	var baibai=Math.ceil(Math.random()*ai);
	if(baibai>12){
		var diyu=new PIXI.Sprite.fromImage("img/03头左.png");
		var diyu1=new PIXI.Texture.fromImage("img/03头右.png");
		diyu.scale.x=0.7;
		diyu.scale.y=0.7;
	}else if(baibai>7){
		var diyu=new PIXI.Sprite.fromImage("img/01头左.png");
		var diyu1=new PIXI.Texture.fromImage("img/01头右.png");
		diyu.scale.x=0.5;
		diyu.scale.y=0.5;
	}else{
		var diyu=new PIXI.Sprite.fromImage("img/07头左.png");
		var diyu1=new PIXI.Texture.fromImage("img/07头右.png");
		diyu.scale.x=0.29;
		diyu.scale.y=0.29;
	}
	diyu.anchor.set(0.5,0.5);
	diyu.x=xzb();
	diyu.y=Math.round(Math.random()*(590-110)+110);
	if(diyu.x==1){
		diyu.texture=diyu1;
		fu=1;
	}
	dycxy.stage.addChild(diyu);
	enemy_fishList.push(new enemy_fish(diyu,fu));
}
//敌鱼移动
function diyuyd(){
	for(var i=0;i<enemy_fishList.length;i++){
		var diyu=enemy_fishList[i].x;
		var fu=enemy_fishList[i].y;
		if(fu==0){
			diyu.x-=1;
			if(diyu.x<0){
				dycxy.stage.removeChild(diyu);
				enemy_fishList.splice(i,1);
			}
		}else{
			diyu.x+=1;
			if(diyu.x>800){
				dycxy.stage.removeChild(diyu);
				enemy_fishList.splice(i,1);	
			}
		}
	}
}
//碰撞检测实现
function collision_detection(x){
	for(var i=0;i<enemy_fishList.length;i++){
		var fish=enemy_fishList[i].x;
			var sum=(fish.x-meyu.x)*(fish.x-meyu.x)+(fish.y-meyu.y)*(fish.y-meyu.y);
			if(sum<x){
				if(fish.scale.x<meyu.scale.x){
					if(fish.scale.x==0.29){
						score+=5;
					}else if(fish.scale.x==0.5){
						score+=10;
					}else{
						score+=15;
					}
					fenshu1.text=score;
					if(meyu.scale.x>0.7){
						if(fish.scale.x>=0.5){
							ai+=0.3;
							meyu.scale.x+=0.0125;
							meyu.scale.y+=0.0125;
							dycxy.stage.removeChild(fish);
							enemy_fishList.splice(i,1);
							s1+=1;
						}else if(fish.scale.x>=0.3){
							ai+=0.03;
							meyu.scale.x+=0.00125;
							meyu.scale.y+=0.00125;
							dycxy.stage.removeChild(fish);
							enemy_fishList.splice(i,1);
							s1+=0.1;
						}else{
							ai+=0.003;
							meyu.scale.x+=0.000125;
							meyu.scale.y+=0.000125;
							dycxy.stage.removeChild(fish);
							enemy_fishList.splice(i,1);
							s1+=0.01;
						}
					}else if(meyu.scale.x>0.5){
						if(fish.scale.x>=0.3){
							ai+=0.3;
							meyu.scale.x+=0.0125;
							meyu.scale.y+=0.0125;
							dycxy.stage.removeChild(fish);
							enemy_fishList.splice(i,1);
							s1+=1;
						}else{
							ai+=0.03;
							meyu.scale.x+=0.00125;
							meyu.scale.y+=0.00125;
							dycxy.stage.removeChild(fish);
							enemy_fishList.splice(i,1);
							s1+=0.1;
						}
					}else{
						ai+=0.3;
						meyu.scale.x+=0.0125;
						meyu.scale.y+=0.0125;
						dycxy.stage.removeChild(fish);
						enemy_fishList.splice(i,1);
						s1+=1;
					}
					plan_maker(s1*1.05);
				}else{
					if(wudi==0){
						if(ph==0){
							dycxy.stage.removeChild(meyu);
							shibai();
						}else{
							ph--;
							xuetiao_bianhua(ph);
							wudi=1;
						}
					}
					
				}
				if(meyu.scale.x>0.9){
					shengli();
				}
			}
	}
}	

//无敌动画实现
function wudi_zhen(){
	if(wu==1){
		var wo=setTimeout(function(){
			meyu.alpha=1;
			wudi=0;
			wu=0;
		},3000)
	}
	if(wu%5==0){
		meyu.alpha=0.5;
	}
	if(wu%5==3){
		meyu.alpha=1;
	}
	wu++;
	
}

function plan_maker(x){
	let plan1 = new PIXI.Sprite.fromImage("img/进度点.png");
	plan1.anchor.set(0.5,0.5);
	plan1.y=30;
	plan1.x=40+x*4.5;
	dycxy.stage.addChild(plan1);
	plan.push(plan1);
}

//随机生成数
function xzb(){
	var d=Math.ceil(Math.random()*2);
	if(d==1){
		return 1*1;
	}else{
		return 799*1;
	}
}
//数组清空函数定义
function expty(){
	for(var i1=0;i1<plan.length;i1++){
		var pl=plan[i1];
		dycxy.stage.removeChild(pl);
	}
	plan=[];
	for(var i=0;i<enemy_fishList.length;i++){
		var fish=enemy_fishList[i].x;
		dycxy.stage.removeChild(fish);
	}
	enemy_fishList=[];
	for(var i2=0;DfishList.length;i2++){
		var fish=DfishList[i2];
		dycxy.stage.removeChild(fish);
	}
	DfishList=[];
	for(var i2=0;Dfish1List.length;i2++){
		var fish=Dfish1List[i2];
		dycxy.stage.removeChild(fish);
	}
	Dfish1List=[];
	for(var i2=0;Dfish3List.length;i2++){
		var fish=Dfish3List[i2];
		dycxy.stage.removeChild(fish);
	}
	Dfish3List=[];
	for(var i2=0;Dfish4List.length;i2++){
		var fish=Dfish4List[i2];
		dycxy.stage.removeChild(fish);
	}
	Dfish4List=[];
	for(var i2=0;Dfish5List.length;i2++){
		var fish=Dfish5List[i2];
		dycxy.stage.removeChild(fish);
	}
	Dfish5List=[];
	for(var i3=0;i3<Dfish6.length;i3++){
		var fish=Dfish6[i3];
		dycxy.stage.removeChild(fish);
	}
	Dfish6=[];
	for(var i4=0;i4<enemyfish_02_array_left.length;i4++){
		var fish=enemyfish_02_array_left[i4];
		dycxy.stage.removeChild(fish);
	}
	enemyfish_02_array_left=[];
	for(var i4=0;i4<enemyfish_06_array_left.length;i4++){
		var fish=enemyfish_06_array_left[i4];
		dycxy.stage.removeChild(fish);
	}
	enemyfish_06_array_left=[];
	for(var i4=0;i4<enemyfish_09_array_left.length;i4++){
		var fish=enemyfish_09_array_left[i4];
		dycxy.stage.removeChild(fish);
	}
	enemyfish_09_array_left=[];
	for(var i4=0;i4<enemyfish_02_array_right.length;i4++){
		var fish=enemyfish_02_array_right[i4];
		dycxy.stage.removeChild(fish);
	}
	enemyfish_02_array_right=[];
	for(var i4=0;i4<enemyfish_06_array_right.length;i4++){
		var fish=enemyfish_06_array_right[i4];
		dycxy.stage.removeChild(fish);
	}
	enemyfish_06_array_right=[];
	for(var i4=0;i4<enemyfish_09_array_right.length;i4++){
		var fish=enemyfish_09_array_right[i4];
		dycxy.stage.removeChild(fish);
	}
	enemyfish_09_array_right=[];
	for(var i5=0;i5<Dyu1List.length;i5++){
		var fish = Dyu1List[i5];
		dycxy.stage.removeChild(fish);
	}
	Dyu1List=[];
	for(var i5=0;i5<DyuList.length;i5++){
		var fish = DyuList[i5];
		dycxy.stage.removeChild(fish);
	}
	DyuList=[];
	
}