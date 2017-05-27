//Objeto juego

var Historia = Historia || {};

//Crear clase Boot
Historia = {

	preload: function () {

			
                
			juego.load.image("fondo","assets/fondo.png");
            
			
			},

	 create: function() {
				
			juego.physics.startSystem(Phaser.Physics.ARCADE);
			
								
			//Aqui se agrega el fondo. 
			juego.add.sprite(0, 0, 'fondo'); 
			
			
				
			},

			update: function () {
        			
        			
                  
             }
			
			
}


		
			
       
   