const Tag = require('./../models/tag');
const Bag = require('./../models/bag');
const BagUuid = require('../models/BagUuid');
const Room = require('./../models/room');
const History = require('./../models/history');
const Helper = require('./../models/helper');
const authenticateToken = require('../userAuthenticateToken');
var io;

function initialize(server) {
  io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('Client connected to a socket');
    console.log(socket.id);

    socket.on('showTags', async (body) => {
      const bagUuid = body.uuid;
      const filter = body.filter;
      console.log(filter);
      try {
        const uuid = await BagUuid.findOne({uuid:bagUuid});
        if(uuid === null){
          return;
        }
        const bag = uuid.bag;
        const tags = await Tag.find({bag:bag});
        socket.emit('tagsData', tags);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on('showHistory', async () => {
      try{
        const history = await History.find();
        
        socket.emit('historyData',history);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on('createRoom', authenticateToken, async (jwt) =>{
      const userJwt = jwt.user;
      return;
      try{
        const helper = await Helper.aggregate([{ $sample: { size: 1 } }]);
        const newRoom = new Room();
        newRoom.user = user;
        newRoom.helper = helper._id;
        await newRoom.save();
        console.log(newRoom._id);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on('joinRoom', async () => {
      try {
        const roomID = '643d4f03376f4407c7e871ee';
        const query = { roomID: roomID };
        const room = await Room.findOne(query);
        socket.join(roomID);
      } catch (e) {
        console.log(e);
      }
    });
    
  });
}

module.exports = {initialize,io};
