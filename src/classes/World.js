class World extends WorldController {
    constructor(config) {
        super(config);
        this.animalId = 0;
        this.spawnAnimal('rabbits', this.config.animals.rabbits, 1, undefined, undefined, undefined, random(1, 2.3));
        this.spawnAnimal('wolves', this.config.animals.wolves, 1, undefined, undefined, undefined, random(0.5, 1.6));
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
                hunger = random(8, 12);
            }
            if (rs) {
                speed = random(1, 2.3);
            }
            animals.push(new className(x, y, hunger, speed, this, this.animalId, gen));
            this.animalId++;
        }
    }

    killAnimal(id) {
        console.log('die');
        for (let animal in this.animalTypes) {
            let type = eval("this.animals." + animal);
            for (let i = 0; i < type.length; i++) {
                if (type[i].id == id) {
                    type[i].die();
                }
            }
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
               //console.log(type[j].image);
                //if (type[j].image.loaded()) {
                    type[j].update();

                //}

                //reasons to update world in each animal
                /*
                 if (type[j].hungry || type[j].readyToSpawn || true) {
                 //type[j].updateWorld(this);
                 }
                 */
                if (type[j].checkSpawn() && type[j].sex == 1) {
                    this.spawnAnimal(animalType, 1, type[j].generation + 1, type[j].x, type[j].y);
                    this.print("SPAWNED", type[j].x, type[j].y);
                }
            }
            for (let j = type.length - 1; j > 0; j--) {
                if (type[j].hunger < -20) {
                    type.splice(j, 1);
                    j = 0;
                }
            }
        }
    }

    update() {

        this.updatePlants();

        this.updateAnimals();

    }
}
