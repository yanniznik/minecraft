	var Minecraft = {};

	Minecraft.allBlocks = [];

	Minecraft.start = function() {
		var test = new Minecraft.map;
		test.generateMap(1000);
		test.generateBlock();
		Minecraft.elements( Minecraft.random(2,Minecraft.oneLine),ground);
		Minecraft.initializeTools();
	}

	Minecraft.random = function(min, max, excluded) {
		var n = Math.floor(Math.random() * (max-min) + min);
		if (n >= excluded) n++;
		return n;
	}

	Minecraft.selectedTool = [];

	Minecraft.tools = function (type, approachedBlock){
		this.type = type;
		this.approachedBlock = approachedBlock;
		var self = this;
		this.toolHolder = $("<div>", {"class": "tool " + this.type, "style": "background-image: url('images/" + this.type + ".png')"});
		$(".tools-container").append(this.toolHolder);
		this.toolHolder.click(function(){
			Minecraft.selectedTool = [];
			Minecraft.selectedTool = self.approachedBlock;
			console.log(Minecraft.selectedTool)
			 $(".tool").removeClass('active');
  $(this).addClass('active');
		})
	}

	Minecraft.initializeTools = function () {
		new Minecraft.tools("axe", ["tree", "leaf"]);
		new Minecraft.tools("shovel", ["dirt", "grass"]);
		new Minecraft.tools("pickaxe", ["rock"]);
		new Minecraft.tools("eraser", ["tree", "leaf", "dirt", "grass", "rock", "cloud"]);
	}

	Minecraft.block = function(type, x, y) {
		this.type = type;
		this.coordinates = [x, y];
		var self = this;
		this.blockHolder = $("<div>", {"class": "block " + this.type, "style": "background-image: url('images/" + this.type + ".png')"});
		$("#map").append(this.blockHolder);
		this.changeType = function(type) {
			this.type = type;
			this.blockHolder.css("background-image","url('images/" + this.type + ".png')");
		}
		this.blockHolder.click(function() {
			for (var i = 0; i < Minecraft.selectedTool.length; i++) {
				targetBlock = Minecraft.selectedTool[i];
				if (targetBlock == self.type) {
					self.changeType("blank");
				}
			}
		})
	}

	Minecraft.map = function() {
		this.x = 1;
		this.y = 0;
		this.generateMap = function(mapWidth) {
			var $mapHolder = $("<div>", {id : 'map', 'style': 'width: ' + mapWidth + 'px'})
			$('body').append($mapHolder);
			Minecraft.oneLine = mapWidth / 50;
		}
		Minecraft.f = -1; 
		this.generateLines = function(block, lines) {
			for (var i = 0; i < lines; i++) {
				this.x += 1;
				if (i % Minecraft.oneLine === 0) {
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
			this.generateLines("blank", 200);
			this.generateLines("grass", Minecraft.oneLine);
			this.generateLines("dirt", 80);
		}
	}

	Minecraft.elements = function(x, y) {
		randomNumber = Minecraft.random(0,Minecraft.oneLine,x)
		for (var i = 0; i < Minecraft.allBlocks.length; i++) {

			// GENERATING CLOUD 

			for (var c = 0; c < 3; c++) {
				for (var o = 0; o < 10 ; o++) {
					if (Minecraft.allBlocks[i].coordinates.join() == [Minecraft.random(0,Minecraft.oneLine/3)+(randomNumber-5), c+2].join()) {
						Minecraft.allBlocks[i].changeType("cloud");
					}
				}
			}

			// GENERATING ROCKS

			if (Minecraft.allBlocks[i].coordinates.join() == [randomNumber, y].join()) {
				Minecraft.allBlocks[i].changeType("rock");
			}
			
			// GENERATING TREE TRUNK

			for (var j = 0; j < 2; j++) { 
				if (Minecraft.allBlocks[i].coordinates.join() == [x, (y-j)].join()) {
					Minecraft.allBlocks[i].changeType("tree");
				}

				// GENERATING TREE LEAVES

				for (var line = 0; line < 3; line++) {
					for (var p = -1; p < 2; p++) {
						if (Minecraft.allBlocks[i].coordinates.join() == [(x+p), (y-2)-line].join()) {
							Minecraft.allBlocks[i].changeType("leaf");	
						}
					}
				}
			}
		}
	} // end elements




	Minecraft.start();