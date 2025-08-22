
// plugins/sinhalasub.js
const axios = require("axios");
const cheerio = require("cheerio");

async function searchSinhalaSub(movieName) {
    const url = `https://www.sinhalasub.lk/?s=${encodeURIComponent(movieName)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let results = [];
    $(".post-title a").each((i, el) => {
        results.push({
            title: $(el).text(),
            link: $(el).attr("href")
        });
    });

    return results.slice(0, 5); // Limit to 5 results
}

module.exports = {
    name: "ssub",
    alias: ["sinhsub", "sinhalasub"],
    description: "🎬 Search Sinhala subtitles from SinhalaSub.lk",
    async execute(m, sock) {
        let query = m.body.replace(/^[!/.]ssub/i, "").trim();
        if (!query) {
            return sock.sendMessage(m.chat, { text: "❌ කරුණාකර චිත්‍රපටයේ නම දෙන්න.\n\nඋදාහරණය: *.ssub Inception*" });
        }

        let results = await searchSinhalaSub(query);
        if (results.length === 0) {
            return sock.sendMessage(m.chat, { text: "😔 Subtitles සොයාගත නොහැකි විය." });
        }

        let reply = "📺 *SinhalaSub.lk – උපසිරසි සොයාගැනීම*\n\n";
        results.forEach((r, i) => {
            reply += `${i + 1}. ${r.title}\n🔗 ${r.link}\n\n`;
        });

        sock.sendMessage(m.chat, { text: reply });
    }
};

