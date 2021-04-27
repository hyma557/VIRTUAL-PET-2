class Food {
    constructor() {
        var foodStock , lastFood
        this.foodStock = database.ref("/Food")
        this.foodStock.on("value",readStock);
        this.image = loadImage("milk.png")
        
  
    }

    getFoodStock(data){
        foodS = data.val();
    }

    display(){
        var x = 10 , y = 10
        image(this.image, 100, 200, 30, 30)

        if(this.foodStock = 0){
            for(var i = 0; i < this.foodStock; i++){
                if (i % 10 === 0) {
                    x = 10;
                    y = y + 50;
                    
                }
            
                x = x + 10;
                image(this.image,x,y,50,50);
            }
        }
    }
}