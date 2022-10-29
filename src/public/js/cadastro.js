var mensagemErro1 = document.getElementById('erro1');
var mensagemErro2 = document.getElementById('erro2');
var mensagemErro3 = document.getElementById('erro3');
var mensagemErro4 = document.getElementById('erro4');
var mensagemErro5 = document.getElementById('erro5');
var mensagemErro6 = document.getElementById('erro6');
var mensagemErro7 = document.getElementById('erro7');
var senha = document.getElementById('senha');



function validaNome(elemento) {

  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8) {
    mensagemErro1.innerHTML = `<div class="erroM"><p>NOME inválido. Tente novamente!</p></div>`
    $(elemento).css("border-color", "red")
  } else {
    mensagemErro1.innerHTML = ``
  }
}

function validaEmail(elemento) {

  let regexEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexEmail(elemento.value)) {
    mensagemErro2.innerHTML = `<div class="erroM"><p>EMAIL inválido. Tente novamente!</p></div>`
    $(elemento).css("border-color", "red")
  }
  else {
    mensagemErro2.innerHTML = ``
  }
}

function validaSenha(elemento) {

  let regexSenha = (senha) => {
    return senha.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexSenha(elemento.value)) {
    mensagemErro3.innerHTML = `<div class="erroM"><p>SENHA inválido. Tente novamente!</p></div>`
    $(elemento).css("border-color", "red")
  }
  else {
    mensagemErro3.innerHTML = ``
  }
}

function validaComfirmaSenha(elemento) {

  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value == senha.value) {
    mensagemErro7.innerHTML = ``
  }
  else {
    mensagemErro7.innerHTML = `<div class="erroM"><p>SENHA não conferem. Tente novamente!</p></div>`
    $(elemento).css("border-color", "red")
  }
}



function validaCPF(elemento) {
  let regexCPF = (cpf) => {
    return senha.match(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexCPF(elemento.value)) {
    mensagemErro4.innerHTML = `<div class="erroM"><p>CEP inválido. Tente novamente!</p></div>`
    $(elemento).css("border-color", "red")
  }
  else {
    mensagemErro4.innerHTML = ``
  }
}

function validaTel(elemento) {

  let regexTel = (tel) => {
    return senha.match(/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/)
  }
  $(elemento).css("border-color", "#dde4e8")

  if (elemento.value.length < 8 || !regexTel(elemento.value)) {
    mensagemErro5.innerHTML = `<div class="erroM"><p>TELEFONE inválido. Tente novamente!</p></div>`
    $(elemento).css("border-color", "red")
  }
  else {
    mensagemErro5.innerHTML = ``
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

async function realizaLogin(email, senha) {
  const dados = {
    email: email,
    senha: senha
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

$("#btn-pagamento").click(() => {
  alert("teste")
});



