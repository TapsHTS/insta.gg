module.exports = {
	name: `ping`,
	description: 'Ping!',
    execute(message, clienti, args) {
	    
	const start = Date.now();
		 message.chat.sendMessage('📊 Test de latence...').then(() => {
			const diff = (Date.now() - start);
			 message.chat.sendMessage(`📊 Latence du bot : ${diff} ms.`);
        })
	},
};
