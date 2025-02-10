// Array global para armazenar as tarefas
let tarefas = [];

/**
 * Carrega tarefas salvas no localStorage ao iniciar
 */
window.onload = function () {
  let tarefasSalvas = localStorage.getItem("tarefas");

  // Se houver tarefas salvas, carrega para a lista
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    tarefas.forEach((tarefa) =>
      adicionarTarefa(tarefa.texto, tarefa.tempoRestante, false)
    );
  }
};

/**
 * Adiciona uma nova tarefa com timer e persistência no localStorage
 */
function adicionarTarefa(texto = "", tempoRestante = 3000, salvar = true) {
  let input = document.getElementById("nova-tarefa");
  let lista = document.getElementById("lista-tarefas");

  // Se a tarefa for digitada pelo usuário, usa o valor do input
  if (texto === "") {
    texto = input.value.trim();
  }

  if (texto === "") return; // Evita adicionar tarefas vazias

  let li = document.createElement("li");

  // Botão para remover a tarefa manualmente
  let botaoRemover = document.createElement("button");
  botaoRemover.textContent = "❌";
  botaoRemover.classList.add("remover");
  botaoRemover.onclick = function () {
    removerTarefa(li, texto);
  };

  // Botão para pausar/retomar o timer
  let botaoPausar = document.createElement("button");
  botaoPausar.textContent = "⏸ Pausar";
  botaoPausar.classList.add("pausar");

  // Exibição do tempo restante
  let tempoElemento = document.createElement("span");
  tempoElemento.className = "timer";

  let pausado = false;
  let intervalo;

  function atualizarTimer() {
    if (!pausado) {
      let minutos = Math.floor(tempoRestante / 60);
      let segundos = tempoRestante % 60;
      tempoElemento.textContent = `⏳ ${minutos}:${
        segundos < 10 ? "0" : ""
      }${segundos}`;

      if (tempoRestante <= 0) {
        removerTarefa(li, texto);
        clearInterval(intervalo);
      }

      tempoRestante--;
      salvarTarefas();
    }
  }

  intervalo = setInterval(atualizarTimer, 1000);

  botaoPausar.onclick = function () {
    pausado = !pausado;
    botaoPausar.textContent = pausado ? "▶ Retomar" : "⏸ Pausar";
  };

  atualizarTimer();

  // Adiciona elementos na lista
  li.appendChild(document.createTextNode(texto + " "));
  li.appendChild(tempoElemento);
  li.appendChild(botaoPausar);
  li.appendChild(botaoRemover);

  lista.appendChild(li);

  if (salvar) {
    tarefas.push({ texto, tempoRestante });
    salvarTarefas();
  }

  input.value = "";
}

/**
 * Remove uma tarefa e atualiza o localStorage
 */
function removerTarefa(li, texto) {
  li.remove();
  tarefas = tarefas.filter((tarefa) => tarefa.texto !== texto);
  salvarTarefas();
}

/**
 * Salva as tarefas no localStorage
 */
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
