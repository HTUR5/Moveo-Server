let sockets = [];

const socketFn = (io) => (socket) => {
    console.log("connecting now:", socket.id);
    sockets.push(socket.id)
    
    socket.on('start', (song) => {
        // console.log("Received song data:", song);
        io.emit('start', song);
    });

    socket.on('stop', () => {
        // console.log("Received stop from client");
        io.emit('stop');
    });

    socket.on('disconnect', () => {
        console.log(`disconnecting now: ${socket.id}`);
        delete sockets[socket.id]
    });

}

export default socketFn