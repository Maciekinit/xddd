const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Nasłuchuj połączenia klientów
io.on('connection', socket => {
    console.log('Nowy użytkownik połączony:', socket.id);

    // Nasłuchuj zdarzenia "offer" od klienta nadającego
    socket.on('offer', offer => {
        // Przekazanie oferty do odbiorcy (innego klienta)
        socket.broadcast.emit('offer', offer);
    });

    // Nasłuchuj zdarzenia "answer" od klienta odbierającego
    socket.on('answer', answer => {
        // Przekazanie odpowiedzi do nadającego
        socket.broadcast.emit('answer', answer);
    });

    // Nasłuchuj zdarzenia "candidate" od klienta
    socket.on('candidate', candidate => {
        // Przekazanie kandydata do odbiorcy (lub nadającego, w zależności od implementacji)
        socket.broadcast.emit('candidate', candidate);
    });

    // Obsługa rozłączenia klienta
    socket.on('disconnect', () => {
        console.log('Użytkownik odłączony:', socket.id);
    });
});

// Uruchom serwer na porcie 3000
server.listen(3000, () => {
    console.log('Serwer nasłuchuje na porcie 3000');
});
