class World extends WorldController {
    constructor(config) {
        super(config);
        this.animalId = 0;
        this.spawnAnimal('rabbits', this.config.animals.rabbits, 1);
    }
    
    spawnAnimal(type, count, gen, x = random(0, this.width),
    y = random(0, this.height), hunger = Math.floor(random(8, 12)),
    speed = Math.floor(random(1, 2.3)))
    {
        let classes = {'rabbits':'Rabbit'};
        let className = eval(classes[type]);

        let animal = eval("this.animals."+type);
        for (let i = 0; i < count; i++) {
            animal.push(new className(x,y,hunger, speed, this, this.animalId, gen));
            this.animalId++;
        }
    }

    

    seedGrass(count, vel) {
        for (let i = 0; i < count; i++) {
            let x = random(0, this.width);
            let y = random(0, this.height);
            this.plants.push(new Grass(x, y, vel));
        }
    }

    updateGrass(){
        for (let i = 0; i < this.plants.length; i++) {
            this.plants[i].update();
        }

        for (let i = this.plants.length - 1; i > 0; i--) {
            if (this.plants[i].vel <= 0) {
                this.plants.splice(i, 1);
            }
        }
        let prob = this.plantsCount - this.plants.length;
        let r = random(3, this.plantsCount * 2);
        if (prob > r) {
            this.seedPlants(1, 5);
        }
    }

    updatePlants() {
        

    }

    updateAnimals(){
        for(let animalType in this.animals){
            console.log(animalType);
            
            let type = eval("this.animals."+animalType);
            for (let j = 0; j < type.length; j++) {
                
                if (type[j].image.loaded()) {
                    type[j].update(this);
                    console.log(1);

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

    updateVegans() {
        

        for (let i = this.vegans.length - 1; i > 0; i--) {
            if (this.vegans[i].hunger <= -20) {
                this.vegans.splice(i, 1);
            }
        }
    }

    update() {

        this.updatePlants();

        this.updateAnimals();

    }

}