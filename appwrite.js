import { Client, Account, Databases, Storage, ID, Permission, Role , Query  } from "appwrite";

const client = new Client();

client
    .setEndpoint('http://swellty.ovh:8082/v1') // Your API Endpoint
    .setProject('app1') // Your project ID
;
const account = new Account(client);
const storage = new Storage(client);

const db = new Databases(client);


export {client, account, storage, ID, db,Permission, Role, Query };

