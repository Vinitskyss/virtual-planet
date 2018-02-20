class Plant{
	constructor(x, y, addRate){
		this.x = x;
		this.y = y;
		this.vel = 10;
		this.addRate = addRate;
		this.color = color(0, 0, 0);
	}
	update(){
		if(this.vel < 100){
			this.vel += this.addRate;
		}
		this.show();
	}
	show(){
		let vel = map(this.vel, 0, 100, 50, 0);
		this.color = color(60 - vel, 130 - vel, 55 - vel);
		fill(this.color);
		ellipse(this.x, this.y, 5);
	}
}