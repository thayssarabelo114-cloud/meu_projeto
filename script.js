let carrinho = [];
let total = 0;
let horarioSelecionado = "";


// Carrinho
function adicionarCarrinho(produto, preco) {
  let itemExistente = carrinho.find(item => item.produto === produto);
  if(itemExistente){
    itemExistente.quantidade += 1;
    itemExistente.precoTotal += preco;
  } else {
    carrinho.push({ produto, precoUnitario: preco, precoTotal: preco, quantidade: 1 });
  }
  atualizarCarrinho();
  alert(`${produto} adicionado ao carrinho!`);
}

function removerItem(produto) {
  carrinho = carrinho.filter(item => item.produto !== produto);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let itensCarrinho = document.getElementById("itens-carrinho");
  let totalEl = document.getElementById("total");
  itensCarrinho.innerHTML = "";
  total = 0;
  carrinho.forEach(item => {
    total += item.precoTotal;
    itensCarrinho.innerHTML += `<div class="item-carrinho">
      <span>${item.produto} x${item.quantidade}</span>
      <span>R$ ${item.precoTotal},00 
        <button onclick="removerItem('${item.produto}')">❌</button>
      </span>
    </div>`;
  });
  totalEl.textContent = total;
}

// Finalizar pedido
function finalizarPedido() {
  if(carrinho.length === 0){
    alert("Carrinho vazio!");
    return;
  }
  
  const meuNumero = "5598970169013"; // Seu número do WhatsApp (55DDXXXXXXXXX)
  
  let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";
carrinho.forEach(item => {
  mensagem += `- ${item.produto} x${item.quantidade} (R$ ${item.precoTotal},00)\n`;
});
mensagem += `\nTotal: R$ ${total},00`;
mensagem += `\nAguardo o contato. Obrigada! 💖`;

  // Abre o WhatsApp diretamente pro seu número
  window.open("https://wa.me/" + meuNumero + "?text=" + encodeURIComponent(mensagem), "_blank");

  // Limpar carrinho
  carrinho = [];
  atualizarCarrinho();
  
  alert("Pedido enviado com sucesso!");
}

