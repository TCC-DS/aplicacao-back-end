let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
  }
};

async function buscaDados() {
  $("#container").addClass("body_loading");
  $("#img_loading").css("display", "");
  try {
    const requisicao = await axios.get('/home/buscaDados');

    return requisicao.data.dados;
  } catch (erro) {

    return erro.response.data.dados;
  } finally {
    $("#container").removeClass("body_loading");
    $("#img_loading").css("display", "none");
  }
};

function preencheCards(total, media, ultimaAtualizacao) {
  $("#total_avaliacoes").text(total)
  $("#media_avaliacoes").text(media)
  $("#ultima_atualizacao").text(ultimaAtualizacao)
};

function graficoMedia(avaliacoes) {
  const data_media = {
    labels: [
      'Muito Baixa',
      'Baixa',
      'Média',
      'Alta',
      'Muito Alta',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [avaliacoes[1], avaliacoes[2], avaliacoes[3], avaliacoes[4], avaliacoes[5]],
      backgroundColor: [
        '#071E22',
        '#FF6384',
        '#FFCD56',
        '#36A2EB',
        '#1CC88A',
      ],
      hoverOffset: 5
    }]
  };

  const config_media = {
    type: 'doughnut',
    data: data_media,
  };
  const grafico_media = new Chart(
    document.getElementById('grafico_media'),
    config_media
  );
};

function graficoBarra(avaliacoes) {
  const labels_barra = [];
  const data = [];

  for (let key in avaliacoes) {
    labels_barra.push(key);
    data.push(avaliacoes[key])
  }

  const data_barra = {
    labels: labels_barra,
    datasets: [{
      label: 'Avaliações',
      backgroundColor: '#36A2EB',
      borderColor: '#21325b',
      data: data,
    }]
  };



  const config_barra = {
    type: 'line',
    data: data_barra,
    options: {}
  };

  const grafico_todas_avalicacoes = new Chart(
    document.getElementById('grafico_todas_avalicacoes'),
    config_barra
  );
};

$(document).ready(() => {

  buscaDados().then(dados => {

    const { reviews: total, rating: media } = dados.placeInfo;
    const { ultimaAtualizacao, reviews } = dados;
    const mediaAvalicacoes = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
    const dataAvaliacoes = {};

    const comentarios = [];

    preencheCards(total, media, ultimaAtualizacao);

    for (let i in reviews) {
      let review = {
        usuario: reviews[i].user.name,
        foto: reviews[i].user.thumbnail,
        avaliacao: reviews[i].rating,
        data: reviews[i].date,
        comentario: reviews[i].snippet
      }
      comentarios.push(review)

      reviews[i].rating[mediaAvalicacoes] = mediaAvalicacoes[reviews[i].rating]++;

      (!(reviews[i].date in dataAvaliacoes))
        ? dataAvaliacoes[reviews[i].date] = 1
        : dataAvaliacoes[reviews[i].date] += 1
    };

    $.each(comentarios, (_, item) => {
      let estrelas = "";
      for (let i = 1; i <= item.avaliacao; i++) {
        estrelas += "<i class='bx bxs-star' style='color:#ffcd56'></i>"
      }
      const divPerfil =
        `
        <div class='div_resposta' >
          <img id='img_perfil' src='${item.foto}'>
          <div class='perfil'>
            <span class='avaliacao_nome' id='nome_perfil'>${item.usuario}</span>
            <div class='avaliacao'>
              ${estrelas}
              <span id='tempo' id='data_perfil'>${item.data}</span>
            </div>
            <span id='comentario_perfil'>${item.comentario}</span>
          </div>
        </div>
        `;

      $("#scroll").append(divPerfil);
    });

    $("#scroll").append("<div class='div-child'></div>");

    graficoBarra(dataAvaliacoes);
    graficoMedia(mediaAvalicacoes);
  });
});