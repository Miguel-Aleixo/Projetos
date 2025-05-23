function Calculadora() {
  this.display = document.querySelector('.display');

  this.inicia = () => {
    this.cliqueBotoes();
    this.pressionaBackSpace();
    this.pressionaEnter();
  };

  this.pressionaBackSpace = () => {
    this.display.addEventListener('keydown', e => {
      if (e.keyCode === 8) {
        e.preventDefault();
        this.apagaUm();
      }
    });
  };

  this.pressionaEnter = () => {
    this.display.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        this.realizaConta();
      }
    });
  };

  this.realizaConta = () => {
    let conta = this.display.value;

    try {
      conta = eval(conta);

      if(!conta) {
        alert('Conta inválida');
        return;
      }

      this.display.value = String(conta);
    } catch(e) {
      alert('Conta inválida');
      return;
    }
  };

  this.clearDisplay = () => {
    this.display.value = '';
  };

  this.apagaUm = () => {
    this.display.value = this.display.value.slice(0, -1);
  };

  this.cliqueBotoes = () => {
    document.addEventListener('click', e => {
      const el = e.target;

      if(el.classList.contains('btn-num')) {
        this.btnParaDisplay(el.innerText);
      } 

      if(el.classList.contains('btn-clear')) {
        this.clearDisplay();
      }

      if(el.classList.contains('btn-del')) {
        this.apagaUm();
      }

      if(el.classList.contains('btn-eq')) {
        this.realizaConta();
      }

      this.display.focus();
    });
  };

  this.btnParaDisplay = (valor) => {
    this.display.value += valor;
  };
}

const calculadora = new Calculadora();
calculadora.inicia();