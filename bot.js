const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();


// Retrieve bot token from environment variable
const token = process.env.DISCORD_TOKEN;
//  step 1077544030201716777
//  tester 1157972691828088892
//  ethan 1052027562542514238
// grace 1107634653822730270
const adminUserIds = ['170218754301624321','1077544030201716777', '1107634653822730270']; // Replace with the actual admin user IDs
const master_owner = "1052027562542514238"
const asia_server = "1202069160763588628"; // Asia server ID
const global_server = "1052028004206903296"; // Global server ID
const test_server = "878567743694176266"; // Global server ID


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
    // Send welcome messages based on the server
    const guildId = member.guild.id;
    if (guildId === asia_server) {
        sendAsiaWelcomeMessage(member);
    } else if (guildId === global_server) {
        sendGlobalWelcomeMessage(member);
    } else {
        // Default welcome message for other servers (if needed)
        sendDefaultWelcomeMessage(member);
    }
});

async function sendAsiaWelcomeMessage(member) {
    try {
        await member.send(`Hello ${member.user.username}! 🎉 Welcome to OneCodeCamp Asia! We're thrilled to have you join our community.
        
Here are a few things to get you started:
- Check out the #welcome-and-rules channel to familiarize yourself with our guidelines.
- Type !commands to see the list of commands you can use.
- If you have any questions, feel free to ask in the #helpdesk channel.
- Feel free to chat and hang out in the #off-topic channel.

Happy learning and coding! 🚀`);
        console.log(`Sent a welcome message to ${member.user.tag} in OneCodeCamp Asia`);
    } catch (error) {
        console.error('Error sending welcome message to Asia server:', error);
    }
}

async function sendGlobalWelcomeMessage(member) {
    try {
        await member.send(`Hello ${member.user.username}! 🎉 Welcome to OneCodeCamp Global! We're excited to have you join our worldwide community.
        
Here are a few things to get you started:
- Check out the #welcome-and-rules channel to familiarize yourself with our guidelines.
- Type !commands to see the list of commands you can use.
- If you have any questions, feel free to ask in the #helpdesk channel.
- Feel free to chat and hang out in the #off-topic channel.
- For upcoming bootcamps, check pinned messages in #upcoming-courses.
- For upcoming webinars, visit #online-events.


Happy learning and coding! 🚀`);
        console.log(`Sent a welcome message to ${member.user.tag} in OneCodeCamp Global`);
    } catch (error) {
        console.error('Error sending welcome message to Global server:', error);
    }
}

async function sendDefaultWelcomeMessage(member) {
    // Send a default welcome message for servers not specified
    try {
        await member.send(`Hello ${member.user.username}! 🎉 Welcome to OneCodeCamp! We're excited to have you join our community.
        
Here are a few things to get you started:
- Check out the #welcome-and-rules channel to familiarize yourself with our guidelines.
- Type !commands to see the list of commands you can use.
- If you have any questions, feel free to ask in the #helpdesk channel.
- Feel free to chat and hang out in the #off-topic channel.

Happy learning and coding! 🚀`);
        console.log(`Sent a welcome message to ${member.user.tag}`);
    } catch (error) {
        console.error('Error sending default welcome message:', error);
    }
}

client.on('messageCreate', async message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Command handling
    if (message.content.startsWith('!')) {
        console.log(`Command used by ${message.author.tag}: ${message.content}`);
        const content = message.content.toLowerCase();

        switch (content) {
            case '!command':
                message.reply('Here are some available commands:\n\n!ping - Check if the bot is responsive.\n!commands - Display available commands.\n!courses - Display information about the ongoing and upcoming courses.\n!serverinfo - Display information about the server.\n!certificate - Information about course completion certificates.\n!feedback - Provide feedback about the bootcamp.');
                break;
            case '!ping':
                message.reply('Hello there!');
                break;
            case '!courses':
                message.reply('Please check the pinned messages in the #upcoming-courses channel for information about ongoing and upcoming courses.');
                break;
            case '!serverinfo':
                message.reply('OneCodeCamp is an online coding bootcamp designed to help individuals learn the necessary skills to become proficient in coding.');
                break;
            case '!certificate':
                message.reply('Upon successful completion of a course, you will receive a certificate. Here\'s a guide on how to request a digital certificate.\nLink: https://drive.google.com/file/d/1JP3pTPJrCtbKrt_B5tlViPOe4N2CZUnM/view ');
                break;
            case '!feedback':
                message.reply('We value your feedback! Please fill out our feedback form at [Feedback Form Link] to let us know how we\'re doing and how we can improve.\nLink: https://docs.google.com/forms/d/e/1FAIpQLSfaPzmi6jroqs3aJFcuQ_cDCHkNv1BiGtZ2B0ptnq-lOyu8Kw/viewform');
                break;
            case '!assist':
                try {
                    for (const adminUserId of adminUserIds) {
                        const adminUser = await client.users.fetch(adminUserId);
                        await adminUser.send(`Admin, user ${message.author.username} needs your assistance.`);
                    }
                    message.reply('I have notified the admin. They will get back to you shortly.');
                } catch (error) {
                    console.error('Error sending DM to admin:', error);
                    message.reply('There was an error contacting the admin. Please try again later.');
                }
                break;
        }
    } else {
        // General message handling
        const content = message.content.toLowerCase();

        if (
            content.trim().includes('?') && 
            !content.includes('https://www.meetup.com/') && 
            !adminUserIds.includes(message.author.id) && 
            message.author.id !== master_owner
          )
        {
            console.log(`Question asked by ${message.author.tag}: ${message.content}`);
            try {
                const serverName = message.guild ? message.guild.name : 'Direct Message';
                const channelName = message.channel ? (message.channel.name || 'DM') : 'Unknown Channel';
                const displayName = message.member ? message.member.displayName : message.author.username;
                
                for (const adminUserId of adminUserIds) {
                    const adminUser = await client.users.fetch(adminUserId);
                    await adminUser.send(` --- ****NOTICE****\nAdmin, user ${displayName} needs your assistance in server: "${serverName}", channel: "${channelName}".\n\n\`\`\`${displayName}: ${message.content} \`\`\`\n ****END OF MESSAGE****`);
                }
            } catch (error) {
                console.error('Error sending DM to admin:', error);
            }
            
            if (content.includes('not') && content.includes('orientation')) {
                message.reply('We\'re sorry, but if you missed the first class, you won\'t be able to join this batch. However, don\'t worry! We would love to have you in the next one.');
            } else if (content.includes('signup') || content.includes('register') || content.includes('join')) {
                if (message.guild && message.channel.id === '1173782906796253224') {
                    message.reply('To join our upcoming webinar, please follow the provided Meetup link. We look forward to having you join us!');
                } 

            } else if (content.includes('schedule') && content.includes('today')) {
                message.reply('Our bootcamp is from Monday to Thursday.');
            }

            if (content.includes('webinar') && content.includes('recording')) {
                message.reply('You can access the recordings via this link: https://onecodecamp.com/Recording');
            }
        }

        if (content.includes('#announcement')) {
            const emojis = ['😊', '👏', '🌟', '👍', '🔥', '💯', '🙌', '❤️', '🥳', '🚀'];
            emojis.sort(() => Math.random() - 0.5);
            const numEmojis = Math.min(Math.floor(Math.random() * 10) + 1, emojis.length);
            for (let i = 0; i < numEmojis; i++) {
                await message.react(emojis[i]);
            }
        }

        if (message.guild && message.guild.id === test_server) {
            // Send a specific message only on the test server
            if (content.includes('specialmessage')) {
                message.channel.send('This is a special message only for the test server!');
            }
        } else if (message.guild && message.guild.id === asia_server) {
            // Send a specific message only on the test server
            if (content.includes('specialmessage')) {
                message.channel.send('This is a special message only for the asia server!');
            }
        } else if (message.guild && message.guild.id === global) {
            // Send a specific message only on the test server
            if (content.includes('specialmessage')) {
                message.channel.send('This is a special message only for the global server!');
            }
        }


        if (content.includes('https://www.meetup.com/')) {
            const emojis = ['😊', '👏', '🌟', '👍', '🔥', '💯', '🙌', '❤️', '🥳', '🚀'];
            emojis.sort(() => Math.random() - 0.5);
            const numEmojis = Math.min(Math.floor(Math.random() * 10) + 5, emojis.length);
            for (let i = 0; i < numEmojis; i++) {
                await message.react(emojis[i]);
            }

            try {
                const serverName = message.guild ? message.guild.name : 'Direct Message';
                const channelName = message.channel ? (message.channel.name || 'DM') : 'Unknown Channel';
                const displayName = message.member ? message.member.displayName : message.author.username;
                
                for (const adminUserId of adminUserIds) {
                    const adminUser = await client.users.fetch(adminUserId);
                    await adminUser.send(` --- ****NOTICE****\n${displayName} has posted a webinar invitation in "${serverName}" - "${channelName}":\n\n\`\`\`${message.content}\`\`\`\n ****END OF MESSAGE****`);
                }
            } catch (error) {
                console.error('Error sending DM to admin:', error);
            }
        }
    }
});

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

