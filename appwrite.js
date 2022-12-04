import { Client, Account, Databases, Storage, ID, Permission, Role , Query  } from "appwrite";

const client = new Client();

client
    .setEndpoint('http://51.91.97.19:8082') // Your API Endpoint
    .setProject('delivered') // Your project ID
;
const account = new Account(client);
const storage = new Storage(client);

const db = new Databases(client);


export {client, account, storage, ID, db,Permission, Role, Query };

