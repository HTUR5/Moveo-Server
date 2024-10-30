import songsData from '../data/songs.js'

async function getAllSongs() {
    return songsData;
}

async function getSingleSong(songId) {
    return songsData.find(s => s.id == songId)
}

async function findSong(songName) {

    const songs = songsData.filter(song =>
        song.name.toLowerCase().includes(songName) ||
        song.artist.toLowerCase().includes(songName))

    if (songs.length == 0) throw { message: "songs not found" }

    return songs
}




export default { getAllSongs, getSingleSong, findSong }