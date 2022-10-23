const { Client, TextContent } = require("@zenvia/sdk");
const key = new Client('eaQiR-lrjhV025d1BHO2_OqMBH5hUXVfLU9V');
const msg = key.getChannel('sms');

class SmsController {
  static async msgBoasVindas(req, res) {
    const content = new TextContent('Que bom ter você com a gente! 💙');
    const enviaMsg = await msg.sendMessage('+5519995985318', '+5519995985318sss', content);

    if (enviaMsg.erro) {
      console.log("erro no envio da mensagem !");
    }
    return console.log("Mensagem enviada !");
  }
}

module.exports = SmsController;