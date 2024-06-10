const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
require('dotenv').config();

// Retrieve bot token from environment variable
const token = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Respond to specific messages
    if (message.content.toLowerCase().includes('ron')) {
        message.reply('The most aweesommenness!');
    } else if (message.content.toLowerCase().includes('hey')) {
        message.reply('Sure! How can I help you?');
        console.log(message.content)
    }
    // Add more conditions as needed
});

client.login(token);

// Export an empty function as the entry point for Vercel
module.exports = async function() {
    // This function is empty because Vercel will not use it to handle requests,
    // but it needs to be exported to satisfy Vercel's requirement.
};
