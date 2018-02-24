class WorldController {
    constructor(config) {
        //prepare cfg
        this.config = config;
        this.prepareConfig(this.config);

        //prepare plants
        this.plantsTypes = {'food': 'Food'};
        this.plants = [];
        this.plants.food = [];
        //prepare animals
        this.animalTypes = {'rabbits': 'Rabbit'};
        this.animals = [];
        this.animals.rabbits = [];
        this.animals.wolfes = [];
        this.prepareContainers();

        //set vars for world
        this.width = this.config.world.width;
        this.height = this.config.world.height;
    }

    prepareConfig() {


    }

    prepareContainers() {

    }

    //system methods

    getTerrainType(x, y) {

        let freeSpace = true;
        if (x < 1 || x > this.width || y < 1 || y > this.height) {
            freeSpace = false;
        }
        return {freeSpace: freeSpace};
    }

    print(...names) {
        for (let i = 0; i < names.length; i++) console.log(names[i]);
    }

}