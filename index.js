// importing modules
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socket = require('./sockets/initialize');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

//Importing routes
const userRoutes = require('./routes/userRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const tagRoutes = require('./routes/tagRoutes');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const bugRoutes = require('./routes/bugRoutes');
const faqRoutes = require('./routes/faqRoutes');
const adminRoutes = require('./routes/administratorRoutes');
const bagRoutes = require('./routes/bagRoutes');
const cartRoutes = require('./routes/cartRoutes');
//const bagUuidRoutes = require('./routes/bagUuidRoutes');
const helpRoutes = require('./routes/helpRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);

app.use(express.json());
app.use(cors());
// Serve static files from the 'assets' directory
app.use(express.static('assets'));

const DB = "mongodb+srv://onecupoftea93:5z3lIfMiswX0Lv6i@cluster.dpvxp6k.mongodb.net/?retryWrites=true&w=majority";

app.use('/user',userRoutes);
app.use('/bag',bagRoutes);
app.use('/settings',settingsRoutes);
app.use('/bug', bugRoutes)
app.use('/tag',tagRoutes);
app.use('/auth',authRoutes);
app.use('/history',historyRoutes);
app.use('/faq',faqRoutes);
app.use('/admin',adminRoutes);
app.use('/cart', cartRoutes);
app.use('/bag/uuid', bagUuidRoutes);
app.use('/help', helpRoutes);
app.use('/favourite', favouriteRoutes);
app.use('/review',reviewRoutes);

socket.initialize(server);


app.use(fileUpload());


// io.on('connection',(socket) => {
//     console.log('Client connected to a socket');

//     // socket.on('createRoom', async ({nickname}) => {
//     //    try{
//     //     let room = new Room();
//     //     let player = {
//     //         socketID: socket.id,
//     //         nickname,
//     //         playerType:'X',
//     //     };
//     //     room.players.push(player);
//     //     room.turn = player;
//     //     room = await room.save();
//     //     console.log(room);
//     //     const roomId = room._id.toString();
//     //     socket.join(roomId);
//     //     io.to(roomId).emit('createRoomSuccess', room);
//     //    } catch (e) {
//     //        console.log(e);
//     //    }
//     // });

//     socket.on('showTags', async () =>{
//         try{
//             const tags = await Tag.find();
//             socket.emit('tagsData', tags)
//         } catch (e) {
//             console.log(e);
//         }
//     });

//     socket.on('joinRoom', async() =>{
//         try{
//             const roomID = '643d4f03376f4407c7e871ee';
//             const query = { roomID: roomID };
//             const room = await Room.findOne(query);
//             socket.join(roomID);
//         } catch (e) {
//             console.log(e);
//         }
//     });
// });

mongoose.connect(DB).then(() => {
    console.log("Connection successful!");
}).catch((e) =>{
    console.log(e);
});

server.listen(port, () =>{
    console.log(`Server has started and running on port ${port}`);
});

// const express = require('express');
// const http = require('http');
// const mongoose = require('mongoose');
// const User = require('./models/user');
// const Bag = require('./models/bag');
// const Tag = require('./models/tag');
// const io = require('socket.io');

// class Server {
//   constructor() {
//     this.app = express();
//     this.port = process.env.PORT || 8000;
//     this.server = http.createServer(this.app);
//     this.io = io(this.server);

//     this.DB = "mongodb+srv://onecupoftea93:5z3lIfMiswX0Lv6i@cluster.dpvxp6k.mongodb.net/?retryWrites=true&w=majority";
//   }

//   initialize() {
//     this.configureMiddleware();
//     this.configureRoutes();
//     this.connectToDatabase();
//     this.startServer();
//   }

//   configureMiddleware() {
//     this.app.use(express.json());

//     this.io.on('connection',(socket) => {
//       console.log('Client connected to a socket');

//       socket.on('showTags', async () =>{
//         try{
//             const tags = await Tag.find();
//             socket.emit('tagsData', tags)
//         } catch (e) {
//             console.log(e);
//         }
//       });
//     });
//   }
// }

// new Server();