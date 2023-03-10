import { Schema, model } from "mongoose";

const schema = new Schema(
   {
      hobbie: {
         type: String,
      },
      idUser: {
       type: String,
      },
   }, 
   {
     timestamps: true,
   }
 );
 
 export default model("Hobbies", schema);