import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//Connect DataBase
connectDB();

//Listing on port 4000
app.listen(process.env.PORT, () => {
  console.log(
    `Server Working on ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
