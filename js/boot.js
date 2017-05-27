//Objeto balies 

var Boot = Boot || {};
var diamantes;
var plataformas;
var reportero;
var controles;
var pildoras;
var score = 0;
var textoScore;

//Crear clase Boot
Boot = {

	preload: function () {

			
                
			juego.load.image("fondo","assets/fondo.png");
            juego.load.image("diamante","assets/diamond.png");
            juego.load.image("barra","assets/piso.png");
            juego.load.spritesheet("reportero", "assets/sprites/reporteroCorrer1.png", 32, 68);
            juego.load.image('pildora', 'assets/pildora.png');
			
			},

	 create: function() {
				
			juego.physics.startSystem(Phaser.Physics.ARCADE);
			
								
			//Aqui se agrega el fondo. 
			juego.add.sprite(0, 0, 'fondo'); 
			
			plataformas = juego.add.group();
			plataformas.enableBody = true;
						
					
			var piso = plataformas.create(0, juego.world.height - 64,'barra');
			piso.scale.setTo(2, 2);
			piso.body.immovable = true;
			
			var barra = plataformas.create(-280, 300, 'barra');
			barra.body.immovable = true;
			
			barra = plataformas.create(500, 500, 'barra');
			barra.body.immovable = true;
			
			barra = plataformas.create(200, 150, 'barra');
			barra.body.immovable = true;

			pildoras = juego.add.group();
			pildoras.enableBody = true;
			
			for (var i = 0; i < 1; i++) {
				var pildora = pildoras.create(50 + i * 55, 0, 'pildora');
				pildora.body.collideWorldBounds = true;
				pildora.body.gravity.x = juego.rnd.integerInRange(-50, 50);
				pildora.body.gravity.y = 100 + Math.random() * 100;
				
				pildora.body.bounce.setTo(1);
			}
			

	
			
			//Agregar reportero
			reportero = juego.add.sprite(0, juego.world.height - 160,"reportero");
			juego.physics.arcade.enable(reportero);
			reportero.body.bounce.y=0.3;
			reportero.body.gravity.y = 300;
			reportero.body.collideWorldBounds = true;
			
			reportero.animations.add("izquierda", [0,1,2,3],10,true);
			reportero.animations.add("derecha", [4,5,6,7],10,true);
						
			//Agregar Diamantes
			diamantes = juego.add.group();
			diamantes.enableBody = true;
			
			for (var i = 0; i < 40; i++) {
				var diamante = diamantes.create(juego.rnd.integerInRange(-50, 50) + i * 55, 0, 'diamante');
				diamante.body.collideWorldBounds = true;
				diamante.body.gravity.x = juego.rnd.integerInRange(-50, 50);
				diamante.body.gravity.y = 100 + Math.random() * 100;
				
				diamante.body.bounce.setTo(1);
			}
			
			textoScore= juego.add.text(20,20, "Marcador: 0",{fontSize:"40px", fill: "#fff"});
			controles= juego.input.keyboard.createCursorKeys();
			},

			colision: function(repo, para) {
			para.kill();
			score +=10;
			textoScore.text= "Marcador: "+ score;

				
			},

			colision1: function(repo, para) {
			
			juego.state.add('Historia', Historia);	
	        juego.state.start('Historia');
			
				
			},

			update: function () {
        			
        			
                  
               juego.physics.arcade.collide(diamantes,plataformas);
               juego.physics.arcade.collide(reportero,plataformas);
               juego.physics.arcade.collide(diamantes,diamantes);
               juego.physics.arcade.collide(pildoras, plataformas);
               
               
              
               
               juego.physics.arcade.overlap(reportero,diamantes, this.colision, null, this);
               juego.physics.arcade.overlap(reportero,pildoras, this.colision1, null, this);
               
               reportero.body.velocity.x=0;
               
               if (controles.left.isDown) {
               	reportero.body.velocity.x=-150;
               	reportero.animations.play("izquierda");
               	}
               else if (controles.right.isDown) {
               	reportero.body.velocity.x=150;
               	reportero.animations.play("derecha");
               	}
               else {
               	reportero.animations.stop();
               	reportero.frame=1;
               }
               if (controles.up.isDown && reportero.body.touching.down) {
               	reportero.body.velocity.y=-600;
               	
               }
			}
			
			
}


		
			
       
   