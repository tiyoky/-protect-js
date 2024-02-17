const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '+';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ban') {
    message.channel.send('Commande ban exécutée.');
  }

  if (command === 'kick') {
    message.channel.send('Commande kick exécutée.');
  }

  if (command === 'mute') {
    message.channel.send('Commande mute exécutée.');
  }

  if (command === 'purge') {
    message.channel.send('Commande purge exécutée.');
  }

  if (command === 'help') {
    const helpEmbed = {
      color: #2ECC71,
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
