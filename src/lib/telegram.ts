export async function sendTelegramMessage({ text }: { text: string }): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const apiUrl = process.env.TELEGRAM_API_URL || 'https://api.telegram.org';

  if (!token || !chatId) {
    console.error('Telegram: не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID');
    return false;
  }

  try {
    const response = await fetch(`${apiUrl}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!response.ok) {
      console.error('Telegram: ошибка отправки', await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Telegram: сетевая ошибка', error);
    return false;
  }
}