const config = require('./../../config');
const util = require('util')
module.exports = {
	name: `eval`,
	description: 'Evalute your command',
    execute(message, clienti, args) {

if (parseInt(message.author.id) !== parseInt(config.ownerid)) return message.chat.sendMessage(`Command interdite !`)
        let result = new Promise((resolve) => resolve(eval(args.join(` `))));

        return result.then((output) => {
            if (typeof output !== `string`) {
                output = require(`util`).inspect(output, { depth: 0 });
            }
            message.chat.sendMessage('📤 Résultat : \n' + output)
        }).catch((err) => {
            err = err.toString();
            message.chat.sendMessage('⛔Erreur: ' + err);
        });
        
	},
};
