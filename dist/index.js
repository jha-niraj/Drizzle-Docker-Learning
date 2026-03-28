"use strict";
// import express from "express";
//     
// const app = express();
//     
// app.get("/", (req, res) => {
//     res.send("Server is healthy");
// })
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.listen(3004, () => {
//     console.log("Server is listening on 3004!!!");
// })
require("dotenv/config");
const schema_1 = require("./db/schema");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            name: "Sonali Jha",
            email: "jhasonali45@gmail.com",
            age: 21
        };
        yield db.insert(schema_1.usersTable).values(user);
        console.log("Inserted an user data!!!");
        // 
        // const prevUsers = await db.select().from(usersTable);
        // console.log("Showing all the users in the table: " + JSON.stringify(prevUsers));
        // 
        // await db
        //     .update(usersTable)
        //     .set({
        //         age: 25
        //     })
        // .where(eq(usersTable.email, user.email));
        // console.log("Updated the user age!!!");
        // 
        // const afterUsers = await db.select().from(usersTable);
        // console.log("Showing all the users in the table: " + JSON.stringify(afterUsers));
        // 
        // await db
        //     .delete(usersTable)
        //     .where(eq(usersTable.email, user.email))
        // 
        // const lastStates = await db.select().from(usersTable);
        // console.log("Showing all the users in the table: " + JSON.stringify(lastStates));
    });
}
main();
