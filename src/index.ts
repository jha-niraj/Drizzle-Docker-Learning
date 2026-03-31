import express from "express"
import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { users } from "./db/schema";
    
const db = drizzle(process.env.DATABASE_URL!);

async function testConnection() {
    try {
        await db.execute(sql`SELECT 1`);
        console.log("✅ Database connected successfully!");
    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
}
testConnection();

const app = express();
app.use(express.json());    

app.get("/", (req, res) => {
    res.send("Healthy!!!");
})

app.post("/createuser", async (req, res) => { 
    try {
        const { name, email, age } = req.body;
        
        if(!name || !email || !age) {
            return res.json({
                success: false,
                msg: "Invalid data!!!"
            })
        }
        
        const newUser = await db.insert(users).values({
            name,
            email,
            age
        })
        
        if(!newUser) {
            return {
                success: false,
                msg: "Failed to create new user!!!"
            }
        }
        
        return res.json({
            success: true,
            msg: "Successfully created a user!!!"
        })
    } catch(err) {
        console.log("Error occurred while getting the users: " + err);
    }
})

app.get("/users", async (req, res) => {
    try {
        const fetchedUsers = await db.select().from(users);
        
        if(!fetchedUsers) {
            return {
                success: false,
                msg: "Failed to get the users!!!"
            }
        }
        
        return res.json({
            success: true,
            msg: "Successfully fetched all users!!!",
            users: fetchedUsers
        })
    } catch(err) {
        console.log("Error occurred while getting the users: " + err);
    }
})

app.listen(3004, () => {
    console.log("Server is running on port 3004!!!");
})

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