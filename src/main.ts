import { Country, SearchResult, search, processCountries} from "./CountryHandler";


import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("welcome to countries....\n");

async function prompt(){
    const countries = await processCountries();
    rl.question("Please enter your search parameters > ", (userInput: string) => {
        console.log("You entered: " + userInput);
        search(countries, userInput).forEach((result)=>{console.log(result)});
        rl.close(); // Close the interface after receiving the input
    });
} 
prompt();

