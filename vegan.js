class Vegan extends Animal{
	constructor(x, y, hunger, speed, world){
		super(x, y, hunger, speed, world);
		this.minHunger = 10;
		this.speed = 1;
		this.descisionRate = 40;
		this.hunger = 15;
	}

	searchFood(){
		let dist = 100000;
		let target = -1;
		for(let i = 0; i < this.world.plants.length; i++){
			if(this.world.plants[i].vel > 5){
				let newDist = Math.pow(this.x - this.world.plants[i].x, 2) +
						   	  Math.pow(this.y - this.world.plants[i].y, 2);
				if(newDist < dist){
					dist = newDist;
					target = i;
				}
			}
		}
		if(target >= 0){
			this.moving = true;
			this.targetX = this.world.plants[target].x;
			this.targetY = this.world.plants[target].y;
		}
	}

	checkFood(){
		for(let i = 0; i < this.world.plants.length; i++){
			let dist = Math.pow(this.x - this.world.plants[i].x, 2) +
					   Math.pow(this.y - this.world.plants[i].y, 2);
			if(this.world.plants[i].vel > 0 && dist < 4){
				let toFeed = this.maxHunger - this.hunger;
				if(this.world.plants[i].vel > toFeed){
					this.hunger += toFeed;
					this.world.plants[i].vel -= toFeed;
				}else{
					this.hunger += this.world.plants[i].vel
					this.world.plants[i].vel = 0;
				}
				return true;
			}
		}
		return false;
	}
	
}