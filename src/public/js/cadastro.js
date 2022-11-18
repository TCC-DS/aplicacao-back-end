var mensagemErro1 = document.getElementById('erro1');
var mensagemErro2 = document.getElementById('erro2');
var mensagemErro3 = document.getElementById('erro3');
var mensagemErro4 = document.getElementById('erro4');
var mensagemErro5 = document.getElementById('erro5');
var mensagemErro6 = document.getElementById('erro6');
var mensagemErro7 = document.getElementById('erro7');
var senha = document.getElementById('senha');

function validaNome(elemento) {
  $(elemento).css("border-color", "#dde4e8");

  if (elemento.value.length < 8) {
    $(elemento).css("border-color", "red");
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }
}

function validaEmail(elemento) {

  let regexEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexEmail(elemento.value)) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }

}

function validaSenha(elemento) {

  let regexSenha = (senha) => {
    return senha.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W+)(?=^.{6,50}$).*$/g)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexSenha(elemento.value)) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }
}

function validaComfirmaSenha(elemento) {

  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value != senha.value) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }

}

function validaCPF(elemento) {
  let regexCPF = (cpf) => {
    return cpf.match(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexCPF(elemento.value)) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }

}

function validaTel(elemento) {

  let regexTel = (tel) => {
    return tel.match(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexTel(elemento.value)) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }
}

function validaCep(elemento) {
  $(elemento).css("border-color", "#dde4e8")
  async function buscaEndereco(cep) {
    var mensagemErro6 = document.getElementById('erro6')
    mensagemErro6.innerHTML = ``
    try {
      var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      var consultaCEPConvertida = await consultaCEP.json()
      if (consultaCEPConvertida.erro) {
        throw Error('CEP não existente!')
      }
      var cidade = document.getElementById('cidade')
      var logradouro = document.getElementById('endereco')
      var estado = document.getElementById('estado')

      cidade.value = consultaCEPConvertida.localidade
      logradouro.value = consultaCEPConvertida.logradouro
      estado.value = consultaCEPConvertida.uf

      console.log(consultaCEPConvertida)
      return consultaCEPConvertida
    } catch (erro) {
      mensagemErro6.innerHTML = `<div class="erroM"><p>CEP inválido. Tente novamente!</p></div>`
      console.log(erro)
      $(elemento).css("border-color", "red")
    }
  }

  var cep = document.getElementById('cep')
  cep.addEventListener("focusout", () => buscaEndereco(cep.value))

}

function validaCartao(elemento) {
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 17) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }
}

function validaCvv(elemento) {
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 3) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }
}

function validaDataCartao(elemento) {
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 7) {
    $(elemento).css("border-color", "red")
  }
  else {
    $(elemento).css("border-color", "#1CC88A");
  }
}

function validaSelect(elemento) {
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value == "0") {
    $(elemento).css("border-color", "red")
  }
}

async function realizaCadastro(nome, email, telefone, cpf, senha, confirmaSenha) {
  const dados = {
    nome: nome,
    email: email,
    telefone: telefone,
    cpf_cnpj: cpf,
    senha: senha,
    confirma_senha: confirmaSenha,
  };

  try {
    const requisicao = await axios.post('/cadastro', dados);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: setTimeout(() => {
        window.location.href = 'http://localhost:3333/'
      }, 1600)
    });

    mudaStatusBarraProgresso();

    Toast.fire({
      icon: 'success',
      title: requisicao.data.mensagem
    });

  }
  catch (erro) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'error',
      title: '',
      text: erro.response.data.mensagem,
    })
  }
}

function verificaSelects() {
  let valido = true;
  $('select').each(function () {
    if (this.value == "0") valido = false;
  });
  return valido;
}

function verificaPreenchimentoUsuario(qtdCampos) {
  let camposValidos = 0;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
  $('input').each(function () {
    if ($(this).css('border-color') == 'rgb(255, 0, 0)') {
      Toast.fire({
        icon: 'error',
        title: 'Preencha os campos com borda em vermelho !',
      })
      return false;
    }
  });

  $('input').each(function () {
    if ($(this).css('border-color') == 'rgb(28, 200, 138)') camposValidos++
  });

  if (camposValidos != qtdCampos) {
    Toast.fire({
      icon: 'error',
      title: 'Preencha todos os campos !',
    })
    return false;
  }

  return true;
}

function resetaValidacoes() {
  $("input").each(function () {
    if ($(this).css('border-color') == 'rgb(28, 200, 138)') {
      $(this).css('border-color', 'rgb(223,229,233)')
    }
  });
}

function mudaStatusBarraProgresso() {
  $(".ativo").addClass("concluido");
  $(".ativo").removeClass("ativo");
  $(".inativo").addClass("ativo");
  $(".inativo").removeClass("inativo");
  $(".li-barra-progresso").addClass("inativo");
}

$("#btn-usuario").click(() => {
  if (verificaPreenchimentoUsuario(6)) {
    mudaStatusBarraProgresso();
    $("#formulario_usuario").css("display", "none");
    $("#formulario_pagamento").css("display", "");
    resetaValidacoes();
  }
});

$("#btn-pagamento").click(() => {
  const nomeCompleto = $("#nome").val();
  const email = $("#email").val();
  const senha = $("#senha").val();
  const confirmaSenha = $("#confirmasenha").val();
  const cpf = $("#cpf").val();
  const telefone = $("#tel").val();

  console.log(verificaPreenchimentoUsuario(4))
  console.log(verificaSelects())


  if (verificaPreenchimentoUsuario(4) && verificaSelects()) {
    mudaStatusBarraProgresso();
    realizaCadastro(nomeCompleto, email, telefone, cpf, senha, confirmaSenha);
  }


});

$(".mudaValor").change(() => {
  const planos = {
    basicoMensal: 49,
    intermediarioMensal: 69,
    ultraMensal: 99,
    basicoAnual: 29,
    intermediarioAnual: 49,
    ultraAnual: 59,
  }

  if ($("#plano").val() != null && $("#formatoPlano").val() != null) {
    let planoEscolhido = $("#plano").val() + $("#formatoPlano").val();
    $("#valorPlano").val(planos[planoEscolhido]);
  }
})

$(document).ready(() => {
  $("#cpf").mask('000.000.000-00', { reverse: true });
  $("#numCartao").mask('0000-0000-0000-0000', { reverse: true });
  $("#tel").mask('(00) 00000-0000');
  $("#data").mask('00/0000');
})



