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

// Export the route handler function
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // Parse the request body as JSON
        const body = JSON.parse(req.body);

        // Check if the body contains a message
        if (body && body.message) {
            // Handle the incoming message
            const message = body.message;
            client.emit('messageCreate', message);
        }

        // Respond with a success message
        res.status(200).send('Message received.');
    } else if (req.method === 'GET') {
        // Respond to GET requests with a simple message
        res.status(200).send('Discord bot is running.');
    } else {
        // Respond with a method not allowed error for other methods
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).send('Method not allowed.');
    }
};
