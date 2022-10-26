import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { api } from "./connection/api.mjs";

//create readline interface
const rl = readline.createInterface({ input, output });

//tranform question to promise to use async/await syntax instead of callback
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

//function for listening to keypress
const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

async function main() {
  const altitude = await question("Altitude: ");
  if (altitude < 0 || altitude > 3000) {
    console.log("Altitude must be between 0 and 3000");
    rl.close();
    return;
  }
  const hsi = await question("HSI: ");
  if (hsi < 0 || hsi > 360) {
    console.log("HSI must be between 0 and 360");
    rl.close();
    return;
  }
  const adi = await question("ADI: ");
  if (adi < -100 || adi > 100) {
    console.log("ADI must be between -100 and 100");
    rl.close();
    return;
  }
  await console.log("press any key to exit...");
  await keypress();
  console.log("\nsending data...");
  try {
    await api.post("/", {
      altitude: altitude,
      hsi: hsi,
      adi: adi,
    });
  } catch (e) {
    console.log(e);
    rl.close();
  }
  rl.close();
}

main();
