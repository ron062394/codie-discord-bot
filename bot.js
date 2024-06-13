const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

// Retrieve bot token from environment variable
const token = process.env.DISCORD_TOKEN;
const adminUserId = '170218754301624321'; // Replace with the actual admin user ID

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
    member.send(`Hello ${member.user.username}! 🎉 Welcome to OneCodeCamp! We're excited to have you join our community.
    
Here's a few things to get you started:
- Check out the #welcome-and-rules channel to familiarize yourself with our guidelines.
- Type !commands to see the list of commands you can use.
- If you have any questions, feel free to ask in the #helpdesk channel.
- Feel free to chat and hang out in the #off-topic channel.

Happy learning and coding! 🚀
`);
    console.log(`Sent a welcome message to ${member.user.tag}`);
});

client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message is a command (starts with '!')
    if (!message.content.startsWith('!')) return;
    console.log(`Command used by ${message.author.tag}: ${message.content}`);

    // Respond to specific messages in server channels
    const content = message.content.toLowerCase();
    if (content === '!command') {
        message.reply('Here are some available commands:\n\n!ping - Check if the bot is responsive.\n!commands - Display available commands.\n!courses - Display information about the ongoing and upcoming courses.\n!serverinfo - Display information about the server.\n!certificate - Information about course completion certificates.\n!feedback - Provide feedback about the bootcamp.');
    } else if (content === '!ping') {
        message.reply('Hello there!');
    } else if (content === '!courses') {
        message.reply('Please check the pinned messages in the #upcoming-courses channel for information about ongoing and upcoming courses.');
    } else if (content === '!serverinfo') {
        message.reply('OneCodeCamp is an online coding bootcamp designed to help individuals learn the necessary skills to become proficient in coding.');
    } else if (content === '!certificate') {
        message.reply('Upon successful completion of a course, you will receive a certificate. Here\'s a guide on how to request a digital certificate.\nLink: https://docs.google.com/document/d/19M9lHHUV2k791pvfmXnv1uTZMJ5w2oEfhe7qGMTnq-lOyu8Kw/ ');
    } else if (content === '!feedback') {
        message.reply('We value your feedback! Please fill out our feedback form at [Feedback Form Link] to let us know how we\'re doing and how we can improve.\nLink: https://docs.google.com/forms/d/e/1FAIpQLSfaPzmi6jroqs3aJFcuQ_cDCHkNv1BiGtZ2B0ptnq-lOyu8Kw/viewform');
    } else if (content === '!admin') {
        try {
            const adminUser = await client.users.fetch(adminUserId);
            await adminUser.send(`Admin, ${message.author.username} needs your assistance.`);
            message.reply('I have notified the admin. They will get back to you shortly.');
        } catch (error) {
            console.error('Error sending DM to admin:', error);
            message.reply('There was an error contacting the admin. Please try again later.');
        }
    }
});

client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Respond to specific commands in server channels
    const content = message.content.toLowerCase();
    if (content.includes('help')) {
        message.reply('Hi, if you need help, you may send a message to the #helpdesk channel. If you need a list of commands, type !commands.');
        console.log(`Message by ${message.author.tag}: ${message.content}`);
    }
});


client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    if (!message.content.includes('?')) return;
    console.log(`Question asked by ${message.author.tag}: ${message.content}`);
    
    // Respond to specific commands in server channels
    const content = message.content.toLowerCase();
    if (content.includes('not') && content.includes('orientation')) {
        message.reply('We\'re sorry, but if you missed the first class, you won\'t be able to join this batch. However, don\'t worry! We would love to have you in the next one.');
    } else if (content.includes('signup') || content.includes('register')|| content.includes('register')) {
        message.reply('Please check the pinned messages in the #upcoming-courses channel for information about ongoing and upcoming courses.');
    } else if (content.includes('zoom link') || content.includes('zoom') || content.includes('link')) {
        message.reply("Zoom links for orientation are posted in the #helpdesk and #upcoming-bootcamps channels. The daily bootcamp link will be posted and pinned in the batch's official Slack group, which is accessible to those who join on Orientation Day.");
    } else if (content.includes('schedule') || content.includes('today')) {
        message.reply('Our bootcamp is from Monday to Thursday.');
    }

    if (message.content.toLowerCase().includes('webinar') && message.content.toLowerCase().includes('recording')) {
        message.reply('You can access the recordings via this link: https://onecodecamp.com/Recording');
    } else if (message.content.toLowerCase().includes('where') && message.content.toLowerCase().includes('recording')) {
        message.reply('Our bootcamp class recordings will be posted/pinned on your official batch Slack group channel.');
    }
});

client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message contains the #announcement command
    const content = message.content.toLowerCase();
    if (content.includes('#announcement')) {
        // Define an array of emojis
        const emojis = ['😊', '👏', '🌟', '👍', '🔥', '💯', '🙌', '❤️', '🥳', '🚀'];
        // Shuffle the emojis array
        emojis.sort(() => Math.random() - 0.5);
        // Select a random number of emojis (up to 7)
        const numEmojis = Math.min(Math.floor(Math.random() * 10) + 1, emojis.length);
        // React to the message with the selected emojis
        for (let i = 0; i <= 7; i++) {
            await message.react(emojis[i]);
        }
    }
});


client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message contains the #announcement command
    const content = message.content.toLowerCase();
    if (content.includes('https://www.meetup.com/')) {
        // Define an array of emojis
        const emojis = ['😊', '👏', '🌟', '👍', '🔥', '💯', '🙌', '❤️', '🥳', '🚀'];
        // Shuffle the emojis array
        emojis.sort(() => Math.random() - 0.5);
        // Select a random number of emojis (up to 5)
        const numEmojis = Math.min(Math.floor(Math.random() * 10) + 1, emojis.length);
        // React to the message with the selected emojis
        for (let i = 0; i <= 5; i++) {
            await message.react(emojis[i]);
        }
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
