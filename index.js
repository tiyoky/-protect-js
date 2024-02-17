const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// ... le reste de votre code ...

const prefix = '+';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ban') {
    // Votre code pour la commande ban ici
    message.channel.send('Commande ban exécutée.');
  }

  if (command === 'kick') {
    // Votre code pour la commande kick ici
    message.channel.send('Commande kick exécutée.');
  }

  if (command === 'mute') {
    // Votre code pour la commande mute ici
    message.channel.send('Commande mute exécutée.');
  }

  if (command === 'purge') {
    // Votre code pour la commande purge ici
    message.channel.send('Commande purge exécutée.');
  }

  if (command === 'help') {
    // Liste des commandes et leurs descriptions
    const helpEmbed = {
      color: 0x00ff00,
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
async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}
