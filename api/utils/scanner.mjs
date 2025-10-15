import readline from 'readline';

export function scanner(questionPrompt){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise ((resolve) =>
        rl.question(questionPrompt, (result) => {
            rl.close();
            resolve(result);
        })
    );
}
