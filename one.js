	var Minecraft = {};

	Minecraft.allBlocks = [];

	Minecraft.start = function() {
		var test = new Minecraft.map;
		test.generateMap(1000);
		test.generateBlock();
		Minecraft.newTree(Math.floor(Math.random() * 6) + 3  
,ground);
	}

	Minecraft.block = function(type, x, y) {
		this.type = type;
		this.coordinates = [x, y];
		var $blockHolder = $("<div>", {id : "foo", "class": "block " + this.type, "style": "background-image: url('images/" + this.type + ".png')"}).text(this.coordinates);
		$("#map").append($blockHolder);
		this.changeType = function(type) {
			this.type = type;
			$blockHolder.css("background-image","url('images/" + this.type + ".png')");
		}
	}

	Minecraft.map = function() {
		this.x = 1;
		this.y = 0;

		this.generateMap = function(mapWidth) {
			var $mapHolder = $("<div>", {id : 'map', 'style': 'width: ' + mapWidth + 'px'})
			$('body').append($mapHolder);
			this.oneLine = mapWidth / 100;
		}

		Minecraft.f = -1; 

		this.generateLines = function(block, lines) {
			for (var i = 0; i < lines; i++) {
				this.x += 1;
				if (i % this.oneLine === 0) {
					this.y += 1;
					this.x = 1;
				}
				Minecraft.allBlocks[(Minecraft.f+1)] = new Minecraft.block(block, this.x, this.y);
				Minecraft.f++;
			}
			if (block == "grass") {
				ground = (this.y-1);
			}
		};

		this.generateBlock = function() {
			this.generateLines("blank", 60);
			this.generateLines("grass", this.oneLine);
			this.generateLines("dirt", 20);
		}

	}

	Minecraft.newTree = function(x, y) {
		console.log("starting tree");

		for (var i = 0; i < Minecraft.allBlocks.length; i++) {
			for (var j = 0; j < 2; j++) {
				if (Minecraft.allBlocks[i].coordinates.join() == [x, (y-j)].join()) {
					Minecraft.allBlocks[i].changeType("tree");
				}
		for (var line = 0; line < 3; line++) {
			for (var p = -1; p < 2; p++) {
				if (Minecraft.allBlocks[i].coordinates.join() == [(x+p), (y-2)-line].join()) {
					Minecraft.allBlocks[i].changeType("leaf");	
				}
		}
			
			}
			
			
			/*if (
				Minecraft.allBlocks[i].coordinates.join() == [(x - 1), (y-2)].join() ||
				Minecraft.allBlocks[i].coordinates.join() == [(x + 1 ), (y-2)].join() ||
				Minecraft.allBlocks[i].coordinates.join() == [(x + 1 ), (y-3)].join() ||
				Minecraft.allBlocks[i].coordinates.join() == [(x - 1 ), (y-3)].join()
				) {
				console.log(Minecraft.allBlocks[i].coordinates.join() == [x, (y-2)].join())
				console.log("changing " + Minecraft.allBlocks[i].coordinates);
				Minecraft.allBlocks[i].changeType("leaf");		
			}*/
		}
	}
}


	Minecraft.start();