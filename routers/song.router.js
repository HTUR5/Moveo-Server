import { Router } from 'express'
const router = Router()
import songService from '../BL/song.service.js'

router.get('/', async (req, res) => {
  try {
    const songs =  await songService.getAllSongs();
    res.send(songs);
  } catch (err) {
    res.status(400).send(err?.message || "Error");
  }
});

router.get('/filter/:songName', async (req, res) => {
  try {
    const songs =  await songService.findSong(req.params.songName.toLowerCase());
    res.send(songs);
  } catch (err) {
    res.status(400).send(err?.message || "Error");
  }
})

router.get('/:songId', async (req, res) => {
  try {
    const song =  await songService.getSingleSong(req.params.songId);
    res.send(song);
  } catch (err) {
    res.status(400).send(err?.message || "Error");
  }
})

export default router;