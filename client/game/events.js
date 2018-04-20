import { Speed } from '../constants/game-settings'

function playAnimation(key, character) {
  if (!character.animations[key].isPlaying) {
    character.animations[key].play(10, true);
    const others = Object.keys(character.animations).filter(anim => anim !== key);
    others.forEach(key => character.animations[key].stop())
  }
}
export default function registerEvents(character) {
  $('body').keydown((e) => {
    e.preventDefault();
    console.log(e.key)
    if (e.key === "ArrowLeft") {
      playAnimation('walkLeft', character);
      character.sprite.position.x -= Speed;
    } else if (e.key === "ArrowRight") {
      playAnimation('walkRight', character);
      character.sprite.position.x += Speed;
    } else if (e.key === "ArrowUp") {
      playAnimation('walkUp', character); 
      character.sprite.position.y -= Speed;
    } else if (e.key === "ArrowDown") {
      playAnimation('walkDown', character); 
      character.sprite.position.y += Speed;
    }  
  })
  $('body').keyup((e) => {
    e.preventDefault();
    console.log(e.key)
        if (e.key === "ArrowLeft"){
        character.animations.walkLeft.stop();
        } else if (e.key === "ArrowRight"){
        character.animations.walkRight.stop();
        } else if (e.key === "ArrowUp"){
        character.animations.walkUp.stop();
        } else if (e.key === "ArrowDown"){
        character.animations.walkDown.stop();
        }
    })
}