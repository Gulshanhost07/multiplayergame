const fs = require('fs');
const path = require('path');
const roomsFilePath = path.join(__dirname, '../data/rooms.json');

module.exports = (req, res) => {
    const { playerName, roomCode } = req.body;

    let rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));

    if (!rooms[roomCode]) {
        return res.status(400).json({ message: 'Room not found' });
    }

    rooms[roomCode].players.push({ name: playerName, ready: false });

    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));

    res.json({ success: true });
};
