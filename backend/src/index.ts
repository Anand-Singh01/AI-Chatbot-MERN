import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

connectToDatabase().then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`Server Open and connected to database 🤝`);
    })
})
.catch((error)=>
{
    console.log(error);
})