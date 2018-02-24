class World extends WorldController {
    constructor(config) {
        super(config);
        this.animalId = 0;
        this.spawnAnimal('rabbits', this.config.animals.rabbits, 1);
        this.seedPlant('food', this.config.plants.food);
    }
    
    spawnAnimal(type, count, gen, x,y, hunger = Math.floor(random(8, 12)),
    speed = Math.floor(random(1, 2.3)))
    {
        let classes = {'rabbits':'Rabbit'};
        let className = eval(classes[type]);
        let animal = eval("this.animals."+type);
        let rx = x == undefined;
        let ry = y == undefined;
        for (let i = 0; i < count; i++) {
            if(rx){ x = random(0, this.width);}
            if(ry){ y = random(0, this.height);}
            animal.push(new className(x,y,hunger, speed, this, this.animalId, gen));
            this.animalId++;
        }
    }

    seedPlant(type, count, x, y, vel = 0) 
    {
        let classes = {'food':'Food'};
        let className = eval(classes[type]);
        let plant = eval("this.plants."+type);
        let rx = x == undefined;
        let ry = y == undefined;
        for (let i = 0; i < count; i++) {
            if(rx){ x = random(0, this.width);}
            if(ry){ y = random(0, this.height);}
            plant.push(new className(x, y, vel));
        }
    }

    updatePlants() {
        for(let plantType in this.plants){
            
            let type = eval("this.plants."+plantType);
            for (let j = 0; j < type.length; j++) {
                /* LATER CHANGE TO GIF
                if (type[j].image.loaded()) {
                    type[j].update(this);
                }
                */
                type[j].update();
            }
        }
        let type = eval("this.plants.food")
        for (let i = type.length - 1; i > 0; i--) {
            if (type[i].vel <= 0) {
                type.splice(i, 1);
            }
        }
        let prob = this.config.plants.food - type.length;
        let r = random(3, this.config.plants.food * 2);
        if (prob > r) {
            this.seedPlant('food', 1);
        }

    }

    updateAnimals(){
        for(let animalType in this.animals){
            
            let type = eval("this.animals."+animalType);
            for (let j = 0; j < type.length; j++) {
                
                if (type[j].image.loaded()) {
                    type[j].update(this);
                }

                if (type[j].checkSpawn() && type[j].sex == 1) {
                    this.spawnAnimal(animalType, 1, type[j].generation + 1,
                    type[j].x, type[j].y);
                    console.log('SPAWNED!');
                    console.log(type[j].x);
                    console.log(type[j].y);
                    console.log('======');
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