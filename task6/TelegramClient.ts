export class TelegramClient {
    sendTelegramMessage(chatId: string, text: string) {
        console.log(`[Telegram] chat ${chatId} ga: ${text}`);
    }
}
