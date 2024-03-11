const getRandomRoom = (rooms) => {
    const roomCount = rooms.length;
    const randomNumber = Math.random();
    const roomNo = Math.floor(randomNumber * roomCount);
    return rooms[roomNo];
}

module.exports = { getRandomRoom };