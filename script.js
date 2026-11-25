// Central de Utilidades — Entregas 1 e 2
// Entrega 1: fundamentos, funções, condicionais, for e do...while.
function lerNumero(mensagem) {
  const entrada = prompt(mensagem);
  if (entrada === null || entrada.trim() === "") return null;
  return Number(entrada.replace(",", "."));
}

function moeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcularDesconto(preco, percentual) {
  return preco - (preco * percentual / 100);
}

function calculadoraDescontos() {
  const preco = lerNumero("Preço original (R$):");
  if (preco === null) return;
  const desconto = lerNumero("Desconto (%):");
  if (desconto === null) return;

  if (!Number.isFinite(preco) || preco <= 0 || !Number.isFinite(desconto) || desconto < 0 || desconto > 100) {
    alert("Informe preço positivo e desconto entre 0 e 100%.");
    return;
  }

  const final = calcularDesconto(preco, desconto);
  alert("CALCULADORA DE DESCONTOS\nPreço original: " + moeda(preco) +
    "\nDesconto: " + desconto + "%" +
    "\nEconomia: " + moeda(preco - final) +
    "\nPreço final: " + moeda(final));
}

function calcularParcela(total, quantidade) {
  return total / quantidade;
}

function calculadoraParcelas() {
  const total = lerNumero("Valor total da compra (R$):");
  if (total === null) return;
  const quantidade = lerNumero("Quantidade de parcelas:");
  if (quantidade === null) return;

  if (!Number.isFinite(total) || total <= 0 || !Number.isInteger(quantidade) || quantidade <= 0) {
    alert("Informe valor positivo e quantidade inteira de parcelas maior que zero.");
    return;
  }

  alert("Total: " + moeda(total) +
    "\nParcelas: " + quantidade +
    "\nCada parcela: " + moeda(calcularParcela(total, quantidade)) +
    "\nSem juros.");
}

function simularInvestimento(inicial, aporte, taxa, meses) {
  let saldo = inicial;
  let totalInvestido = inicial;

  for (let mes = 1; mes <= meses; mes++) {
    saldo *= 1 + taxa / 100;
    saldo += aporte; // aporte ao final do mês
    totalInvestido += aporte;
  }

  return {
    saldoFinal: saldo,
    totalInvestido: totalInvestido,
    rendimento: saldo - totalInvestido
  };
}

function simuladorInvestimentos() {
  const inicial = lerNumero("Valor inicial (R$):");
  if (inicial === null) return;
  const aporte = lerNumero("Aporte mensal (R$):");
  if (aporte === null) return;
  const taxa = lerNumero("Taxa mensal (%):");
  if (taxa === null) return;
  const meses = lerNumero("Período em meses:");
  if (meses === null) return;

  if (![inicial, aporte, taxa, meses].every(Number.isFinite) ||
      inicial < 0 || aporte < 0 || taxa < 0 ||
      !Number.isInteger(meses) || meses <= 0) {
    alert("Valores e taxa devem ser não negativos; meses deve ser inteiro positivo.");
    return;
  }

  const resultado = simularInvestimento(inicial, aporte, taxa, meses);
  alert("SIMULADOR DE INVESTIMENTOS\nSaldo final: " + moeda(resultado.saldoFinal) +
    "\nTotal investido: " + moeda(resultado.totalInvestido) +
    "\nRendimento: " + moeda(resultado.rendimento));
}

// Entrega 2 — Arrays, objetos e funções no Divisor de Despesas.
// Cada despesa é um objeto { descricao, valor } armazenado no array despesas.
function dividirDespesasEntrega2() {
  const despesas = [];
  let continuar = true;

  // Cadastra despesas até que o usuário escolha não adicionar outra.
  while (continuar) {
    const descricaoEntrada = prompt("Descrição da despesa (ex.: supermercado):");
    if (descricaoEntrada === null) break;

    const descricao = descricaoEntrada.trim();
    if (descricao === "") {
      alert("A descrição não pode ficar vazia. Tente novamente.");
      continue;
    }

    const valor = lerNumero("Valor da despesa '" + descricao + "' (R$):");
    if (valor === null) break;
    if (!Number.isFinite(valor) || valor <= 0) {
      alert("Valor inválido. Informe um valor maior que zero.");
      continue;
    }

    // push() adiciona o objeto da despesa ao array.
    despesas.push({ descricao: descricao, valor: valor });
    continuar = confirm("Despesa cadastrada! Deseja informar outra despesa?");
  }

  if (despesas.length === 0) {
    alert("Nenhuma despesa foi cadastrada.");
    return;
  }

  const pessoas = lerNumero("Informe a quantidade de pessoas que dividirão as despesas:");
  if (pessoas === null) return;
  if (!Number.isInteger(pessoas) || pessoas <= 0) {
    alert("Quantidade inválida. Informe um número inteiro maior que zero.");
    return;
  }

  const resultado = calcularTotalDespesas(despesas);
  const valorPorPessoa = resultado.total / pessoas;

  alert(
    "DIVISOR DE DESPESAS\n\n" +
    "DETALHAMENTO DAS DESPESAS\n" + resultado.detalhes +
    "\nTotal das despesas: " + moeda(resultado.total) +
    "\nQuantidade de pessoas: " + pessoas +
    "\nValor por pessoa: " + moeda(valorPorPessoa)
  );
}

// Percorre o array e calcula o total, além de montar o detalhamento.
function calcularTotalDespesas(despesas) {
  let total = 0;
  let detalhes = "";

  for (let indice = 0; indice < despesas.length; indice++) {
    const despesa = despesas[indice];
    total += despesa.valor;
    detalhes += (indice + 1) + ". " + despesa.descricao + ": " + moeda(despesa.valor) + "\n";
  }

  return { total: total, detalhes: detalhes };
}
