"use strict";
// import express from "express";
//     
// const app = express();
//     
// app.get("/", (req, res) => {
//     res.send("Server is healthy");
// })
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.listen(3004, () => {
//     console.log("Server is listening on 3004!!!");
// })
// import 'dotenv/config'
// import { usersTable } from "./db/schema"
// import { eq } from "drizzle-orm"
// import { drizzle } from "drizzle-orm/node-postgres"
//     
// const db = drizzle(process.env.DATABASE_URL!);
//     
// async function main() {
//     const user : typeof usersTable.$inferInsert = {
//         name: "Sonali Jha",
//         email: "jhasonali45@gmail.com",
//         age: 21
//     }
//     
//     await db.insert(usersTable).values(user);
//     console.log("Inserted an user data!!!");
//     
//     const prevUsers = await db.select().from(usersTable);
//     console.log("Showing all the users in the table: " + JSON.stringify(prevUsers));
//     
//     await db
//         .update(usersTable)
//         .set({
//             age: 25
//         })
//     .where(eq(usersTable.email, user.email));
//     console.log("Updated the user age!!!");
//     
//     const afterUsers = await db.select().from(usersTable);
//     console.log("Showing all the users in the table: " + JSON.stringify(afterUsers));
//     
//     await db
//         .delete(usersTable)
//         .where(eq(usersTable.email, user.email))
//     
//     const lastStates = await db.select().from(usersTable);
//     console.log("Showing all the users in the table: " + JSON.stringify(lastStates));
// }
// main();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Healthy!!!");
});
app.listen(3004, () => {
    console.log("Server is running on port 3004!!!");
});
