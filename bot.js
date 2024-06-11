const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

// Retrieve bot token from environment variable
const token = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages // Required intent for DM events
    ],
    partials: [Partials.Channel] // Required to receive DMs
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('guildMemberAdd', member => {
    // Send a welcome message to the new member
    member.send('Welcome to the server! If you need help, type !commands to see available commands.');
    console.log(`Sent a welcome message to ${member.user.tag}`);
});

client.on('messageCreate', message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message is a command (starts with '!')
    if (!message.content.startsWith('!')) return;
    console.log(`Command used by ${message.author.tag}: ${message.content}`);

    // Respond to specific messages in server channels
    const content = message.content.toLowerCase();
    if (content.includes('help')) {
        message.reply('Hi, if you need help, you may send a message to the #helpdesk channel. If you need a list of commands, type !commands.');
    } else if (content === '!commands') {
        message.reply('Here are some available commands:\n\n!ping - Check if the bot is responsive.\n!help - Get help information.\n!commands - Display available commands.\n!courses - Display information about the ongoing and upcoming courses.\n!serverinfo - Display information about the server.\n!certificate - Information about course completion certificates.\n!feedback - Provide feedback about the bootcamp.');
    } else if (content === '!ping') {
        message.reply('Hello there!');
    } else if (content === '!courses') {
        message.reply('Please check the pinned messages in the #upcoming-courses channel for information about ongoing and upcoming courses.');
    } else if (content === '!serverinfo') {
        message.reply('OneCodeCamp is an online coding bootcamp designed to help individuals learn the necessary skills to become proficient in coding.');
    } else if (content === '!certificate') {
        message.reply('Upon successful completion of a course, you will receive a certificate. Here\'s a guide on how to request a digital certificate.\nLink: https://docs.google.com/document/d/19M9lHHUV2k791pvfmXnv1uTZMJ5w2oEfhe7qGMTnYH4/ ');
    } else if (content === '!feedback') {
        message.reply('We value your feedback! Please fill out our feedback form at [Feedback Form Link] to let us know how we\'re doing and how we can improve.\nLink: https://docs.google.com/forms/d/e/1FAIpQLSfaPzmi6jroqs3aJFcuQ_cDCHkNv1BiGtZ2B0ptnq-lOyu8Kw/viewform');
    }
    
});



client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Respond to specific commands in server channels
    const content = message.content.toLowerCase();
    if (content.includes('signup') || content.includes('register') || content.includes('registration')) {
        // Handle registration logic here
        // For example, you can add the user to a database or assign a role to them
        message.reply('Please check the pinned messages in the #upcoming-courses channel for information about ongoing and upcoming courses.');
    }
});


// Log errors during login
client.on('error', error => {
    console.error('Error during login:', error);
});

client.login(token)
    .then(() => {
        console.log('Bot logged in successfully!');
    })
    .catch(error => {
        console.error('Error logging in:', error);
    });
// https://discord.com/oauth2/authorize?client_id=1249894544196108338&permissions=1084479764544&integration_type=0&scope=bot
