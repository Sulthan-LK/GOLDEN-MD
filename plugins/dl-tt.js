const { cmd } = require('../command');
const axios = require('axios');

const whatsappChannelLink = 'https://chat.whatsapp.com/CBLFgkAG0USDEooeO05rHN?mode=ac_t';

// Quoted Contact Object
const quotedContact = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "⚙️ TikTok-Stream | Verified ✅",
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:SCIFI\nORG:Shadow-Xtech BOT;\nTEL;type=CELL;type=VOICE;waid=94771098429:+94771098429\nEND:VCARD"
        }
    }
};

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("🚫 Invalid TikTok link.");

        reply("⏳ Downloading video, please wait...");

        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) return reply("⚠️ Failed to fetch TikTok video.");

        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;

        const caption = `
  *👤 USER_HANDLE: ${author.nickname} (@${author.username})*
  *📁 VIDEO_TITLE: "${title}"*
  *🌐 SOURCE_NODE: TikTok_NW://Stream.*
  
 _⧉ *ENGAGEMENT_LOG*_
  ♥️ *LIKES*       : *🌸 ${like}*
  💬 *COMMENTS*  : *⏳ ${comment}*
  🌐 *SHARES*     : *👤  ${share}*
  📸 *MEDIA_TYPE* : *VIDEO/NW/HD*
  🧬 *UPLINK_ID* | *golden.md.grid://Ω1A2Z*`;

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403061888196@newsletter',
                    newsletterName: "Ｇ♢ＬＤΣＮ－ＭＤ",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "⚙️ Shadow-Xtech | TikTok Node",
                    body: "Intercepted & Delivered from XtechLink",
                    thumbnailUrl: "https://files.catbox.moe/3l3qgq.jpg",
                    sourceUrl: whatsappChannelLink,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: quotedContact });

    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`❌ An error occurred:\n${e.message}`);
    }
});
