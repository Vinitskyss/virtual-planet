class World extends WorldController {
    constructor(config) {
        super(config);
        this.animalId = 0;
        this.spawnAnimal('rabbits', this.config.animals.rabbits, 1);
        this.seedPlant('food', this.config.plants.food);
    }

    spawnAnimal(type, count, gen, x, y, hunger, speed) {

        let className = eval(this.animalTypes[type]);
        let animals = eval("this.animals." + type);

        let rx = x == undefined;
        let ry = y == undefined;
        let rh = hunger == undefined;
        let rs = speed == undefined;

        for (let i = 0; i < count; i++) {
            if (rx) {
                x = random(0, this.width);
            }
            if (ry) {
                y = random(0, this.height);
            }
            if (rh) {
                hunger = Math.floor(random(8, 12));
            }
            if (rs) {
                speed = Math.floor(random(1, 2.3));
            }
            animals.push(new className(x, y, hunger, speed, this, this.animalId, gen));
            this.animalId++;
        }
    }

    seedPlant(type, count, x, y, vel) {
        let className = eval(this.plantsTypes[type]);
        let plants = eval("this.plants." + type);
        let rx = x == undefined;
        let ry = y == undefined;
        let rv = vel == undefined;
        for (let i = 0; i < count; i++) {
            if (rx) {
                x = random(0, this.width);
            }
            if (ry) {
                y = random(0, this.height);
            }
            if (rv) {
                vel = random(1, 5);
            }
            plants.push(new className(x, y, vel));
        }
    }

    updatePlants() {
        for (let plantType in this.plants) {
            let type = eval("this.plants." + plantType);
            for (let j = 0; j < type.length; j++) {
                /* LATER CHANGE TO GIF
                 if (type[j].image.loaded()) {
                 type[j].update(this);
                 }
                 */
                type[j].update();
            }
        }

        let type = eval("this.plants.food");
        for (let i = type.length - 1; i > 0; i--) {
            if (type[i].vel <= 0) {
                type.splice(i, 1);
            }
        }

        //Food spawn probability
        let prob = this.config.plants.food - type.length;
        let r = random(3, this.config.plants.food * 2);
        if (prob > r) {
            this.seedPlant('food', 1);
        }

    }

    updateAnimals() {
        for (let animalType in this.animals) {
            let type = eval("this.animals." + animalType);
            for (let j = 0; j < type.length; j++) {

                if (type[j].image.loaded()) {
                    type[j].update();
                }

                if (type[j].hungry || type[j].readyToSpawn) {
                    type[j].updateWorld(this);
                }

                if (type[j].checkSpawn() && type[j].sex == 1) {
                    this.spawnAnimal(animalType, 1, type[j].generation + 1,
                        type[j].x, type[j].y);
                    this.print("SPAWNED", type[j].x, type[j].y);
                }
            }
        }
    }


    getTerrainType(x, y) {
        let freeSpace = true;
        if (x < 1 || x > this.width || y < 1 || y > this.height) {
            freeSpace = false;
        }
        return {freeSpace: freeSpace};
    }

    update() {

        this.updatePlants();

        this.updateAnimals();

    }

}