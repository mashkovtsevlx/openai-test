const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


(async function() {
  while (true) {
    const message = await askQuestion("alex: ");
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 2048,
      prompt: message,
    });
    console.log(`Bot: ${completion.data.choices[0].text.trim()}`);
  }
}());
