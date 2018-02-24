class WorldController{
	constructor(config){
		
		//prepare cfg
		this.config = config;
		this.prepareConfig(this.config);
		
		//prepare containers
		this.plants = [];
		this.animals = [];
		this.prepareContainers();

		//set vars for world
		this.width = config.world.width;
		this.height = config.world.height;

		//set vars for plants
		this.plants.food = config.plants.food;

		//set vars for animals
		this.animals.rabbits = config.animals.rabbits;

	}

	prepareConfig(){
		if(config.width == undefined){
			config.width = 1000;
		}
		if(config.height == undefined){
			config.height == 600;
		}
		if(config.animals.rabbits == undefined){
			config.animals.rabbits = 0;
		}
		if(config.plants.food == undefined){
			config.plants.food = config.animals.rabbits * 4;
		}
	}

	prepareContainers(){
		if(config.animals.rabbits)
	}
}