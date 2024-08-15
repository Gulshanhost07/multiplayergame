const fs = require('fs');
const path = require('path');
const roomsFilePath = path.join(__dirname, '../data/rooms.json');

module.exports = (req, res) => {
    const { roomCode } = req.body;

    let rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));

    if (!rooms[roomCode]) {
        return res.status(400).json({ message: 'Room not found' });
    }

    rooms[roomCode].status = 'started';

    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));

    res.json({ success: true });
};
