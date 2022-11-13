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
}


async function buscaDados() {
  try {
    const requisicao = await axios.get('/home/buscaDados');
    console.log(requisicao.data.dados)
    $("#container").removeClass("body_loading");
    $("#img_loading").css("display", "none");
    return requisicao.data.dados;
  } catch (erro) {
    $("#container").removeClass("body_loading");
    $("#img_loading").css("display", "none");
    return erro.response.data.dados;
  }
}

$(document).ready(() => {
  $("#container").addClass("body_loading");
  $("#img_loading").css("display", "");

  buscaDados();



  //PIZZA

  const data_media = {
    labels: [
      'Baixa',
      'Média',
      'Alta',
      'Muito Alta',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [200, 50, 100, 30],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(28,200,138)'
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


  //BARRA


  const labels_barra = [
    'Janeiro',
    'Fevereiro',
    'Maio',
    'Abril',
    'Maio',
    'Julho',
  ];

  const data_barra = {
    labels: labels_barra,
    datasets: [{
      label: 'Avaliações',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 1, 3.5, 2, 3, 1, 4],
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
});


