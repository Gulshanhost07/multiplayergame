document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');

    const updateGame = async () => {
        const response = await fetch(`/api/updateGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomCode }),
        });

        const data = await response.json();
        // update game status and rounds
    };

    updateGame();
    setInterval(updateGame, 5000);
});
