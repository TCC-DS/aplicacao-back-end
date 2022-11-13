const SerpApi = require('google-search-results-nodejs');
const { differenceInMinutes, format } = require('date-fns');
const ultimaAtualizacao = undefined ?? Date.now();
var dadosEnviados = false;

class HomeController {
  static index(_req, res) {
    return res.render("home")
  }

  static buscaDados(_req, res) {
    const dataAtual = Date.now();
    const atualizacao = format(ultimaAtualizacao, "HH:mm")


    if (dadosEnviados == false || differenceInMinutes(dataAtual, ultimaAtualizacao) >= 30) {
      dadosEnviados = true;
      const search = new SerpApi.GoogleSearch("f34edcd03c0d6264894319ba5051ebb368d153e42e1dc4bb2a5a78b021ea3be9");

      const config = {
        engine: "google_maps_reviews",
        data_id: "0x94c856f0dd034083:0x9a3c1f8c167a3ac1",
        sort_by: "newestFirst",
        hl: "pt-pt"
      };

      const buscaDadosApi = () => {
        return new Promise((resolve) => search.json(config, resolve))
      }

      const pegaResultados = async () => {
        const todasReviews = {
          reviews: [],
        };
        while (true) {
          const resultadoJson = await buscaDadosApi();
          if (!todasReviews.placeInfo) todasReviews.placeInfo = resultadoJson.place_info;
          if (resultadoJson.reviews) todasReviews.reviews.push(...resultadoJson.reviews);
          else break;
          if (resultadoJson.serpapi_pagination?.next_page_token) {
            config.next_page_token = resultadoJson.serpapi_pagination?.next_page_token;
          }
          else break;
        }
        return todasReviews;
      };

      pegaResultados().then((dados) => {
        dados.ultimaAtualizacao = atualizacao
        return res.status(200).json({ dados: dados });
      })

    }

    else return res.status(200).json({ dados: { mensagem: "Nada de novo por aqui", ultimaAtualizacao: atualizacao } });
  }
}



module.exports = HomeController;