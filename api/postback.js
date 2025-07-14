const axios = require('axios');

module.exports = async (req, res) => {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    // Get secrets from environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    const SECRET_KEY = process.env.SECRET_KEY;

    // Security: check secret key
    if (req.query.key !== SECRET_KEY) {
        return res.status(403).send('Forbidden');
    }

    const clickId = req.query.click_id;
    const payou = req.query.payou;

    if (!clickId || !payou) {
        return res.status(400).send('Missing parameters');
    }

    // Customize your message here
    const message = `✅ *New Conversion!*\n\n🆔 *Click ID:* \`${clickId}\`\n💰 *Payout:* \`${payou}\`\n🕒 *Time:* ${new Date().toLocaleString()}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });
        res.status(200).send('OK');
    } catch (error) {
        console.error('Error sending Telegram message:', error.response ? error.response.data : error.message);
        res.status(500).send('Error');
    }
};
