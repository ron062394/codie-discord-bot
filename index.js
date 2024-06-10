const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
require('dotenv').config();

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Respond to specific messages
    if (message.content.toLowerCase().includes('ron')) {
        message.reply('The most awesome!');
    } else if (message.content.toLowerCase().includes('hey')) {
        message.reply('Sure! How can I help you?');
        console.log(message.content)
    }
    // Add more conditions as needed
});

// Export the client for use in other modules (if needed)
module.exports = {
    client
};
