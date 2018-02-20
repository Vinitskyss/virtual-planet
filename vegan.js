class Vegan extends Animal{
	constructor(x, y, hunger, speed, world){
		super(x, y, hunger, speed, world);
		this.minHunger = 10;
		this.speed = 1;
		this.descisionRate = 40;
		this.hunger = 15;
	}

	searchFood(){
		
	}

	
}