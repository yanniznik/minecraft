	var Minecraft = {};

	Minecraft.allBlocks = [];

	Minecraft.start = function() {
		var test = new Minecraft.map;
		test.generateMap(1000);
		test.generateBlock();
		Minecraft.elements( Minecraft.random(2,Minecraft.oneLine),ground);
		Minecraft.initializeTools(Minecraft.toolName, Minecraft.blocks);
	}

	Minecraft.random = function(min, max, excluded) {
		var n = Math.floor(Math.random() * (max-min) + min);
		if (n >= excluded) n++;
		return n;
	}

	Minecraft.block = function(type, x, y) {

		this.type = type;
		this.coordinates = [x, y];
		this.blockHolder = $("<div>", {"class": "block " + this.type, "style": "background-image: url('images/" + this.type + ".png')"});
		$("#map").append(this.blockHolder);
		this.changeType = function(type) {
			this.type = type;
			this.blockHolder.css("background-image","url('images/" + this.type + ".png')");
		}
	}

	Minecraft.block.prototype.create = function (){
 
 var self = this;
 /*this.domBlock = document.createElement("div");
   //Each DOM block element will have class block 
   this.domBlock.classList.add("block", "dirt");
   //not all background images have a png extension, use if/else based on type
   this.domBlock.style.backgroundImage =  "url('./images/" + this.type + ".png')"*/
   //document.getElementById("placeholder").appendChild(this.$blockHolder);

   console.log(self);

   this.blockHolder.click(function () {
	   console.log('block clicked');
     console.log(self);
     if(Minecraft.selectedTool != null){
      Minecraft.block.prototype.tryToRemove(self);
    }
  })
 }

 Minecraft.block.prototype.tryToRemove = function (block){
  console.log('in delete function');
  console.log(block.blockHolder)
    //if the block objects DOM element contains a class that matches the Selecetedtools
    //approachedblock, then the tool and the block match, and we can remove the block

    if(block.blockHolder.hasClass(Minecraft.selectedTool.approachedBlock)){
    //types need to match classes, whatever object we create in the constructor
    //their classes should be set to type
	console.log('Y')
    block.blockHolder.removeClass(block.type);
    block.blockHolder.addClass("sky");
    //console.log(block.domBlock.classList);
    
  }

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
				console.log(Minecraft.allBlocks[(Minecraft.f+1)]);
				Minecraft.allBlocks[(Minecraft.f+1)].create(); 

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

	Minecraft.tools = function (type, approachedBlock){

		this.toolHolder;
		this.type = type;
		this.approachedBlock = approachedBlock;
		this.selected = false;

		this.create = function() {

			var self = this;
			this.toolHolder = document.createElement("div");
			this.toolHolder.classList.add("tool");
			this.toolHolder.style.backgroundImage =  "url('./images/" + this.type + ".png')";
			$(".tools-container").append(this.toolHolder);

			this.toolHolder.addEventListener('click', function () {
				Minecraft.selectTool(self);
			})

		}
}

Minecraft.allTools = [];
Minecraft.allBlocks = [];
Minecraft.selectedTool;
Minecraft.selectedBlock;
Minecraft.toolName = ["pickaxe","shovel","axe"];
Minecraft.blocks = ["rock", "dirt", "wood", "sky", "cloud", "leaves"];

Minecraft.initializeTools = function (tools, blocks) {

	for(var i = 0; i < tools.length; i++){
		Minecraft.allTools[i] = new Minecraft.tools(tools[i], blocks[i]);
		console.log(tools, blocks);
		Minecraft.allTools[i].create();
	}
}

Minecraft.selectTool = function (self){
//better approach then setting every object type false
Minecraft.selectedTool = self;

console.log(Minecraft.selectedTool);
}


Minecraft.start();