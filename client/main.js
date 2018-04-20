import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import baseMap from './maps/base-map';
import { Speed, Tiles } from './constants/game-settings'
import preload from './game/preload';
import registerEvents from './game/events';
import './main.html';

const spriteCoords = [0, 1, 2, 9, 10, 11, 18, 19, 20, 27, 28, 29];

class Character {
  constructor(frame, game, x, y) {
    this.sprite = game.add.sprite(x, y, 'characters', frame);
    this.sprite.scale.set(.5);
    this.sprite.smoothed = false; 
    this.animations = {}; 
    this.animations.walkDown = this.getAnimation('walkDown', 0, 1, 2, frame); 
    this.animations.walkLeft = this.getAnimation('walkLeft', 3, 4, 5, frame); 
    this.animations.walkRight = this.getAnimation('walkRight', 6, 7, 8, frame); 
    this.animations.walkUp = this.getAnimation('walkUp', 9, 10, 11, frame); 
  }

  getAnimation(name, a, b, c, frame) {
    return this.sprite.animations.add(name, [frame + spriteCoords[a], frame + spriteCoords[b], frame + spriteCoords[c]],24,false)
  }
}

function findPhaser() {
  if (!Phaser) {
    setTimout(findPhaser, 1000)
  } else {
    startGame(Phaser);
  }
}

setTimeout(findPhaser, 1000);

function startGame(phaser) {
  const { innerWidth, innerHeight } = window;
  var game = new Phaser.Game(innerWidth, innerHeight, Phaser.AUTO, '', { preload: preload, create: create  });


  function create () {
    var logo = game.add.sprite(0, 0, 'grass');
    const map = createMap(20, 20, baseMap);
    let row = 0;
    let column = 0;
    map.forEach(tile => {
      const tileImage = game.add.sprite(column * 64, row * 64, tile);
      column++;
      if(column >= 20) {
        row++;
        column = 0;
      }

    });
    registerEvents(new Character(0, game, 100, 100))
  }
}

function createMap(rows, columns, fromMap) {
  const map = [];
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for(let ii = 0; ii < columns; ii++) {
      const index = fromMap[count];
      const tile = Object.keys(Tiles)[index];
      map.push(tile);
      count++;
    }
  }
  return map;
}