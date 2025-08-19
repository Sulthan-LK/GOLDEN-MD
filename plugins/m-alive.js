const { cmd } = require("../command");
const moment = require("moment");

let botStartTime = Date.now(); // Bot launch time

const FALLBACK_WALLPAPERS = [
"https://files.catbox.moe/pfi8mc.jpg"
  
];


// Quoted contact to show as reference
const quotedContact = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "DONT TAP | Verified ✅",
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:SCIFI\nORG:Shadow-Xtech BOT;\nTEL;type=CELL;type=VOICE;waid=254700000001:+254 700 000001\nEND:VCARD"
        }
    }
};

const getRandomWallpaper = () => FALLBACK_WALLPAPERS[Math.floor(Math.random() * FALLBACK_WALLPAPERS.length)];
const getRandomQuote = () => FANCY_QUOTES[Math.floor(Math.random() * FANCY_QUOTES.length)];

const whatsappGroupLink = 'https://chat.whatsapp.com/CBLFgkAG0USDEooeO05rHN?mode=ac_t';

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "info",
    react: "👋",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User";
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMs = Date.now() - botStartTime;
        const runtime = {
            hours: Math.floor(runtimeMs / (1000 * 60 * 60)),
            minutes: Math.floor((runtimeMs / (1000 * 60)) % 60),
            seconds: Math.floor((runtimeMs / 1000) % 60),
        };

        const caption = `

╔〔 Ｇ♢ＬＤΣＮ－ＭＤ〕╗

𝐇𝐄𝐋𝐋𝐎𝐖 𝐃𝐄𝐀𝐑 
╚═════════════════════════╝
╭─「 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗣𝗔𝗡𝗘𝗟 」
│🔹 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime.hours}h ${runtime.minutes}m ${runtime.seconds}s
│🔹 𝗩𝗲𝗿𝘀𝗶𝗼𝗻 : 1.0.0
│🔹 𝐃𝐀𝐓𝐄 : ${currentDate}
│🔹 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : heroku
│🔹 𝐓𝐈𝐌𝐄 : ${currentTime}
╰─────────────●●►

> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : 𝐃𝐈𝐋𝐈𝐒𝐇𝐀 𝐓𝐄𝐂𝐇*

"${getRandomQuote()}"

*🔹 ⍟ 𝘗𝘙𝘌𝘚𝘌𝘕𝘛 𝘉𝘠 𝘋𝘐𝘓𝘐𝘚𝘏𝘈 𝘛𝘌𝘊𝘏 ㊧ 🔹*
        `.trim();

        await conn.sendMessage(from, {
            image: { url: getRandomWallpaper() },
            caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403061888196@newsletter',
                    newsletterName: 'Ｇ♢ＬＤΣＮ－ＭＤ',
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "Ｇ♢ＬＤΣＮ－ＭＤ",
                    body: "Bot is live and operational — stay connected!",
                    sourceUrl: whatsappGroupLink,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: quotedContact });

    } catch (error) {
        console.error("Error in alive command: ", error);
        const errorMessage = `
❌ An error occurred while processing the *alive* command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
