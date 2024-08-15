const fs = require('fs');
const path = require('path');
const roomsFilePath = path.join(__dirname, '../data/rooms.json');

module.exports = (req, res) => {
    const { playerName } = req.body;
    const roomCode = Math.random().toString(36).substr(2, 4).toUpperCase();

    let rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));
    rooms[roomCode] = { players: [{ name: playerName, ready: false }] };

    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));

    res.json({ roomCode });
};
