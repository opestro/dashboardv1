import { Client, Account, Databases, Storage, ID, Permission, Role , Query  } from "appwrite";

const client = new Client();

client
    .setEndpoint('http://192.168.1.4/v1') // Your API Endpoint
    .setProject('dash1') // Your project ID
;
const account = new Account(client);
const storage = new Storage(client);

const db = new Databases(client);


export {client, account, storage, ID, db,Permission, Role, Query };

