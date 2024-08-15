document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');

    document.getElementById('roomCode').textContent = roomCode;

    const updatePlayers = async () => {
        const response = await fetch(`/api/updateRoom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomCode }),
        });

        const data = await response.json();
        const playersList = document.getElementById('playersList');
        playersList.innerHTML = data.players.map(player => `<p>${player.name} - ${player.ready ? 'Ready' : 'Not Ready'}</p>`).join('');
    };

    document.getElementById('readyButton').addEventListener('click', async function () {
        const response = await fetch('/api/startGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomCode }),
        });

        if (response.ok) {
            window.location.href = `/game.html?roomCode=${roomCode}`;
        }
    });

    updatePlayers();
    setInterval(updatePlayers, 5000);
});
