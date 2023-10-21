import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, SSL } = process.env;
 const ssl = Boolean(SSL);

//reading certificates from file
// const serverCert = "code_schulesoft_com_c34b5_d6e6f_1688554993_65ebc56a3a86e641e3a986d88d9c669d";
// const clientKey = "c34b58dc57fc2b4751362c9274ab289d62209484b264c6e553307610adba5c5d4173a126ffa0d4d3a166f595c2a5d7a7e1a6d78c2a61263e9d22e8e3b71e33e323319513711bf2dbff2fe873e10d3bcb3b564edbd53ab570b185b965e52944dc523c289b9dc27e68cf2d8dc90bd535f68be890cb95ca81d760d1bd63313b5fe27b327ea209c455c9fde740ca71488f471a3281a2fb0a410ceb057f5ca97909aa5abfdda34d69183e4ddeedc79cefc9f704edb0a48cc11612db8f6c7fee1cea149a46f41bb29ac6a4348e2af7d3e9f53b6ece9d12403154d0a7f512bce73f0939e7e95f258d411a48c3cddd48fbb431aa0a32a428b07de12bcd5fc901a2fd6e6f";
//const clientCert = [fs.readFileSync("client.pem", "utf8")];


module.exports = {
  development: {
    DATABASE: DATABASE,
    USER: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    HOST:DB_HOST,
    dialect: 'mysql',
    // ssl: {
    //   ca: serverCert,
    //   //cert: clientCert,
    //   key: clientKey
    //   },
    dialectOptions: {
      ssl,
    },
  },
//   test: {
//     url: TEST_DATABASE_URL,

//   },
//   production: {
//     url: DATABASE_URL,
//     dialectOptions: {
//       ssl,
//     },
//   },
};
