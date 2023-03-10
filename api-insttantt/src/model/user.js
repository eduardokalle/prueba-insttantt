import { Schema, model } from "mongoose";

const schema = new Schema(
   {
      email: {
       type: String,
       required: true,
      },
      phoneNumber: {
       type: String,
      },
      firstname: {
         type: String,
      },
      lastname: {
         type: String,
      },
      documentType: {
         type: String,
      },
      documentNumber: {
         type: String,
      },
      birthdate: {
         type: String,
      },
      expeditionDate: {
         type: String,
      },
      country: {
         type: String,
      },
      city: {
         type: String,
      },
      address: {
         type: String,
      },
      photoProfile: {
         type: String,
      },

   }, 
   {
     timestamps: true,
   }
 );
 
 export default model("User", schema);