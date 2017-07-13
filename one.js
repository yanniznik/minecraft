	var Minecraft = {};

	Minecraft.allBlocks = [];

	Minecraft.start = function() {
		var letsPlay = new Minecraft.map;
		letsPlay.generateMap(1000);
		letsPlay.generateBlock();
		Minecraft.elements( Minecraft.random(2,Minecraft.oneLine),ground);
		Minecraft.initializeTools();
		Minecraft.buttons();
	}

	Minecraft.buttons = function() {

		$(".reset").click(function(){
			$("#map").remove();
			Minecraft.allBlocks = [];
			Minecraft.selectedTool = [];
			inventoryCounter = {};
			Minecraft.start();
		})
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
		this.toolHolder = $("<div>", {"class": "tool " + this.type}).append("<img src='images/" + this.type + ".png'>");
		$(".tools-container").append(this.toolHolder);
		this.toolHolder.click(function(){
			Minecraft.selectedInventory = {};
			Minecraft.selectedTool = [];
			Minecraft.selectedTool = self.approachedBlock;
			$("div").removeClass('active');
			$(this).addClass('active');
			$("#map").css( 'cursor', 'url(images/cursors/' + self.type + '.png), auto' );
		})
	}

	Minecraft.initializeTools = function () {
		new Minecraft.tools("axe", ["tree", "leaf"]);
		new Minecraft.tools("shovel", ["dirt", "grass"]);
		new Minecraft.tools("pickaxe", ["rock"]);
		new Minecraft.tools("eraser", ["tree", "leaf", "dirt", "grass", "rock", "cloud", "lava"]);
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
			this.blockHolder.removeClass().addClass("block " + this.type);
		}

		this.blockHolder.click(function() {

			for (var i = 0; i < Minecraft.selectedTool.length; i++) {
				targetBlock = Minecraft.selectedTool[i];
				if (targetBlock == self.type) {
					if (testArray = self.type in inventoryCounter) {
					}
					else
					{
						inventoryCounter[self.type] = 0;
					}
					self.changeType("blank");
					new Minecraft.inventory(targetBlock);
				}
				
			}
			if(Minecraft.selectedInventory != null && inventoryCounter[Minecraft.selectedInventory.type] != 0){
				if(self.type == "blank"){
					self.changeType(Minecraft.selectedInventory.type);

					inventoryCounter[Minecraft.selectedInventory.type]--;
					$("." + self.type + " span").text(inventoryCounter[Minecraft.selectedInventory.type]);
					if(inventoryCounter[Minecraft.selectedInventory.type] == 0){
						$("#map").css( 'cursor', 'auto' );


						$(".inventory-container ." + self.type ).hide();
						
						
					}
				}
			}
			
		})
	}

	Minecraft.selectedInventory;
	Minecraft.inventory = function (type){
		var self = this;
		this.type = type;
		var $inv = $("<div>", {'class' : 'inv ' + this.type }).append("<img src='images/" + this.type + ".png'>")
		var $counting = $("<span>")
		$($inv).append($counting);
		inventoryCounter[targetBlock]++;
		$("." + this.type + " span").text(inventoryCounter[type]);
		if ($('.inventory-container .' + self.type).length == 0) {
			$(".inventory-container").append($inv);
			$("." + this.type + " span").text(inventoryCounter[type]);
		}
		$inv.click(function (){
			$(".tool").removeClass("active");
			$(this).addClass("active");
			$("#map").css( 'cursor', 'url(images/cursors/' + self.type + '.png), auto' );
			Minecraft.selectedInventory = self;
		})

	}
	var inventoryCounter = {};
	
	Minecraft.map = function() {
		this.x = 1;
		this.y = 0;
		this.generateMap = function(mapWidth) {
			var $mapHolder = $("<div>", {id : 'map', 'style': 'width: ' + mapWidth + 'px'})
			var $toolContainer = $("<div>", {'class' : 'tools-container bgholder'})
			var $inventoryContainer = $("<div>", {'class' : 'inventory-container bgholder'})
			var $buttonsContainer = $("<div>", {'class' : 'buttons-container bgholder'})
			var $resetButton = $("<div>", {'class' : 'reset'}).append("<img src='images/reset.png'>");

			$('body').append($mapHolder);
			$($mapHolder).append($toolContainer);
			$($mapHolder).append($inventoryContainer);
			$($mapHolder).append($buttonsContainer);
			$($buttonsContainer).append($resetButton);

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
			if (block == "blank") {
				ground = (this.y-1);
			}
		};
		this.generateBlock = function() {
			this.generateLines("blank", 200);
			this.generateLines("blank", Minecraft.oneLine);
			this.generateLines("dirt", 60);
			this.generateLines("lava", Minecraft.oneLine);
		}
	}

	Minecraft.RandomArray= new Array(20);

	for(i=0;i<20;i++){
		Minecraft.RandomArray[i]=Math.floor(Math.random()*3+1);
	}


	Minecraft.elements = function(x, y) {
		randomNumber = Minecraft.random(0,Minecraft.oneLine,x)
		randomNumber2 = Minecraft.random(0,Minecraft.oneLine,x)
		for (var i = 0; i < Minecraft.allBlocks.length; i++) {


			// GENERATING TERRAIN

			for (var terrain = 0; terrain < Minecraft.oneLine; terrain++) {
				if (Minecraft.allBlocks[i].coordinates.join() == [terrain, (ground+Minecraft.RandomArray[terrain])-1].join()) {
					Minecraft.allBlocks[i].changeType("grass");
					Minecraft.allBlocks[i+Minecraft.oneLine].changeType("dirt");
				}
			}

			// GENERATING 1 CLOUD 

			for (var c = 0; c < 2; c++) {
				for (var o = 0; o < 4 ; o++) {
					if (Minecraft.allBlocks[i].coordinates.join() == [o+randomNumber, c+2].join()) {
						Minecraft.allBlocks[i].changeType("cloud");
					}
				}
			}

			// GENERATING 2 CLOUD 

			for (var c = 0; c < 2; c++) {
				for (var o = 0; o < 4 ; o++) {
					if (Minecraft.allBlocks[i].coordinates.join() == [o+randomNumber2, c+3].join()) {
						Minecraft.allBlocks[i].changeType("cloud");
					}
				}
			}


			// GENERATING ROCKS

			if (Minecraft.allBlocks[i].coordinates.join() == [randomNumber, y].join()) {
				Minecraft.allBlocks[i].changeType("rock");
				Minecraft.allBlocks[i+Minecraft.oneLine].changeType("grass");
				Minecraft.allBlocks[i+(Minecraft.oneLine*2)].changeType("dirt");
			}

			
			// GENERATING TREE TRUNK

			for (var j = 0; j < 2; j++) { 
				if (Minecraft.allBlocks[i].coordinates.join() == [x, (y-j)].join()) {
					Minecraft.allBlocks[i].changeType("tree");
				}

				if (Minecraft.allBlocks[i].coordinates.join() == [x, (y-j)+1].join()) {
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

	$(document).ready(function() {
		$('.welcome').click(function() {
			$('.hello').fadeOut("slow");
		})
	})

	Minecraft.start();