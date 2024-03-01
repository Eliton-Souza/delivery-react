import { getCarrinho, limparCarrinho, setCarrinhoCompras } from "../../../services/api";

export const carrinhoVazio = (carrinho) => {
  if(carrinho.itens.length == 0){
    limparCarrinho();
    return true;
  }
  return false;
}

export const atualizaSubtotal = (produto) => {

    let valorUnidade = parseFloat(produto.valorUnidade);
    let quantidade=  parseInt(produto.quantidade);
    let subtotal= valorUnidade * quantidade;
    produto.subtotal = subtotal.toFixed(2);

    return true;
}

export const calculaTotalNova = (carrinho) => {
  let total = 0;
 
  carrinho.itens.forEach(item => {       
      // Soma o valor do preço ao total
    total += parseFloat(item.subtotal);
  });

  total+=1;

  carrinho.total= parseFloat(total).toFixed(2);
  return true;
}

const validaProduto = async (itens, produto, id_loja) => {
    // Verifica se o produto já está no carrinho
    const produtoExistenteIndex = itens.findIndex(item => item.id_produto == produto.id_produto);

    if (produtoExistenteIndex !== -1 && itens[produtoExistenteIndex].tipo == 'fixo') {
        // Soma a quantidade nova com a já existente
        itens[produtoExistenteIndex].quantidade += produto.quantidade;

      let subtotal = parseFloat(itens[produtoExistenteIndex].subtotal);
      subtotal += parseFloat(produto.subtotal);
      itens[produtoExistenteIndex].subtotal = subtotal.toFixed(2);
    } else if (!itens.id_loja || itens.id_loja == id_loja) {
      // Se o produto não estiver no carrinho e for da mesma loja, adiciona-o à lista do carrinho
      itens.push(produto);
    } else{
      swal("Oops", "Todos os itens de um carrinho devem ser da mesma loja", "error");
      return false;
    }

  return true;
}


const calcularTotal = async (itens) => {
    let total = 0;
    // Verifica se carrinhoExistente é um objeto válido e se possui a propriedade itens
    if (itens) {
      // Percorre todos os itens do carrinho
      itens.forEach(item => {       
          // Soma o valor do preço ao total
          total += parseFloat(item.subtotal);
      });
    }

    return parseFloat(total).toFixed(2);
}

export const addProdutoCarrinho = async (produto, id_loja) => {
    // Verifica se já existe algum item no carrinho
    let carrinhoExistente = getCarrinho();
  
    // Se não houver itens no carrinho, inicializa como uma lista vazia
    if (!carrinhoExistente) {
      // Inicialize o carrinho com as propriedades desejadas
      carrinhoExistente = {
        total: 0,
        id_loja: id_loja,
        itens: []
      };
    } else {
      // Caso contrário, faz o parse do JSON
      carrinhoExistente = JSON.parse(carrinhoExistente);
    }

    const result= validaProduto(carrinhoExistente.itens, produto, id_loja); 
    
    if(result){
        carrinhoExistente.total= await calcularTotal(carrinhoExistente.itens);
        setCarrinhoCompras(carrinhoExistente);
    }
  };