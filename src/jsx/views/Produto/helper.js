export const atualizaSubtotal = (produto) => {

  let valorUnidade = parseFloat(produto.valorUnidade);
  let quantidade=  parseInt(produto.quantidade);
  let subtotal= valorUnidade * quantidade;

  return parseFloat(subtotal).toFixed(2); 
}

export const calcularTotal = (itens) => {
  let total = 0;
  // Verifica se carrinhoExistente é um objeto válido e se possui a propriedade itens
  if (itens.length > 0) {
    // Percorre todos os itens do carrinho
    itens.forEach(item => {       
        // Soma o valor do preço ao total
        total += parseFloat(item.subtotal);
    });
    total+=1;
  }

  return parseFloat(total).toFixed(2);
}


const adicionaProduto = (itens, produto) => {
 
  // Verifica se o produto já está no carrinho
  const index = itens.findIndex(item => item.id_produto == produto.id_produto);

  if(index !== -1 && itens[index].tipo == 'fixo') {
    // Soma a quantidade nova com a já existente
    itens[index].quantidade += produto.quantidade;

    // Atualiza o subtotal
    let subtotal = parseFloat(itens[index].subtotal) + parseFloat(produto.subtotal);
    itens[index].subtotal = subtotal.toFixed(2);
  }else {
    // Se o produto não estiver no carrinho ou não for do tipo 'fixo', adiciona-o à lista do carrinho
    itens.push(produto);
  }

  return itens;
}


export const addProdutoCarrinho = (produto, id_loja, carrinho, setCarrinho) => {

  let carrinhoExistente;

  // Verifique se o carrinho é nulo
  if (carrinho == null) {
    // Inicialize o carrinho como um objeto vazio
    carrinhoExistente = {
      total: 0,
      id_loja: id_loja,
      itens: []
    };
  } else {
    // Se o carrinho não for nulo, crie uma cópia usando o spread operator
    carrinhoExistente = { ...carrinho };
  }

  if(carrinhoExistente.id_loja == id_loja){
    carrinhoExistente.itens= adicionaProduto(carrinhoExistente.itens, produto); 
    carrinhoExistente.total= calcularTotal(carrinhoExistente.itens);
    setCarrinho(carrinhoExistente);
    swal("Sucesso!", "Produto adicionado ao seu carrinho!", "success");
  }
  else{
    swal({
      title: "Deseja limpar seu carrinho?",
      text: "Você está tentando adicionar itens de lojas diferentes!",
      icon: "warning",
      buttons: {
        cancel: "Cancelar", // Nome para o botão de cancelar
        confirm: "Limpar Carrinho" // Nome para o botão de confirmar
      },
      dangerMode: true,
    }).then((limpou) => {
      if (limpou) {
        setCarrinho(null);
        swal("Feito! Seu carrinho está sem itens!", {
          icon: "success",
        });
      } else {
        swal("Seu carrinho não foi alterado!");
      }
    })
  }

};


export const avisoLogin = () => {

  swal({
    title: "Atenção!",
    text: "Para adicionar produtos ao seu carrinho você precisar estador logado. Por favor, faça seu login.",
    icon: "warning",
    buttons: {
      cancel: "Cancelar",
      confirm: "Fazer Login"
    },
    dangerMode: false,
  }).then((confirmou) => {
    if (confirmou) {
      window.location.href = '/logout';
    }
  })
}