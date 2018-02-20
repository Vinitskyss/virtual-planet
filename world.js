class World{
	constructor(width, height){
		this.width = width;
		this.height = height;
	}
	getTerrainType(x, y){
		return {freeSpace:true};
	}
}