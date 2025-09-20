#!/usr/bin/env node

const {Command} = require("commander");

const program = new Command();

async function getJoke(category) {
  let url = "https://official-joke-api.appspot.com/jokes/random";

    if (category) {
    url = `https://official-joke-api.appspot.com/jokes/${category}/random`;
  }


  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);

    // API sometimes returns array for category endpoints
    const joke = Array.isArray(data) ? data[0] : data;

    console.log("\n🤔 " + joke.setup);
    setTimeout(() => console.log( ".....\n"+ joke.punchline + "🤭"+"\n"), 1200);
  } catch (err) {
    console.error("Failed to fetch joke:", err.message);
  }
}

program
  .name("joke")
  .description("A CLI joke teller")
  .option("-c, --category <type>", "Choose category: programming, general, knock-knock")
  .action((options) => {
    getJoke(options.category);
  });

program.parse(process.argv);