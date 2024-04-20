const { createApp } = Vue

createApp({
    data() {
        return {
            heroi: {vida: 100, stamina: 100, pot: 5},
            vilao: {vida: 100, stamina: 100}
        }
    },
    methods: {
        atacar(isHeroi){
            if(isHeroi) {
                if(this.vilao.stamina > 0) {
                    this.vilao.vida -= 10;
                    //setinterval da pra colocar um tempo entre uma ação e outra
                    setTimeout(this.acaoVilao, 500);
                } else {
                    this.vilao.vida -= 25;
                }                
            } else {
                if(this.heroi.stamina > 0) {
                    this.heroi.vida -= 15;
                console.log('atacar do vilao heroi tem stamina')
                } else {
                    this.heroi.vida -= 35;
                    console.log('atacar do vilao sem stamina do heroi')
                }
            }

            //Mensagem de EndGame
            if(this.vilao.vida <= 0 && this.heroi.vida > 0){
                alert("PARABÉNS, VOCÊ MATOU O VILÃO!");
                window.location.href='./main.html'
            } else if(this.heroi.vida <= 0 && this.vilao.vida > 0){
                alert("GAME OVER, VOCÊ MORREU!");
                window.location.href='./main.html'
            } else if(this.heroi.vida <= 0 && this.vilao.vida <= 0){
                alert("GAME OVER, AMBOS MORRERAM!");
                window.location.href='./main.html'
            }
        },

        defender(isHeroi) {
            if(isHeroi) {
                if(this.heroi.stamina > 0) {
                    this.heroi.stamina -= 20;
                    setTimeout(this.acaoVilaoSemAtk, 500);
                    //defender do heroi
                } else {
                    setTimeout(this.acaoVilao, 500);
                }
            } else {
                this.vilao.stamina -=20
            }            
        },

        //Cura o herói de 3 formas diferentes usando de 3 casos, Tem vida -> cura mana, Tem mana -> cura vida, não tem nenhum -> cura vida e mana.
        usarPocao(isHeroi) {
            if(isHeroi) {
                if(this.heroi.pot > 0 && this.heroi.vida < 100 && this.heroi.stamina < 100) {
                    this.heroi.vida += 15;
                    this.heroi.stamina += 15;
                    this.heroi.pot -= 1;
                    //poção do heroi
                    setTimeout(this.acaoVilao, 500)
                } else if(this.heroi.pot > 0 && this.heroi.vida < 100 && this.heroi.stamina == 100) {
                    this.heroi.vida += 30;
                    this.heroi.pot -= 1;
                    //poção do heroi
                    setTimeout(this.acaoVilao, 500)
                } else if(this.heroi.pot > 0 && this.heroi.vida == 100 && this.heroi.stamina < 100) {
                    this.heroi.stamina += 20;
                    this.heroi.pot -= 1;
                    //poção do heroi
                    setTimeout(this.acaoVilao, 500)
                } else {
                    setTimeout(this.acaoVilao, 500);
                }
            } else {
                if(this.vilao.vida < 100 && this.vilao.stamina < 100) {
                    this.vilao.vida += 10;
                    this.vilao.stamina += 10;
                    //poção do vilão
                } else if(this.vilao.vida < 100 && this.vilao.stamina == 100) {
                    this.vilao.vida += 10;
                    //poção do vilão
                } else if(this.vilao.vida == 100 && this.vilao.stamina < 100) {
                    this.vilao.stamina += 10;
                }
            }
        },

        //Correr redireciona para a página de inicio do GAME
        correr(isHeroi) {
            if(isHeroi) {
                alert("Você Correu! Fraco, lhe falta ódio")
                window.location.href='./main.html'
            } else {
                alert("O vilão correu, vá atrás dele e tente novamente!")
                window.location.href='./main.html'
            }
            
            
        },
        iniciar() {
            window.location.href='./index.html'
        },


        //Aumentei a quantidade de possibilidades para diminuir a chance do vilão correr muito facilmente.
        acaoVilao(){
            const acoes = ['atacar', 'atacar','atacar','atacar','atacar','atacar','atacar','atacar','atacar','defender','defender','defender', 'defender','defender','usarPocao','usarPocao','correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)]
            this[acaoAleatoria](false);
        },
        //Eliminei o atacar e o correr do vilão para permitir que ele faça alguma ação sem causar dano no momento que o herói usa a defesa mas não encerre com a batalha também.
        acaoVilaoSemAtk(){
            const acoes = ['defender','defender', 'defender','defender','defender', 'defender','usarPocao','usarPocao','usarPocao','usarPocao','usarPocao','usarPocao'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)]
            this[acaoAleatoria](false);
        }
    }
}).mount("#app");


