new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame(){
            this.gameIsRunning=true,
            this.playerHealth=100,
            this.monsterHealth=100,
            this.turns=[];
        },
        calculateDamage(min,max){
            return Math.max(Math.floor(Math.random() * max) + 1 , min);
        },
        checkWin(){
            if(this.monsterHealth <= 0){
                if(confirm('You Won!! wanna a new game?')){
                    this.startGame();
                }else{
                this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('You lost!! wanna a new game?')){
                    this.startGame();
                }else{
                this.gameIsRunning = false;
                }
                return false;                   
            }
        },
        attack(){
            var damage =this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text: ' Player Hits Monster for  ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterDamage();
        },
        specialAttack(){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text: ' Player Hits Monster hard for  ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterDamage();
        },
        monsterDamage(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer:false,
                text :  '------------  '+'Monster Hits Player for ' + damage + '  ------------'
            });
            this.checkWin();
        },
        healCond(){
            if(this.playerHealth<=90){
                var blood = Math.max(Math.floor(Math.random()*10));
                this.playerHealth += blood;
                this.monsterHealth += 1;
                this.turns.unshift({
                    text:'You healed yourself for ' + blood + ' and the monster for 1'
                });
                }else{
                    this.playerHealth = 100;
                    this.monsterHealth = this.monsterHealth;
                }
        },
        heal(){
            return this.healCond();
        },
        giveUp(){
            this.playerHealth = 0;
            this.turns.unshift({
                text:'You Lost, You have given up!'
            });
            this.checkWin();
        }
    }
});