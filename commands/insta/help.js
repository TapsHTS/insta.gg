module.exports = {
	name: `help`,
	description: 'If you need help ?',
    execute(message, clienti, args) {
        message.chat.sendMessage('Voici la liste des commandes: \n Prefix: i!\n 🦺 • Général: \n• help \n • ping \n • info \n 🎺 • Musique: \n •musique \n ')
	},
};
