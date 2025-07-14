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

    // Get all parameters from the query
    const clickId = req.query.click_id;
    const device = req.query.Device;
    const mac = req.query.mac;
    const payout = req.query.payout;

    if (!clickId || !payou) {
        return res.status(400).send('Missing parameters');
    }

    // Customize your message here
      // Custom Telegram message
    const message = 
`🎉 *New Conversion!*
🆔 *Click ID:* \`${clickId}\`
📱 *Device:* \`${device}\`
🔗 *MAC Address:* \`${mac}\`
💰 *Payout:* \`${payout}\`
🕒 *Time:* ${new Date().toLocaleString()}`;

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
