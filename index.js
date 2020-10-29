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
    console.log('╰─────────────────────────────╯')
});

clienti.on('newFollower', async (user) => {
    console.log('╭───────────────────────────╮')
    console.log('| ➜    Nouveau follower !  |')
    console.log('╰───────────────────────────╯')
    if (!user.privateChat) await user.fetchPrivateChat()
    user.privateChat.sendMessage('🚀 Merci d\'utiliser ' + clienti.user.username + ' !')
});

clienti.on('messageCreate', (message, cachedMessage) => {
    
    if (message.authorID === clienti.user.id  || !message.content.startsWith(config.prefix)) return;
    
    message.args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const args = message.content.slice(config.prefix.length).trim().split(' ');
	const icommandName = message.args.shift().toLowerCase();
    const icommand = clienti.commands.get(icommandName) || clienti.commands.find(cmd => cmd.aliases && cmd.aliases.includes(icommandName));

	if (!icommand) return;
	
	try {
		icommand.execute(message, clienti, args);
	} catch (error) {
		console.error(error);
    }

    message.author.fetch().then(e => {
        if (message.authorID === clienti.user.id) return
          const log = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL , 'https://www.instagram.com/' + message.author.username)
              .setColor('#f34d59')
              .addField('Message:', message.content, true)
              .addFields(
                { name: 'Pseudo:', value: `${message.author.username}`},
                { name: 'ID:', value: `${message.author.id}`, inline: false },
                { name: 'Abonnés:', value: `${message.author.followerCount}`, inline: true},
                { name: 'Abonnements:', value: `${message.author.followingCount}`, inline: true},
              )
            clientd.channels.cache.find(channel => channel.name === "logs").send(log)
              })
          if (message.authorID === clienti.user.id || !message.content.startsWith(config.prefix)) return
      
          message.markSeen();
      

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
    console.log('╭─────────────────────────────╮')
    console.log(`➜ Connecté sur ` + chalk.blue(`${clientd.user.username}`));
    clientd.user.setStatus("dnd");
    clientd.user.setActivity(config.prefix + "insta");
      return (console.error);   

    
});

clientd.on('message', (message) => { 
    
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(' ');
        const dcommand = args.shift().toLowerCase();
        
        if (!clientd.commands.has(dcommand)) return;
        clientd.commands.get(dcommand).execute(message, args, clienti, clientd);
});



clientd.login(config.token)
