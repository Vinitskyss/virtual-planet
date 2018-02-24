class WorldController{
	constructor(config){
		//prepare cfg
		this.config = config;
		this.prepareConfig(this.config);
		
		//prepare plants
		this.plants = [];
		this.plants.food = [];
		//prepare animals
		this.animalTypes = [];
		this.animals = [];
		this.animals.rabbits = [];
		this.animals.wolfes = [];
		this.prepareContainers();

		//set vars for world
		this.width = this.config.world.width;
		this.height = this.config.world.height;
	}

	prepareConfig(){
		
		return;
		if(typeof config.width == undefined){
			config.width = 1000;
		}
		if(typeof config.height == undefined){
			config.height == 600;
		}
		if('animals' in config){
			
		}else{
			config.push({'animals':{}});
			config.animals.push({'rabbits':0});
			config.animals.rabbits = 0;
		}
		if(typeof config.plants == undefined){
			config.plants.food = config.animals.rabbits * 4;
		}
	}

	prepareContainers(){
		this.config.animalTypes = [];
		for(let type in this.config.animals){
			this.config.animalTypes.push(type);
		}
		return;
		this.animals.rabbits = [];
		if(config.animals.rabbits > 0){
			
		}
		if(config.plants.food > 0){
			this.plants.food = [];
		}
	}

	//system methods

	getTerrainType(x, y) {

        let freeSpace = true;
        if (x < 1 || x > this.width || y < 1 || y > this.height) {
            freeSpace = false;
        }
        return {freeSpace: freeSpace};
    }

}