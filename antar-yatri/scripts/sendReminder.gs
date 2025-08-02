// antar-yatri/scripts/sendReminder.gs

function sendDailyReminder() {
  const sheet = SpreadsheetApp.openById('19ACXCe2OpfoSSoT8_O6evDl8FevAc4dV0gD-pFxl7yA');
  const data = sheet.getSheetByName('Form Responses 1').getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const name = data[i][1];
    const email = data[i][2];

    const subject = `🧘‍♀️ Antar Yatri — Gentle Reflection Reminder`;
    const body = `Namaste ${name},

Here’s your gentle nudge from Antar Yatri:

🌼 Sanskrit Word of the Day
🌿 Ritual Practice
🧠 Reflective Prompt

Visit your dashboard: https://mahistra.in/antar-yatri/dashboard.html

Om Shanti 🙏  
— Mahistra Team`;

    if (email) {
      MailApp.sendEmail(email, subject, body);
    }
  }
}
