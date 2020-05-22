const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

const publicComponents = key.exportKey("pkcs8-pem");
console.log(publicComponents);

const text =
  "SINGAPORE: The number of COVID-19 cases in Singapore crossed the 13,000 mark on Sunday (Apr 26), after another 931 cases were confirmed as of noon. The vast majority of the latest cases are work permit holders residing in foreign worker dormitories, the Ministry of Health (MOH) said in its preliminary release of figures. Fifteen cases are Singaporeans or permanent residents, added MOH. The new cases bring the national total to 13,624.";
const encrypted = key.encrypt(text, "base64");
console.log("encrypted: ", encrypted);
const decrypted = key.decrypt(encrypted, "utf8");
console.log("decrypted: ", decrypted);
