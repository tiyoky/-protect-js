const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// ... le reste de votre code ...


const prefix = '+';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('made by _tiyoky', { type: 'PLAYING' });
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ban') {
    // Vérifie si l'auteur du message a la permission de bannir des membres
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("Vous n'avez pas la permission de bannir des membres.");
    }

    // Vérifie si le bot a la permission de bannir des membres
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      return message.reply("Je n'ai pas la permission de bannir des membres.");
    }

    const member = message.mentions.members.first();

    // Vérifie si un membre a été mentionné
    if (member) {
      try {
        // Bannir le membre et envoie un message de confirmation
        await member.ban();
        message.channel.send(`Membre banni: ${member.user.tag}`);
      } catch (error) {
        console.error('Erreur lors du bannissement :', error);
        message.reply("Impossible de bannir le membre.");
      }
    } else {
      message.reply('Veuillez mentionner le membre que vous souhaitez bannir.');
    }
  }

  if (command === 'unban') {
    // Vérifie si l'auteur du message a la permission de débannir des membres
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("Vous n'avez pas la permission de débannir des membres.");
    }

    // Vérifie si le bot a la permission de débannir des membres
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      return message.reply("Je n'ai pas la permission de débannir des membres.");
    }

    // Récupère l'ID du membre à débannir depuis les arguments
    const memberID = args[0];

    if (!memberID || isNaN(memberID)) {
      return message.reply('Veuillez fournir l\'ID du membre que vous souhaitez débannir.');
    }

    try {
      // Débannir le membre par son ID
      await message.guild.bans.remove(memberID);
      message.channel.send(`Membre débanni avec l'ID : ${memberID}`);
    } catch (error) {
      console.error('Erreur lors du débannissement :', error);
      message.reply("Impossible de débannir le membre.");
    }
  }


if (command === 'kick') {
    // Vérifie si l'auteur du message a la permission de kicker des membres
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply("Vous n'avez pas la permission de kicker des membres.");
    }

    // Vérifie si le bot a la permission de kicker des membres
    if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
      return message.reply("Je n'ai pas la permission de kicker des membres.");
    }

    const member = message.mentions.members.first();

    // Vérifie si un membre a été mentionné
    if (member) {
      try {
        // Kick le membre et envoie un message de confirmation
        await member.kick();
        message.channel.send(`Membre kické: ${member.user.tag}`);
      } catch (error) {
        console.error('Erreur lors du kick :', error);
        message.reply('Impossible de kicker le membre.');
      }
    } else {
      message.reply('Veuillez mentionner le membre que vous souhaitez kicker.');
    }
  }

  if (command === 'mute') {
    // Vérifie si l'auteur du message a la permission de gérer les rôles
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply("Vous n'avez pas la permission de gérer les rôles.");
    }

    const member = message.mentions.members.first();

    // Vérifie si un membre a été mentionné
    if (member) {
      try {
        // Récupère le rôle "Muted" ou crée-le s'il n'existe pas
        let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole) {
          mutedRole = await message.guild.roles.create({
            name: 'Muted',
            permissions: [],
          });
        }

        // Applique le rôle "Muted" au membre
        await member.roles.add(mutedRole);
        
        message.channel.send(`Membre muté: ${member.user.tag}`);
      } catch (error) {
        console.error('Erreur lors du mute :', error);
        message.reply('Impossible de muter le membre.');
      }
    } else {
      message.reply('Veuillez mentionner le membre que vous souhaitez muter.');
    }
}


  // ... le reste de votre code ...

  if (command === 'purge') {
    // Vérifie si l'auteur du message a la permission de gérer les messages
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply("Vous n'avez pas la permission de gérer les messages.");
    }

    // Vérifie si un nombre a été spécifié
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply('Veuillez spécifier un nombre valide de messages à supprimer.');
    }

    try {
      // Supprime le nombre spécifié de messages
      const messages = await message.channel.bulkDelete(amount + 1);
      message.reply(`Suppression de ${messages.size} messages.`);
    } catch (error) {
      console.error('Erreur lors de la suppression des messages :', error);
      message.reply('Impossible de supprimer les messages.');
    }
  } // Fermeture correcte de la condition

  if (command === 'help') {
    const helpEmbed = {
      color: 0x2ECC71,
      title: 'Commandes du bot',
      fields: [
        { name: 'Commande ban', value: '```+ban @utilisateur```', inline: true },
        { name: 'Commande kick', value: '```+kick @utilisateur```', inline: true },
        { name: 'Commande mute', value: '```+mute @utilisateur```', inline: true },
        { name: 'Commande purge', value: '```+purge nombre```', inline: true },
        { name: 'Commande unban', value: '```+unban id```', inline: true },
      ],
    };

    message.channel.send({ embeds: [helpEmbed] });
  }
});

// Remplacez 'YOUR_DISCORD_BOT_TOKEN' par le véritable jeton de votre bot
client.login(process.env.TOKEN);
