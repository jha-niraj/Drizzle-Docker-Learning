"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("./db/schema");
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.execute((0, drizzle_orm_1.sql) `SELECT 1`);
            console.log("✅ Database connected successfully!");
        }
        catch (err) {
            console.error("❌ Database connection failed:", err);
        }
    });
}
testConnection();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Healthy!!!");
});
app.post("/createuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return res.json({
                success: false,
                msg: "Invalid data!!!"
            });
        }
        const newUser = yield db.insert(schema_1.users).values({
            name,
            email,
            age
        });
        if (!newUser) {
            return {
                success: false,
                msg: "Failed to create new user!!!"
            };
        }
        return res.json({
            success: true,
            msg: "Successfully created a user!!!"
        });
    }
    catch (err) {
        console.log("Error occurred while getting the users: " + err);
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUsers = yield db.select().from(schema_1.users);
        if (!fetchedUsers) {
            return {
                success: false,
                msg: "Failed to get the users!!!"
            };
        }
        return res.json({
            success: true,
            msg: "Successfully fetched all users!!!",
            users: fetchedUsers
        });
    }
    catch (err) {
        console.log("Error occurred while getting the users: " + err);
    }
}));
app.listen(3004, () => {
    console.log("Server is running on port 3004!!!");
});
// import express from "express";
//     
// const app = express();
//     
// app.get("/", (req, res) => {
//     res.send("Server is healthy");
// })
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
