import { Telegraf } from 'telegraf';
import fs from 'fs';
import http from 'http';

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => res.end('Bot is alive!')).listen(PORT);

try { (await import('dotenv')).config(); } catch (e) {}

const bot = new Telegraf(process.env.BOT_TOKEN);

const RESPONSES = {
  'tux': 'hello',
  '/sudo chmode += telegram': 'право доступа успішно надано ',
  'windows': 'ти подзалупино пользуєшся віндовс! став лінукс лінукс лінукс ',
  'пизда': 'залупа',
  'володьо': 'володя пидор',
  'хуй': 'гавно',
  '/colse': 'Вибачте бот буде тим часово закритий по причині ремотних робіт на сервері чи переведення на новий хостинг с повагою tux',
  '/update': 'вибачте бот тим часово закритий через оновлення с повагою tux',
  'васька': 'василь тебе найде по сметана айді',
  'василь': 'хз ко уто',
  'кнш': 'сумління в tux підлягає осуду',
  'щось': 'я кіть тебе закручу та ти перекрутишся ',
  'вінда': 'вінда хуйня',
  'віндовс': 'віндовс залупа',
  'вікно': 'удаляй',
  'опен сурс': 'опен сурс являється повністю вільним програмним забезпеченям з відкритим вихідним кодом доступний на гіт хаб',
  'камера': 'хуйня а не камера',
  'лінукс': 'лінукс вільне ядро створене у 1991 році лінуксом тордвальтсом поки сам тукс зявився лише у 1993 році перемігши на конкурсі логотипа лінукса',
  'пінг': 'пінг = пінгвін',
  'астрольфо': 'ти про того уйобка?',
  'встає': 'увага всім !!! у вас є право вставати тільки на тукса порушники будут ростріляні',
  'встав': 'повторяю вставати дозволено тільки на тукса порушення = рострел',
  'привіт': 'ти мене кликав?',
  'нет': 'нет-кати будеш у себе дома а мене називай великий господин тукс туксович',
  'нахуй': 'сам пішов нахуй',
};

const PHOTO_RESPONSES = {
  'терри девис': 'tuz.jpg',
  'тукс': 'tux.jpg',
};

const VIDEO_RESPONSES = {
  'android in the bios': 'android_in_the_bios.mp4',
};

const TUX_ART = `
████████╗██╗   ██╗██╗  ██╗███████╗
╚══██╔══╝██║   ██║╚██╗██╔╝██╔════╝
   ██║   ██║   ██║ ╚███╔╝ ███████╗
   ██║   ██║   ██║ ██╔██╗ ╚════██║
   ██║   ╚██████╔╝██╔╝ ██╗███████║
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝

       .--.
      |o_o |
      |:_/ |
     //   \\\\ \\\\
    (|     | )
   /'_   _/ \`\\\\
   ___)=(___/
`;

const HELP_MESSAGE = `
<b>🐧 Список доступних команд та тригерів Tux Bot:</b>

<b>📜 Текстові фрази-тригери:</b>
• tux, windows, вінда, віндовс, вікно
• лінукс, опен сурс, пінг, пінгвін
• васька, василь, володьо
• встає, встав, привіт, нет, нахуй
• пизда, хуй, кнш, щось, астрольфо, камера

<b>⚙️ Команди:</b>
• /help або /start — показати цей список
• /sudo chmode += telegram — надати права
• /colse — повідомлення про ремонт
• /update — повідомлення про оновлення

<b>🖼️ Фото та Відео:</b>
• <b>тукс</b>, <b>терри девис</b> — надіслати фото
• <b>android in the bios</b> — надіслати відео
`;

bot.command(['start', 'help'], (ctx) => {
  return ctx.reply(HELP_MESSAGE, { parse_mode: 'HTML' });
});

bot.on('text', async (ctx) => {
  const text = ctx.message.text.toLowerCase();

  if (text === 'команди' || text === 'help') {
    return ctx.reply(HELP_MESSAGE, { parse_mode: 'HTML' });
  }

  if (text.includes('пінгвін')) {
    return ctx.reply(`<pre>${TUX_ART}</pre>`, { parse_mode: 'HTML' });
  }

  for (const [key, filePath] of Object.entries(VIDEO_RESPONSES)) {
    if (text.includes(key)) {
      if (fs.existsSync(filePath)) {
        return ctx.replyWithVideo({ source: filePath });
      } else {
        return ctx.reply(`[Помилка]: Відео ${filePath} не знайдено на сервері.`);
      }
    }
  }

  for (const [key, filePath] of Object.entries(PHOTO_RESPONSES)) {
    if (text.includes(key)) {
      if (fs.existsSync(filePath)) {
        return ctx.replyWithPhoto({ source: filePath });
      } else {
        return ctx.reply(`[Помилка]: Файл ${filePath} не знайдено на сервері.`);
      }
    }
  }

  for (const [key, response] of Object.entries(RESPONSES)) {
    if (text.includes(key)) {
      return ctx.reply(response);
    }
  }
});

bot.launch().then(() => {
  console.log('🐧 Тукс бот успішно запущений!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
