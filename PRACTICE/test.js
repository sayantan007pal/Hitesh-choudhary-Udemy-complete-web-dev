game={
    football:"RUNNING",
    player : {
        chess:"SITTING",
        futbal:game.football,
        howToPlay : function(){
            return `we can play chess while ${this.chess}, but for football we need to keep ${this.futbal}`
        }
    }
}
console.log(game.player.howToPlay())

// const value = new Person("Sayantan", "Pal")
// console.log(value.getFullName())