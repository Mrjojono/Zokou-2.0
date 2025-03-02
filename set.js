const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkF6L0RHQ1c0eTdYalVWaEVHV1BZdkV2Nng1YWZ6MGRqTkNiS3J1ZFNXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXVYRGhiMEljVldWYk9XS2NVSGNkUjN4NUNSVHgzRjIrNVB0b2JpNElVUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SGlFZXZPQ2x3S3ZrZ1pTUzVFa0g4eTdLdlg2OW9KaVZyNjRleUY3N1hRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJU1ZWMitTeEw3NlB4RFNJd3UwdE96b1phQnlvSEtzYU5YNEZHdVkvV2hjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEVkx1NE93L1RDUEpxaG0xODNnNzhmUmNUeU8rcE1PZ3RzREp5dFNmRUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFaSmhJZE0vVFNVaUYvOFJsYXN6Wm0xckV4MUJvTzlwNzdHS1U5YW4zaUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUYwd2Q5c0w4dWViTEVMaWNmQyswVzFoMjNoWUhYMFhYY2lSeTBOUzBFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmUwVXM2SGpISUVBWDZidG5jdG0xY25wL01mQVZENjhET0Z2cFNxQkZGOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQ4NzFSWEMwcngvbGVuWUxYSHVjSnpjNmJPV1NlTXJtTGhDNDA2MDMrYVRzRFVCNHU0MGp1L0VtM1BteVF2cUtBd2VWTGRjdHRrakk1TndWS2ZGK2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiJuTElYbnhqKzVYV3FJMXVSL3FFanFOU1dnWUV5UU8rY0hWVWx2ZHNETFJjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNMM3hsSUFCRUlQL2tyNEdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtd0Z6djgxd0FacmxEeDZ5THAyOTBaTUd2djJ0SnVPeCtsckZjbEJJaDNJPSIsImFjY291bnRTaWduYXR1cmUiOiJZNXdvZ3RxZnAxYmUyTS9KNko4c0pHdXNKcTh5RUw0djdQZjRYZUtERGdYSmExM01mb2R1eTAyUzVheHNldlhyZEpIUXZ0VUJmWkFpdWl1QVkxeXdBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiV1RubGcwN3BZZndyYXJmOWxkY2JGVWJORGpUeDFGNFNwZkRVVDh0L0JBem1oRnlLaG0yZSt4dE1IWlIyeDdsV0w4WWlScDREWWhPTmdxM1dFbko3alE9PSJ9LCJtZSI6eyJpZCI6IjIyODc5OTcxNDUzOjMwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkpfeV9vYW4iLCJsaWQiOiI0MzE3NzYyNDk5NzkwMzozMEBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI4Nzk5NzE0NTM6MzBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnNCYzcvTmNBR2E1UThlc2k2ZHZkR1RCcjc5clNianNmcGF4WEpRU0lkeSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwOTQ3MzM1LCJsYXN0UHJvcEhhc2giOiIyUDFZaGYifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "joan",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
