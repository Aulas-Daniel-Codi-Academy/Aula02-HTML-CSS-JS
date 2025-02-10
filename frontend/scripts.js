/**
 * Função que adiciona uma nova tarefa à lista
 */
function adicionarTarefa() {
  // Obtém o elemento input onde o usuário digita a nova tarefa
  let input = document.getElementById("nova-tarefa");

  // Obtém a lista de tarefas onde os itens serão adicionados
  let lista = document.getElementById("lista-tarefas");

  // Verifica se o campo de entrada não está vazio (evita adicionar tarefas em branco)
  if (input.value.trim() === "") return;

  // Cria um novo elemento <li> para representar a tarefa
  let li = document.createElement("li");

  // Define o conteúdo do <li>, incluindo o texto da tarefa e um botão de remover
  li.innerHTML = `${input.value} <button onclick="removerTarefa(this)">❌</button>`;

  // Adiciona o novo <li> à lista
  lista.appendChild(li);

  // Limpa o campo de entrada para permitir adicionar outra tarefa
  input.value = "";
}

/**
 * Função que remove uma tarefa da lista
 * @param {HTMLElement} botao - O botão de remoção clicado
 */
function removerTarefa(botao) {
  // Remove o elemento <li> correspondente ao botão clicado
  botao.parentElement.remove();
}
