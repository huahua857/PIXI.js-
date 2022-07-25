function third_pass(){
	enemyfish_02();
	enemyfish_02_left_move();
	enemyfish_02_right_move();
	collision();
	collision_1();
	collision_2();
	enemyfish06();
	enemyfish09();
	if(wudi==1){
		wudi_zhen();
	}
}
function enemyfish_02(){
	if(time==Math.round(Math.random()*(150-50)+50)){
		var enemyfish_02_left = new PIXI.Sprite.fromImage("img/02头左.png");
		enemyfish_02_left.anchor.set(0.5,0.5);
		enemyfish_02_left.scale.x = 0.5;
		enemyfish_02_left.scale.y = 0.5;
		enemyfish_02_left.x = Math.round(Math.random()*(600-50)+50);
		enemyfish_02_left.y = Math.round(Math.random()*(800-100)+100);
		enemyfish_02_array_left.push(enemyfish_02_left);
		dycxy.stage.addChild(enemyfish_02_left);
		time = 0;
	}
	if(time_1 == Math.round(Math.random()*(150-50)+50)){
		var enemyfish_02_right = new PIXI.Sprite.fromImage("img/02头右.png");
		enemyfish_02_right.anchor.set(0.5,0.5);
		enemyfish_02_right.scale.x = 0.5;
		enemyfish_02_right.scale.y = 0.5;
		enemyfish_02_right.x = Math.round(Math.random()*(600-50)+50);
		enemyfish_02_right.y = Math.round(Math.random()*(800-100)+100);
		enemyfish_02_array_right.push(enemyfish_02_right);
		dycxy.stage.addChild(enemyfish_02_right);
		time_1 = 0;
	}
	time=Math.round(Math.random()*(150-50)+50);
	time_1=Math.round(Math.random()*(150-50)+50);
}
//敌方鱼左运动
function enemyfish_02_left_move(){
	for(var i = 0 ; i < enemyfish_02_array_left.length ; i++){
		var enemyfish_02_left = enemyfish_02_array_left[i];
		enemyfish_02_left.x -= Math.round(Math.random()*3);			
	}
	for(var j = 0 ; j < enemyfish_06_array_left.length ; j++){
		var enemyfish_06_left = enemyfish_06_array_left[j];
		enemyfish_06_left.x -= Math.round(Math.random()*3);
	}
	for(var k = 0 ; k < enemyfish_09_array_left.length ; k++){
		var enemyfish_09_left = enemyfish_09_array_left[k];
		enemyfish_09_left.x -= Math.round(Math.random()*3);
		}
}
//敌方鱼右运动
function enemyfish_02_right_move(){
	for (var i = 0; i < enemyfish_02_array_right.length; i++) {
		var enemyfish_02_right = enemyfish_02_array_right[i];
		enemyfish_02_right.x += Math.round(Math.random()*3);
	}
	for (var j = 0; j < enemyfish_06_array_right.length; j++) {
		var enemyfish_06_right = enemyfish_06_array_right[j];
		enemyfish_06_right.x += Math.round(Math.random()*3);
	}
	for (var k = 0; k < enemyfish_09_array_right.length; k++) {
		var enemyfish_09_right = enemyfish_09_array_right[k];
		enemyfish_09_right.x += Math.round(Math.random()*3);
	}
}
//友方鱼与敌方02鱼的碰撞
function collision(){
	for(var i = 0 ; i < enemyfish_02_array_left.length ; i++){
		var enemyfish_02_left = enemyfish_02_array_left[i];			
		var pos = (meyu.x - enemyfish_02_left.x)*(meyu.x - enemyfish_02_left.x) + (meyu.y - enemyfish_02_left.y)*(meyu.y - enemyfish_02_left.y);	
		if(pos < 60*60){
			dycxy.stage.removeChild(enemyfish_02_left);
			enemyfish_02_array_left.splice(i,1);
			variate++;
			if(meyu.scale.x>1.5){
				meyu.scale.x+=0.00034;
				meyu.scale.y+=0.00034;
				s1+=0.01;
			}else if(meyu.scale.x>1){
				meyu.scale.x+=0.0034;
				meyu.scale.y+=0.0034;
				s1+=0.1;
			}else{
				meyu.scale.x+=0.034;
				meyu.scale.y+=0.034;
				s1+=1;
			}
			score+=5;
		}
	}
	for(var j = 0 ; j <enemyfish_02_array_right.length ; j++){
		var enemyfish_02_right = enemyfish_02_array_right[j];
		var pos_1 = (meyu.x - enemyfish_02_right.x)*(meyu.x - enemyfish_02_right.x) + (meyu.y - enemyfish_02_right.y)*(meyu.y - enemyfish_02_right.y);
		if(pos_1 < 60*60){
			dycxy.stage.removeChild(enemyfish_02_right);
			enemyfish_02_array_right.splice(j,1);
			variate++;
			if(meyu.scale.x>1.5){
				meyu.scale.x+=0.00034;
				meyu.scale.y+=0.00034;
				s1+=0.01;
			}else if(meyu.scale.x>1){
				meyu.scale.x+=0.0034;
				meyu.scale.y+=0.0034;
				s1+=0.1;
			}else{
				meyu.scale.x+=0.034;
				meyu.scale.y+=0.034;
				s1+=1;
			}
			score+=5;
		}
	}
	fenshu1.text=score;
	plan_maker(s1*1.15);
	if(meyu.scale.x>2.0){
		shengli();
	}
}		
function collision_1(){
	for(var i = 0 ; i < enemyfish_06_array_left.length ; i++){
		var enemyfish_06_left = enemyfish_06_array_left[i];
		var pos = (meyu.x - enemyfish_06_left.x)*(meyu.x - enemyfish_06_left.x) + (meyu.y - enemyfish_06_left.y)*(meyu.y - enemyfish_06_left.y);
		if(pos < 60*60){
			if(meyu.scale.x > enemyfish_06_left.scale.x){
			    dycxy.stage.removeChild(enemyfish_06_left);
			    enemyfish_06_array_left.splice(i,1);
				if(meyu.scale.x>1.5){
					meyu.scale.x+=0.0034;
					meyu.scale.y+=0.0034;
					s1+=0.1;
				}else{
					meyu.scale.x+=0.034;
					meyu.scale.y+=0.034;
					s1+=1;
				}
				score+=10;
			}else if(meyu.scale.x <= enemyfish_06_left.scale.x ){
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
	for(var j = 0 ; j <enemyfish_06_array_right.length ; j++){
		var enemyfish_06_right = enemyfish_06_array_right[j];
		var pos_1 = (meyu.x - enemyfish_06_right.x)*(meyu.x - enemyfish_06_right.x) + (meyu.y - enemyfish_06_right.y)*(meyu.y - enemyfish_06_right.y);
		if(pos_1 < 60*60){
			if(meyu.scale.x > enemyfish_06_right.scale.x){
				dycxy.stage.removeChild(enemyfish_06_right);
				enemyfish_06_array_right.splice(j,1);
				if(meyu.scale.x>1.5){
					meyu.scale.x+=0.0034;
					meyu.scale.y+=0.0034;
					s1+=0.1;
				}else{
					meyu.scale.x+=0.034;
					meyu.scale.y+=0.034;
					s1+=1;
				}
				score+=10;
			}else if(meyu.scale.x <= enemyfish_06_right.scale.x ){
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
	fenshu1.text=score;
	plan_maker(s1*1.15);
	if(meyu.scale.x>2.0){
		shengli();
	}
}			
function collision_2(){
	for(var i = 0 ; i < enemyfish_09_array_left.length ; i++){
		var enemyfish_09_left = enemyfish_09_array_left[i];
		var pos = (meyu.x - enemyfish_09_left.x)*(meyu.x - enemyfish_09_left.x) + (meyu.y - enemyfish_09_left.y)*(meyu.y - enemyfish_09_left.y);
		if(pos < 60*60){
			if(meyu.scale.x > enemyfish_09_left.scale.x){
				dycxy.stage.removeChild(enemyfish_09_left);
			    enemyfish_09_array_left.splice(i,1);
				meyu.scale.x+=0.034;
				meyu.scale.y+=0.034;
				score+=15;
				s1+=1;
			}else if(meyu.scale.x <= enemyfish_09_left.scale.x ){
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
	for(var j = 0 ; j <enemyfish_09_array_right.length ; j++){
		var enemyfish_09_right = enemyfish_09_array_right[j];
		var pos_1 = (meyu.x - enemyfish_09_right.x)*(meyu.x - enemyfish_09_right.x) + (meyu.y - enemyfish_09_right.y)*(meyu.y - enemyfish_09_right.y);
		if(pos_1 < 60*60){
			if(meyu.scale.x > enemyfish_09_right.scale.x){
				dycxy.stage.removeChild(enemyfish_09_right);
				enemyfish_09_array_right.splice(j,1);
				meyu.scale.x+=0.034;
				meyu.scale.y+=0.034;
				score+=15;
				s1+=1;
			}else if(meyu.scale.x <= enemyfish_09_right.scale.x ){
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
	fenshu1.text=score;
		plan_maker(s1*1.15);
	if(meyu.scale.x>2.0){
		shengli();
	}
}			
function enemyfish06(){
	if(variate>=Math.round(Math.random()*(20-10)+10)){
		if(time_2==Math.round(Math.random()*(150-50)+50)){
			var enemyfish_06_left = new PIXI.Sprite.fromImage("img/06头左.png");
			enemyfish_06_left.anchor.set(0.5,0.5);
			enemyfish_06_left.scale.x = 1;
			enemyfish_06_left.scale.y = 1;
			enemyfish_06_left.x = Math.round(Math.random()*(600-50)+50);
			enemyfish_06_left.y = Math.round(Math.random()*(800-100)+100);
			enemyfish_06_array_left.push(enemyfish_06_left);
			dycxy.stage.addChild(enemyfish_06_left);
			time_2 = 0;
			}
			if(time_3 == Math.round(Math.random()*(150-50)+50)){
				var enemyfish_06_right = new PIXI.Sprite.fromImage("img/06头右.png");
				enemyfish_06_right.anchor.set(0.5,0.5);
				enemyfish_06_right.scale.x = 1;
				enemyfish_06_right.scale.y = 1;
				enemyfish_06_right.x = Math.round(Math.random()*(600-50)+50);
				enemyfish_06_right.y = Math.round(Math.random()*(800-100)+100);
				enemyfish_06_array_right.push(enemyfish_06_right);
				dycxy.stage.addChild(enemyfish_06_right);
				time_3 = 0;
			}
	}
	time_2=Math.round(Math.random()*(150-50)+50);
	time_3=Math.round(Math.random()*(150-50)+50);			
}
function enemyfish09(){
	if(variate>=Math.round(Math.random()*(30-20)+20)){
		if(time_4==Math.round(Math.random()*(150-50)+50)){
			var enemyfish_09_left = new PIXI.Sprite.fromImage("img/09头左1.png");
			enemyfish_09_left.anchor.set(0.5,0.5);
			enemyfish_09_left.scale.x = 1.5;
			enemyfish_09_left.scale.y = 1.5;
			enemyfish_09_left.x = Math.round(Math.random()*(600-50)+50);
			enemyfish_09_left.y = Math.round(Math.random()*(800-100)+100);
			enemyfish_09_array_left.push(enemyfish_09_left);
			dycxy.stage.addChild(enemyfish_09_left);
			time_4 = 0;
		}
		if(time_5 == Math.round(Math.random()*(150-50)+50)){
			var enemyfish_09_right = new PIXI.Sprite.fromImage("img/09头右1.png");
			enemyfish_09_right.anchor.set(0.5,0.5);
			enemyfish_09_right.scale.x = 1.5;
			enemyfish_09_right.scale.y = 1.5;
			enemyfish_09_right.x = Math.round(Math.random()*(600-50)+50);
			enemyfish_09_right.y = Math.round(Math.random()*(800-100)+100);
			enemyfish_09_array_right.push(enemyfish_09_right);
			dycxy.stage.addChild(enemyfish_09_right);
			time_5 = 0;
		}
	}
	time_4=Math.round(Math.random()*(150-50)+50);
	time_5=Math.round(Math.random()*(150-50)+50);			
}