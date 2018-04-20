import { Tiles } from '../constants/game-settings';

export default function preload (game) {
  Object.keys(Tiles).forEach(tile => {
    game.load.image(tile, Tiles[tile]);
  })
  game.load.spritesheet('mummy', '/metalslug_mummy37x45.png', 37, 45, 18);
  game.load.spritesheet('characters', '/characters.png', 95, 96)
}