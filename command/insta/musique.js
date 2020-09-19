const ytdl = require('ytdl-core');

module.exports = {
	name: 'musique',
	description: 'envoie la musique',
    execute(message, clienti, args) {
  if(args[0] == "help"){
    message.chat.sendMessage("Veuillez spécifier une musique de moins de 1 minute !");
    return;
  }
	    message.chat.sendMessage('Création de la musique en cours...').then(() => {
    const stream = ytdl(args[1], { filter: format => format.container === 'mp4' });
    const array = [];
	stream
      .on('data', chunk => {
        array.push(chunk);
      })
      .on('end', () => {
        message.chat.sendVoice(Buffer.concat(array));
      })
        })

	},
};
