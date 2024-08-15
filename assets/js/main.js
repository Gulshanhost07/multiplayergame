document.getElementById('nameInput').addEventListener('input', function () {
    const playerName = document.getElementById('nameInput').value.trim();
    const hostButton = document.getElementById('hostButton');
    const joinButton = document.getElementById('joinButton');

    if (playerName.length > 0) {
        hostButton.disabled = false;
        joinButton.disabled = false;
    } else {
        hostButton.disabled = true;
        joinButton.disabled = true;
    }
});

document.getElementById('joinButton').addEventListener('click', function () {
    document.getElementById('joinPopup').classList.remove('hidden');
    document.getElementById('popupOverlay').classList.remove('hidden');
});

document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('joinPopup').classList.add('hidden');
    document.getElementById('popupOverlay').classList.add('hidden');
});

document.getElementById('joinGameButton').addEventListener('click', async function () {
    const playerName = document.getElementById('nameInput').value.trim();
    const roomCode = document.getElementById('roomCodeInput').value.trim();

    if (roomCode.length === 0) {
        alert('Please enter a room code');
        return;
    }

    const response = await fetch('/api/joinRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, roomCode }),
    });

    if (response.ok) {
        window.location.href = `/room.html?roomCode=${roomCode}`;
    } else {
        alert('Error joining room');
    }
});

document.getElementById('hostButton').addEventListener('click', async function () {
    const playerName = document.getElementById('nameInput').value.trim();

    const response = await fetch('/api/createRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName }),
    });

    const data = await response.json();
    if (response.ok) {
        window.location.href = `/room.html?roomCode=${data.roomCode}`;
    } else {
        alert('Error creating room');
    }
});
