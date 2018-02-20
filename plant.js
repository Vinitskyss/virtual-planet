class Plant{
	constructor(x, y, addRate){
		this.x = x;
		this.y = y;
		this.vel = 10;
		this.maxVel = 10;
		this.addRate = addRate;
		this.color = color(0, 0, 0);
		this.cooldown = 500;
		this.wait = 500;
	}
	update(){
		if(this.vel <= 3){
			this.cooldown = 0;
		}
		if(this.cooldown < this.wait){
			this.cooldown++;
		}else{
			this.grow();
		}
		this.show();
	}

	grow(){
		if(this.vel < this.maxVel){
			this.vel += this.addRate;
		}
	}

	show(){
		this.color = color(
			60 - map(this.vel, 0, this.maxVel, 50, 0),
			230 - map(this.vel, 0, this.maxVel, 220, 0),
			55 - map(this.vel, 0, this.maxVel, 45, 0));
		fill(this.color);
		ellipse(this.x, this.y, 5);
	}
}