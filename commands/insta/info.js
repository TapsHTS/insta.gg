module.exports = {
    name: 'info',
    description: 'Donne des infos sur la personne',
    execute(message, clienti, args) {
        message.chat.sendMessage('Recherche des informations...').then(() => {
            message.author.fetch().then(e => {
            message.chat.sendMessage(
        `Nom complet: ${message.author.fullName}
        Surnom: ${message.author.username}
        ID: ${message.author.id}
        Biographie:\n${message.author.biography}
        Abonnés: ${message.author.followerCount}
        Abonnements: ${message.author.followingCount}
        Vérifier: ${message.author.isVerified}
        Privée: ${message.author.isPrivate}
        Nombre de post: ${message.author.mediaCount}
`)
        })
        })

    }
}
