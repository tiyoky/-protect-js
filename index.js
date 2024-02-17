const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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
    message.channel.send('Commande mute exécutée.');
  }

  if (command === 'purge') {
    message.channel.send('Commande purge exécutée.');
  }

  if (command === 'help') {
    const helpEmbed = {
      color: 0x2ECC71,
      title: 'Commandes du bot',
      fields: [
        { name: 'Commande ban', value: '```+ban @utilisateur```', inline: true },
        { name: 'Commande kick', value: '```+kick @utilisateur```', inline: true },
        { name: 'Commande mute', value: '```+mute @utilisateur```', inline: true },
        { name: 'Commande purge', value: '```+purge nombre```', inline: true },
      ],
    };

    message.channel.send({ embeds: [helpEmbed] });
  }
});


// Remplacez 'YOUR_DISCORD_BOT_TOKEN' par le véritable jeton de votre bot
client.login(process.env.TOKEN);

// Remplacez 'YOUR_DISCORD_BOT_TOKEN' par le véritable jeton de votre bot



  
