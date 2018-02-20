class Animal{
	
	constructor(x, y, hunger, speed, world){
		this.hunger = hunger;
		this.minHunger = 50;
		this.x = x;
		this.y = y;
		this.targetX = 0;
		this.targetY = 0;
		this.speed = 1;
		this.error = 0;
		this.color = 'brown';
		this.world = world;
		this.moving = false;
	}


	generateIdleTarget(){
		let done = false;
		while (!done){
			let x = random(0, this.world.width);
			let y = random(0, this.world.height);
			if(this.world.getTerrainType(x, y).freeSpace){
				done = true;
			}
			this.targetX = x;
			this.targetY = y;
		}
	}

	makeDescision(x){
		if(Math.floor(random(0, x)) == 1){
			return true;
		}
		return false;
	}

	idle(){
		
		if(this.moving == true){
			console.log('GOGOO');
			this.walkTo(this.targetX, this.targetY);
		}

		if(this.makeDescision(this.descisionRate) && this.moving == false){
			this.generateIdleTarget();
			this.moving = true;
			console.log(this.targetY);
		}
	}

	move(){
		if(this.hunger < this.minHunger){
			this.searchFood();
		}else{
			this.idle()
		}
	}

	walkTo(x, y){
		let targetX = Math.sign(x - this.x);
		let targetY = Math.sign(y - this.y);
		let range = Math.pow(this.x - x, 2) + Math.pow(this.y-y, 2);
		
		if(range < this.speed * 5 && this.speed - this.error > 2){
			this.error++;
		}
		console.log(x);
		console.log(y);
		if(range > this.speed * 3) {
			this.x += targetX * this.speed - this.error;
			this.y += targetY * this.speed - this.error;
		}else{
			this.moving = false;
			this.error = 0;
		}

	}

	show(){
		fill(this.color);
		ellipse(this.x, this.y, 5);
	}

	update(){
		this.move();
		this.show();
	}

}