const Insta = require('@androz2091/insta.js');
const fs = require('fs')
const config = require('./config.json');
const chalk = require('chalk');
const Collection = require('discord.js');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

//Partie insta.js
const clienti = new Insta.Client();
clienti.commands = new Discord.Collection();

    console.log('')
	console.log('╭───────────────────────────────────╮')
    console.log('• ' + chalk.green('Instagram:'))
const IcommandFiles = fs.readdirSync('./commands/insta').filter(file => file.endsWith('.js'));
for (const file of IcommandFiles) {
	const icommand = require(`./commands/insta/${file}`);
	clienti.commands.set(icommand.name, icommand);

    console.log('➜ Command chargée: ' + icommand.name)

}
    console.log('╰───────────────────────────────────╯')

clienti.on('connected', () => {
    
    console.log(' ')
    console.log(`➜ Connecté sur ` + chalk.green(`${clienti.user.username}`));
    console.log('╰────────────────────────────╯')
});

clienti.on('newFollower', async (user) => {
    console.log('╭───────────────────────────╮')
    console.log('| ➜    Nouveau follower !  |')
    console.log('╰───────────────────────────╯')
    if (!user.privateChat) await user.fetchPrivateChat()
    user.privateChat.sendMessage('🚀 Merci d\'utiliser pro_note_ !')
});

clienti.on('messageCreate', (message, cachedMessage) => {
    
    if (message.authorID === clienti.user.id  || !message.content.startsWith(config.prefix)) return;
    
    message.args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const icommandName = message.args.shift().toLowerCase();
    const icommand = clienti.commands.get(icommandName) || clienti.commands.find(cmd => cmd.aliases && cmd.aliases.includes(icommandName));

	if (!icommand) return;
	
	try {
		icommand.execute(message, clienti);
	} catch (error) {
		console.error(error);
    }
    clientd.channels.cache.get('615101343778209792').send(`${message.author.username} vient d'envoyer un message à \`${clienti.user.username}\`: ` + message.content)

    message.markSeen();

    


});

clienti.on('messageDelete', (message, cachedMessage) => {
    

    if (!cachedMessage) return;
    message.reply('Tu vient de supprimer le message:' + cachedMessage.content);
});

clienti.login(config.username, config.password);


//Partie discord.js
const clientd = new Discord.Client();
clientd.commands = new Discord.Collection();
    console.log(' ')
    console.log('╭────────────────────────────────────╮')
    console.log('• ' + chalk.blue('Discord:'))
const DcommandFiles = fs.readdirSync('./commands/discord').filter(file => file.endsWith('.js'));
for (const file of DcommandFiles) {
    const dcommand = require(`./commands/discord/${file}`);

    clientd.commands.set(dcommand.name, dcommand);

    console.log('➜ Command chargée: ' + dcommand.name)

}
    console.log('╰───────────────────────────────────╯')

clientd.on('ready', () => {
    console.log(' ')
    console.log('╭───────────────────────────╮')
    console.log(`➜ Connecté sur ` + chalk.blue(`${clientd.user.username}`));
    clientd.user.setStatus("dnd");
    clientd.user.setActivity("p!insta");
      return (console.error);   

    
});

clientd.on('message', (message) => { 
    
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(' ');
        const dcommand = args.shift().toLowerCase();
        
        if (!clientd.commands.has(dcommand)) return;
        clientd.commands.get(dcommand).execute(message, args);
});



clientd.login(config.token)
