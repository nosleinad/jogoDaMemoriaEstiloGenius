const Genius = {
    nomeDasCores: ["verde", "vermelho", "amarelo", "azul"],
    notas: [121.6, 225.7, 330.6, 462.0],
  
    sequencia: [],
    sequenciaDoJogador: [],
    gameOver: true,
    contagemDeRodadas: 0,
    limiteDeRodadas: 4,
  
    titulo: document.querySelector("#controle > h1"),
    botaoDePlay: document.querySelector("#controle > button"),
  
    comecarJogo() {
      this.contagemDeRodadas = 0;
      this.gameOver = false;
      this.sequencia = [];
      this.botaoDePlay.innerHTML = "Reiniciar";
      this.escrever("Genius!");
      this.habilitarBotoes();
      this.novaRodada();
    },
  
    novaRodada() {
      this.contagemDeRodadas++;
      this.sequenciaDoJogador = [];
      this.gerarToque();
      setTimeout(() => { this.tocarSequencia() }, 1000)
    },
  
    jogar(indiceDaCor) {
      this.tocarNota(indiceDaCor);
  
      if (this.gameOver) return;
  
      this.sequenciaDoJogador.push(indiceDaCor);
  
      this.sequenciaDoJogador.forEach((jogada, index) => {
        if (jogada != this.sequencia[index]) {
          this.finalizarJogo("Game Over!");
        }
      });
  
      if (this.gameOver) return;
  
      if (this.sequenciaDoJogador.length == this.sequencia.length) {
        if (this.contagemDeRodadas >= this.limiteDeRodadas) {
          this.finalizarJogo("Parabéns, Você Ganhou!");
        } else {
          this.novaRodada();
        }
      }
    },
  
    gerarToque() {
      const randomInt = this.gerarNumeroAleatorio();
      this.sequencia.push(randomInt);
    },
  
    gerarNumeroAleatorio() {
      return Math.floor(Math.random() * 4);
    },
  
    tocarSequencia() {
      this.desabilitarBotoes();
  
      let iteradorDaSequencia = 0;
      let devoClarear = true;
  
      const velocidade = 500;
  
      const intervalo = setInterval(() => {
        const indiceDaSequencia = this.sequencia[iteradorDaSequencia];
        const cor = this.nomeDasCores[indiceDaSequencia];
        const botaoDeCor = document.getElementById(cor);
  
        if (devoClarear) {
          botaoDeCor.classList.add('active')
          this.tocarNota(indiceDaSequencia);
        } else {
          botaoDeCor.classList.remove('active')
          iteradorDaSequencia++;
        }
  
        if (iteradorDaSequencia >= this.sequencia.length) {
          clearInterval(intervalo);
          this.habilitarBotoes();
        }
  
        devoClarear = !devoClarear;
      }, velocidade);
    },
  
    habilitarBotoes() {
      const botoes = document.querySelectorAll("#botao > button");
      botoes.forEach((botao) => {
        botao.removeAttribute("disabled");
      });
    },
  
    desabilitarBotoes() {
      const botoes = document.querySelectorAll("#botao > button");
      botoes.forEach((botao) => {
        botao.setAttribute("disabled", "disabled");
      });
    },
  
    finalizarJogo(mensagem) {
      this.gameOver = true;
      this.escrever(mensagem);
      this.desabilitarBotoes();
    },
  
    escrever(texto) {
      this.titulo.innerHTML = texto;
    },
  
    tocarNota(indiceDaNota) {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(this.notas[indiceDaNota], "8n");
    },
  };
  
  document.querySelector("#controle button").onclick = () => {
    Genius.comecarJogo();
  };
  document.querySelectorAll("#botao > button").forEach((botao, index) => {
    botao.onclick = () => {
      Genius.jogar(index);
    };
  });
  