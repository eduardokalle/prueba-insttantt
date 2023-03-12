
 import User from "./model/user";
 import Hobbies from "./model/hobbies";

 export default (io) => {
   io.on("connection", (socket) => {
    
     console.log("nuevo socket connectado:", socket.id);
 
     // Send all messages to the client
     const emitUsers = async () => {
       const users = await User.find();
       socket.emit("server:loaduserss", users);
     };
     emitUsers();
 
     socket.on("client:newuser", async (data) => {
      const newUser = new User(data);
      const documentNumber = data.documentNumber
      const existingUser = await User.findOne({documentNumber: documentNumber});
      console.log(existingUser);
       if (existingUser) {
          io.emit("server:newuser", "usuario en db");
         }else {
          const savedUser = await newUser.save();
          console.log(savedUser);
          io.emit("server:newuser", savedUser._id);
          emitUsers();
         }
      
     });
 
     socket.on("client:deleteuser", async (userId) => {
       await User.findByIdAndDelete(userId);
       emitUsers();
     });
 
     socket.on("client:getuser", async (userId) => {
       const user = await User.findById(userId);
       socket.emit("server:getuser", user);
     });
 
    //  socket.on("client:updateuser", async (updatedUser) => {
    //    await User.findByIdAndUpdate(updatedUser._id, {
    //     email: updatedUser.email,
    //     phoneNumber: updatedUser.phoneNumber,
    //     firstname: updatedUser.firstname,
    //     lastname: updatedUser.lastname,
    //     documentType: updatedUser.documentType,
    //     documentNumber: updatedUser.documentNumber,
    //     birthdate: updatedUser.birthdate,
    //     expeditionDate: updatedUser.expeditionDate,
    //     country: updatedUser.country,
    //     city: updatedUser.city,
    //     address: updatedUser.address,
    //     photoProfile: updatedUser.photoProfile,
    //    });
    //    io.emit("server:updateuser", "resgitro completado");
    //  });

     socket.on("client:updateusercomplete", async (updatedUserComplete) => {
      await User.findByIdAndUpdate(updatedUserComplete._id, {
        country: updatedUserComplete.country,
        city: updatedUserComplete.city,
        address: updatedUserComplete.address,
        photoProfile: updatedUserComplete.photoProfile,
      });
      console.log(updatedUserComplete);
      io.emit("server:updateusercomplete", "resgitro completado");
    });

    socket.on("client:newhobbies", async (data) => {
      const newHobbies = new Hobbies(data);
      const savenewHobbies = await newHobbies.save();
      console.log(savenewHobbies);
      io.emit("server:newhobbies", savenewHobbies);
     });

     socket.on("client:gethobbies", async (data) => {
      const idUser = data;
      const existingHobbies = await Hobbies.find({idUser: idUser});
      console.log(existingHobbies);
      socket.emit("server:selectedhobbies", existingHobbies);
    });

    socket.on("client:login", async (data) => {
      const user = data.user
      const existingUser = await User.findOne({email: user});
      console.log(existingUser);
      
      if (existingUser == null) {
        io.emit("server:login", "el usuario no existe registrese porfavor");
        
      }else{
        if (existingUser.phoneNumber == data.password) {
          io.emit("server:login", "credenciales correctas");
          io.emit("server:loginID", existingUser._id);
        }else {
          io.emit("server:login", "credenciales incorrectas");
         }
      }
     });   

     socket.on("disconnect", () => {
       console.log(socket.id, "disconnected");
     });


   });
 };
 