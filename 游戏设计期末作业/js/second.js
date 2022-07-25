function second_pass(){
	dengji();
	if(kz_1==30){
		createDyu();
		kz_1=0;
	}
	kz_1++;
	moveDyu();
	eat();
	if(wudi==1){
		wudi_zhen();
	}
}
//随机鱼产生
function dengji(){
	var dengji=Math.floor(Math.random()*ai);
	Dengji=dengji;
	return Dengji;
}
//创建敌方鱼
function createDyu(){
	if(dengji()<6){
		var Dyu=new PIXI.Sprite.fromImage("img/lDyu.png");
		Dyu.scale.x=0.4;  //缩放比例
		Dyu.scale.y=0.4;
	}else if(dengji()<8){
		var Dyu=new PIXI.Sprite.fromImage("img/lDyu1.png");
		Dyu.scale.x=0.7;  //缩放比例
		Dyu.scale.y=0.7;
	}else{
		var Dyu=new PIXI.Sprite.fromImage("img/lDyu2.png");
		Dyu.scale.x=1.0;  //缩放比例
		Dyu.scale.y=1.0;
	}
	Dyu.anchor.set(0.5,0.5);
	Dyu.x=844;
	Dyu.y=Math.random()*(573-50)+50;
	dycxy.stage.addChild(Dyu);
	DyuList.push(Dyu);
}
//移动敌鱼
function moveDyu(){
	//第一个敌鱼移动
	for(var i=0;i<DyuList.length;i++){
		var Dyu=DyuList[i];
		if(Dyu1List[i]==1){
			Dyu.x+=1;
		}else{
			Dyu.x-=1;
		}
		if(Dyu.x==20){
			if(Dyu.scale.x==0.4){
				var Dyu1=new PIXI.Texture.fromImage("img/rDyu.png");
			}else if(Dyu.scale.x==0.7){
				var Dyu1=new PIXI.Texture.fromImage("img/rDyu1.png");
			}else{
				var Dyu1=new PIXI.Texture.fromImage("img/rDyu2.png");
			}
			Dyu.texture=Dyu1;
			Dyu1List[i]=1;
		}
		if(Dyu.x>850){
			dycxy.stage.addChild(Dyu);
			DyuList.splice(i,1); //从数组里删除
			Dyu1List.splice(i,1);
			dycxy.stage.removeChild(Dyu);  //删除图层
		}
	}
}
//吃鱼
function eat(){
	for(var y=0;y<DyuList.length;y++){
		var Dyu=DyuList[y];
		var Chi=(Dyu.x-meyu.x)*(Dyu.x-meyu.x)+(Dyu.y-meyu.y)*(Dyu.y-meyu.y);
		if(Chi<50*(40+ai*8)){
			if(meyu.scale.x>Dyu.scale.x){
				if(Dyu.scale.x==0.4){
					score+=5;
				}else if(Dyu.scale.x==0.7){
					score+=10;
				}else{
					score+=15;
				}
				fenshu1.text=score;
				if(meyu.scale.x>1.0){
					if(Dyu.scale.x==1.0){
						dycxy.stage.removeChild(Dyu);
						DyuList.splice(y,1);
						Dyu1List.splice(y,1);
						ai+=0.2;
						meyu.scale.x+=0.02;
						meyu.scale.y+=0.02;
						s1+=1;
					}else if(Dyu.scale.x==0.7){
						dycxy.stage.removeChild(Dyu);
						DyuList.splice(y,1);
						Dyu1List.splice(y,1);
						ai+=0.02;
						meyu.scale.x+=0.002;
						meyu.scale.y+=0.002;
						s1+=0.1;
					}else{
						dycxy.stage.removeChild(Dyu);
						DyuList.splice(y,1);
						Dyu1List.splice(y,1);
						ai+=0.002;
						meyu.scale.x+=0.0002;
						meyu.scale.y+=0.0002;
						s1+=0.01;
					}
				}else if(meyu.scale.x>=0.7){
					if(Dyu.scale.x==0.7){
						dycxy.stage.removeChild(Dyu);
						DyuList.splice(y,1);
						Dyu1List.splice(y,1);
						ai+=0.2;
						meyu.scale.x+=0.02;
						meyu.scale.y+=0.02;
						s1+=1;
					}else{
						dycxy.stage.removeChild(Dyu);
						DyuList.splice(y,1);
						Dyu1List.splice(y,1);
						ai+=0.02;
						meyu.scale.x+=0.002;
						meyu.scale.y+=0.002;
						s1+=0.1;
					}
				}else{
					dycxy.stage.removeChild(Dyu);
					DyuList.splice(y,1);
					Dyu1List.splice(y,1);
					ai+=0.2;
					meyu.scale.x+=0.02;
					meyu.scale.y+=0.02;
					s1+=1;
				}
				plan_maker(s1*0.95);
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
			if(meyu.scale.x>1.5){
			shengli();
			}
		}
	}
}