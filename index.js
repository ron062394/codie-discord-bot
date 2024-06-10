const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Retrieve bot token from environment variable
const token = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Respond to specific messages
    if (message.content.toLowerCase().includes('hello')) {
        message.reply('Hello! How can I assist you today?');
    } else if (message.content.toLowerCase().includes('help')) {
        message.reply('Sure! How can I help you?');
    }
    // Add more conditions as needed
});

client.login(token);
