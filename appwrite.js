import { Client, Account, Database } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://localhost/v1') // Your API Endpoint
    .setProject('dash1') // Your project ID
;
const account = new Account(client);


export {account}