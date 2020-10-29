const config = require('./../../config');

module.exports = {
	name: `ping`,
	description: 'Ping!',
	execute(message, args) {
	const start = Date.now();
		 message.channel.send('📊 Test de latence...').then(() => {
			const diff = (Date.now() - start);
			 message.channel.send(`📊 Latence du bot : ${diff} ms.`);
        })
	},
};
