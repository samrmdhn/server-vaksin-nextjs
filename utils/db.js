import mongoose from "mongoose";const db = async () =>
  mongoose

    .connect(
      "mongodb+srv://samrmdhn:yHV7hmVE666@cluster0.oyqc66i.mongodb.net/test"
    )
    .then(() => console.log(`DB CONNECTED BITCHH`))
    .catch((err) => console.log(err));
/*
    mongoose.connect(
      "mongodb+srv://samrmdhn:yHV7hmVE666@cluster0.laf5pqx.mongodb.net/test"
      );
      
      //  .connect("mongodb://localhost:27017/db_vaksin_remake")
  
mongoose.connect(
"mongodb+srv://samrmdhn:yHV7hmVE666@cluster0.laf5pqx.mongodb.net/test"
*/
export default db;
