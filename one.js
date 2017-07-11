	var Minecraft = {};

		Minecraft.allBlocks = [];
		
		Minecraft.start = function() {
			var test = new Minecraft.map;
			test.generateMap(1000);
			test.generateBlock();
		}

		Minecraft.block = function(type, x, y) {
			this.type = type;
			this.coordinates = [x, y];
			var blockHolder = document.createElement("div");
			blockHolder.classList.add("block");
			blockHolder.style.backgroundImage = "url('images/" + this.type + ".png')";
			blockHolder.innerHTML = this.coordinates;
			document.getElementById("map").appendChild(blockHolder);
		}

		Minecraft.map = function() {
			
			this.newLine = 0;
			this.height = 30;
			this.sky = 60;
			this.x = 1;
			this.y = 0;

			this.generateMap = function(mapWidth) {
				var mapHolder = document.createElement("div");
				mapHolder.setAttribute("id", "map");
				mapHolder.setAttribute("style", "width: " + mapWidth + "px");
				document.getElementById("body").appendChild(mapHolder);
				this.newLine = mapWidth / 100;
			}

			this.generateBlock = function() {

				 // GENERATING SKY 

				 for (var s = 0; s < this.sky; s++) {
				 	this.x += 1;
				 	if (s % this.newLine === 0) {
				 		this.y += 1;
				 		this.x = 1;
				 	}
				 	Minecraft.allBlocks[i] = new Minecraft.block("blank", this.x, this.y);
				 }

				console.log("sky end at " + this.x + "," + this.y);

				// GENERATING ONE LINE OF GRASS

				this.x = 0;
				this.y += 1;
				for (var i = 0; i < this.newLine; i++) { // ONE LINE
					this.x += 1;
					Minecraft.allBlocks[i] = new Minecraft.block("grass", this.x, this.y);
				}
				console.log("grass end at " + this.x + "," + this.y);

				// GENERATING DIRT

				this.x = 0;
				for (var i = 0; i < this.height; i++) {
					this.x += 1;
					if (i % this.newLine === 0) { // EVERY 10 BLOCK ADD LINE
						this.y += 1;
						this.x = 1;
					}
					Minecraft.allBlocks[i] = new Minecraft.block("dirt", this.x, this.y);
				}
				console.log("dirt end at " + this.x + "," + this.y);
			}
		}

		Minecraft.start();