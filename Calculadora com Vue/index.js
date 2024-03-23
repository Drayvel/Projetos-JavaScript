const { createApp } = Vue;

createApp({
    data() {
        return {
            display: "0",
            numeroAnterior: null,
            numeroAtual: '0',
            operador: null,
            contadorDec: null,
        }
    },
    methods: {
        lidarBotao(valor) {
            switch (valor)
            {
                case '*':
                case '/':
                case '-':
                case '+':
                    this.lidarOperador(valor);
                    break;

                case '.':
                    this.lidarDecimal();
                    break;

                case 'C':
                    this.lidarLimpar();
                    break;

                case '=':
                    this.lidarIgual();
                    break;

                default:
                    this.lidarNumero(valor);
            }
        },
        lidarOperador(valor) {
            console.log("O botão digitado foi: ", valor);
            //usando o if eu crio um método que vai impedir que exista mais de um operador numa mesma operação.
            //usando o método split() eu consigo transformar uma string em um array, com isso é possível utilizar os métodos de um array para manipular os caracteres da string.
            const displayArray = this.display.split('');
            if (displayArray[displayArray.length - 1] === '+' ||
                displayArray[displayArray.length - 1] === '-' ||
                displayArray[displayArray.length - 1] === '*' ||
                displayArray[displayArray.length - 1] === '/') {
                return;
            }else {
            this.numeroAnterior = this.display
            this.numeroAtual = '0'
            console.log(this.numeroAtual, this.numeroAnterior)
            this.operador = valor
            this.display += valor
            this.contadorDec = 0
            }
        },
        lidarDecimal() {
            //Adiciona o ponto de decimal ao display e faz a verificação se o ponto já foi adicionado anteriormente
            //se já houver um . dentro do display ele não permitira outro.
            console.log("Entrou no decimal");
            if (this.contadorDec >= 1) {
                alert("Você já tem um ponto decimais!")
                console.log("entrou no if")
            }else {
                this.display += '.'
                this.numeroAtual += '.'
                this.contadorDec++;
                console.log("entrou no else")
            }            
        },
        //variáveis e constantes retornados ao seu valor original 
        lidarLimpar() {
            this.display = '0';
            this.numeroAtual = '0';
            this.numeroAnterior = null;
            this.operador = null;
            this.contadorDec = null;
        },
        lidarIgual() {
            console.log("Entrou no Igual");
            console.log(this.numeroAtual, this.numeroAnterior)
            let resultado = 0
            switch(this.operador) {
                case '*':
                    resultado = parseFloat(this.numeroAtual) * parseFloat(this.numeroAnterior);
                    this.display = resultado.toString()
                   break;
                case '/':
                    resultado = parseFloat(this.numeroAnterior) / parseFloat(this.numeroAtual);
                    this.display = resultado.toString()
                    break;
                case '-':
                    resultado = parseFloat(this.numeroAnterior) - parseFloat(this.numeroAtual);
                    this.display = resultado.toString()
                    break;
                case '+':
                    resultado = parseFloat(this.numeroAtual) + parseFloat(this.numeroAnterior);
                    this.display = resultado.toString()
                    console.log(this.numeroAtual, this.numeroAnterior)
                   break;
                default:
                    alert('Erro de operação');
            }
        },
        lidarNumero(valor) {
            console.log("O botão digitado foi: ", valor);
            console.log(this.numeroAtual, this.numeroAnterior)
            //Condição para verificar se o primeiro numero é 0 e substituí-lo como uma calculadora faz.
            if(this.display  === "0"){
                this.display = valor
            }else {
                this.display += valor
            }
            this.numeroAtual += valor;
        }
    }
}).mount("#app");