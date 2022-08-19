const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground;
var rope, rope2, rope3;
var fruit;
var link, link2, link3;
var fruitImg;
var rabbitImg;
var backgroundImg;
var bunny;
var button1, button2, button3;
var sad;
var eating;
var blinking;
var cut_sound, eat_sound, sad_sound, air_sound, bg_sound;
var muteButton;
var airButton;
var canW,canH;
let engine;
let world;

function preload() {
  fruitImg = loadImage("./assets/melon.png")
  rabbitImg = loadImage("./assets/Rabbit-01.png")
  backgroundImg = loadImage("./assets/background.png")
  blinking = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png")
  sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png")
  eating = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
  blinking.playing = true;
  eating.playing = true;
  sad.playing = true;
  eating.looping = false;
  sad.looping = false;
  cut_sound = loadSound("./assets/sounds/rope_cut.mp3")
  eat_sound = loadSound("./assets/sounds/eating_sound.mp3")
  sad_sound = loadSound("./assets/sounds/sad.wav")
  air_sound = loadSound("./assets/sounds/air.wav")
  bg_sound = loadSound("./assets/sounds/sound1.mp3")

}

function setup() {
  var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canW = displayWidth
    canH = displayHeight
  } else {
    canW = windowWidth
    canH = windowHeight
  }
  createCanvas(canW, canH);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(canW/2, canH -10, canW, 20)
  rope = new Rope(8, { x: 40, y: 30 })
  rope2 = new Rope(7, { x: 370, y: 40 })
  rope3 = new Rope(4, { x: 400, y: 225 })
  fruit = Bodies.circle(300, 300, 30)
  Composite.add(rope.body, fruit)
  link = new Link(rope, fruit)
  link2 = new Link(rope2, fruit)
  link3 = new Link(rope3, fruit)

  blinking.frameDelay = 20
  eating.frameDelay = 20
  sad.frameDelay = 20
  bunny = createSprite(420, canH -80, 100, 100)
  bunny.addAnimation("blink", blinking)
  bunny.addAnimation("eat", eating)
  bunny.addAnimation("sad", sad)
  bunny.scale = 0.2

  button1 = createImg("./assets/cut_button.png")
  button1.position(20, 30)
  button1.size(50, 50)
  button1.mouseClicked(drop)

  button3 = createImg("./assets/cut_button.png")
  button3.position(330, 35)
  button3.size(50, 50)
  button3.mouseClicked(drop2)

  button2 = createImg("./assets/cut_button.png")
  button2.position(370, 200)
  button2.size(50, 50)
  button2.mouseClicked(drop3)


  airButton = createImg("./assets/balloon.png")
  airButton.position(10, 250)
  airButton.size(150, 100)
  airButton.mouseClicked(airBallon)

  muteButton = createImg("./assets/mute.png")
  muteButton.position(450, 20)
  muteButton.size(50, 50)
  muteButton.mouseClicked(mute)

  bg_sound.play()
  bg_sound.setVolume(0.3)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)



}

function draw() {
  background(51);
  image(backgroundImg, width / 2, height / 2, width, height)
  Engine.update(engine);
  ground.display()
  rope.show()
  rope2.show()
  rope3.show()

  if (fruit !== null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 60, 60)
  }
  if (collide(fruit, bunny)) {
    World.remove(world, fruit)
    fruit = null
    bunny.changeAnimation("eat")
    eat_sound.play()
  }
  if (fruit !== null && fruit.position.y > bunny.position.y) {
    bunny.changeAnimation("sad")
    sad_sound.play()
    fruit = null
  }
  drawSprites()




}

function drop() {
  rope.break()
  link.detach()
  link = null
  cut_sound.play()
}

function drop2() {
  rope2.break()
  link2.detach()
  link2 = null
  cut_sound.play()

}

function drop3() {
  rope3.break()
  link3.detach()
  link3 = null
  cut_sound.play()



}

function collide(body, sprite) {
  if (body !== null) {
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (distance <= 80) {
      return true
    } else {
      return false
    }
  }


}


function mute() {
  if (bg_sound.isPlaying()) {
    bg_sound.stop()
  } else {
    bg_sound.play()
  }



}


function airBallon() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
  air_sound.play()

}


