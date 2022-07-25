 function animate(){
	cerateDfish();
	moveDfish();
	eat_1(60*60);
	createDfish1();
	moveDfish1();
	if(wudi==1){
		wudi_zhen();
	}
}
function cerateDfish(){
	if(wangfei==kz){
		var Dfish=new PIXI.Sprite.fromImage("img/moon.png");
		Dfish.anchor.set(0.5,0.5);
		Dfish.scale.x=0.29;
		Dfish.scale.y=0.29;
		Dfish.x=Math.random()*(50-1)+1;
		Dfish.y=Math.random()*(500-100)+100;
		dycxy.stage.addChild(Dfish);
		DfishList.push(Dfish);
		wangfei =0;
	}
	wangfei++;
	if(ganyu==kz1){
			var Dfish3=new PIXI.Sprite.fromImage("img/sun.png");
			Dfish3.anchor.set(0.5,0.5);
			Dfish3.scale.x=0.5;
			Dfish3.scale.y=0.5;
			Dfish3.x=Math.random()*(50-1)+1;
			Dfish3.y=Math.random()*(500-100)+100;
			dycxy.stage.addChild(Dfish3);
			DfishList.push(Dfish3);
			ganyu =0;
	}
	ganyu++;
	if(mulan==kz3){
		var Dfish5=new PIXI.Sprite.fromImage("img/pluto.png");
		Dfish5.anchor.set(0.5,0.5);
		Dfish5.scale.x=0.7;
		Dfish5.scale.y=0.7;
		Dfish5.x=Math.random()*(50-1)+1;
		Dfish5.y=Math.random()*(500-100)+100;
		dycxy.stage.addChild(Dfish5);
		DfishList.push(Dfish5);
		mulan =0;
	}
	mulan++;
}
function createDfish1(){
	if(Q==kz){
		var Dfish1=new PIXI.Sprite.fromImage("img/moon.png");
		Dfish1.anchor.set(0.5,0.5);
		Dfish1.scale.x=0.29;
		Dfish1.scale.y=0.29;
		Dfish1.x=850;
		Dfish1.y=Math.random()*(500-100)+100;
		dycxy.stage.addChild(Dfish1);
		Dfish1List.push(Dfish1);
		Q=0
	}
	Q++;
	if(M==kz1){
		var Dfish4=new PIXI.Sprite.fromImage("img/sun.png")
		Dfish4.anchor.set(0.5,0.5);
		Dfish4.scale.x=0.5;
		Dfish4.scale.y=0.5;
		Dfish4.x=850;
		Dfish4.y=Math.random()*(500-100)+100;
		dycxy.stage.addChild(Dfish4);
		Dfish1List.push(Dfish4);
		M=0;
	}
	M++;
	if(N==kz3){
		var Dfish6=new PIXI.Sprite.fromImage("img/pluto.png")
		Dfish6.anchor.set(0.5,0.5);
		Dfish6.scale.x=0.7;
		Dfish6.scale.y=0.7;
		Dfish6.x=850;
		Dfish6.y=Math.random()*(500-100)+100;
		dycxy.stage.addChild(Dfish6);
		Dfish1List.push(Dfish6);
		N=0;
	}
	N++;
}
// 左moveDfish
function moveDfish(){
	for(var i=DfishList.length-1;i>=0;i--){
		var Dfish=DfishList[i];
		Dfish.x+=1;
		if(Dfish.x>800){
			dycxy.stage.removeChild(Dfish);
			DfishList.splice(i,1);
		}
	}
}
// 右moveDfish1
function moveDfish1(){
	for(var i=Dfish1List.length-1;i>0;i--){
		var Dfish1=Dfish1List[i];
		Dfish1.x-=1;
		if(Dfish1.x<10){
			dycxy.stage.removeChild(Dfish1);
			Dfish1List.splice(i,1);
		}
	}  
}
// pengzhuang
var ji=0;var ji1=0;
function eat_1(x){
	for(var i=0;i<DfishList.length;i++){
		var fish=DfishList[i];
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
						DfishList.splice(i,1);
						s1+=1;
					}else if(fish.scale.x>=0.3){
						ai+=0.03;
						meyu.scale.x+=0.00125;
						meyu.scale.y+=0.00125;
						dycxy.stage.removeChild(fish);
						DfishList.splice(i,1);
						s1+=0.1;
					}else{
						ai+=0.003;
						meyu.scale.x+=0.000125;
						meyu.scale.y+=0.000125;
						dycxy.stage.removeChild(fish);
						DfishList.splice(i,1);
						s1+=0.01;
					}
				}else if(meyu.scale.x>0.5){
					if(fish.scale.x>=0.3){
						ai+=0.3;
						meyu.scale.x+=0.0125;
						meyu.scale.y+=0.0125;
						dycxy.stage.removeChild(fish);
						DfishList.splice(i,1);
						s1+=1;
					}else{
						ai+=0.03;
						meyu.scale.x+=0.00125;
						meyu.scale.y+=0.00125;
						dycxy.stage.removeChild(fish);
						DfishList.splice(i,1);
						s1+=0.1;
					}
				}else{
					ai+=0.3;
					meyu.scale.x+=0.0125;
					meyu.scale.y+=0.0125;
					dycxy.stage.removeChild(fish);
					DfishList.splice(i,1);
					s1+=1;
				}
				plan_maker(s1);
				score+=1;
				ji++;
				fenshu1.text=score;
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
	}
	for(var j=0;j<Dfish1List.length;j++){
		var fish1=Dfish1List[j];
		var sum=(fish1.x-meyu.x)*(fish1.x-meyu.x)+(fish1.y-meyu.y)*(fish1.y-meyu.y);
		if(sum<x){
			if(fish1.scale.x<meyu.scale.x){
				if(fish1.scale.x==0.29){
					score+=5;
				}else if(fish1.scale.x==0.5){
					score+=10;
				}else{
					score+=15;
				}
				fenshu1.text=score;
				if(meyu.scale.x>0.7){
					if(fish1.scale.x>=0.5){
						ai+=0.3;
						meyu.scale.x+=0.0125;
						meyu.scale.y+=0.0125;
						dycxy.stage.removeChild(fish1);
						Dfish1List.splice(j,1);
						s1+=1;
					}else if(fish1.scale.x>=0.3){
						ai+=0.03;
						meyu.scale.x+=0.00125;
						meyu.scale.y+=0.00125;
						dycxy.stage.removeChild(fish1);
						Dfish1List.splice(j,1);
						s1+=0.1;
					}else{
						ai+=0.003;
						meyu.scale.x+=0.000125;
						meyu.scale.y+=0.000125;
						dycxy.stage.removeChild(fish1);
						Dfish1List.splice(j,1);
						s1+=0.01;
					}
				}else if(meyu.scale.x>0.5){
					if(fish1.scale.x>=0.3){
						ai+=0.3;
						meyu.scale.x+=0.0125;
						meyu.scale.y+=0.0125;
						dycxy.stage.removeChild(fish1);
						Dfish1List.splice(j,1);
						s1+=1;
					}else{
						ai+=0.03;
						meyu.scale.x+=0.00125;
						meyu.scale.y+=0.00125;
						dycxy.stage.removeChild(fish1);
						Dfish1List.splice(j,1);
						s1+=0.1;
					}
				}else{
					ai+=0.3;
					meyu.scale.x+=0.0125;
					meyu.scale.y+=0.0125;
					dycxy.stage.removeChild(fish1);
					Dfish1List.splice(j,1);
					s1+=1;
				}
				plan_maker(s1*1.1);
				ji1++;
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
		 }
	}
	if(ji>=100||ji1>=100){
		kz=80;
		kz1=300;
		kz3=800;
		creatDfish1();
	}
	}
	s=s+1;
	if(meyu.scale.x>0.9){
		shengli();
	}
}