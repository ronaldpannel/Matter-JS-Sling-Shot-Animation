// module aliases
const Engine = Matter.Engine,
  //Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Constraint = Matter.Constraint,
  Composite = Matter.Composite;

let boundary;
let boundaryArray = [];
let particleArray = [];
let ballArray = [];
let colorArray = ["red", "blue", "orange", "green", "yellow", "pink", "purple"];
let world;
let engine;
let mConstraint
let frameCount = 0;

function setup() {
  let canvas = createCanvas(600, 600);
  frameRate(30);

  engine = Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);
  let prev = null;
  let next = null;

  for (let x = 50; x < 550; x += 10) {
    let fixed = false;
    if (!prev) {
      fixed = true;
    }
    if (next) {
      fixed = true;
    } else {
      next = false;
    }

    let p = new Particle(x, 100, 5, "brown", fixed);
    // let p2 = new Particle(200, 150, 10);

    particleArray.push(p);

    // particleArray.push(p2);
    if (prev) {
      let options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 10,
        stiffness: 0.9,
        damping: 0.5,
        restitution: 0.1,
      };

      let constraint = Constraint.create(options);
      Composite.add(engine.world, [constraint]);
    }
    prev = p;
    next = particleArray[particleArray.length - 49];
  }

  boundaryArray.push(new Boundary(width * 0.5, height, width * 0.75, 20, 0.0));

  let canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  let options = {
    mouse: canvasMouse,
  };

  //mouse = Matter.Mouse.setElement(mouse, canvas);
  mConstraint = MouseConstraint.create(engine, options);
  Composite.add(world, mConstraint);

  //setup end
}

// function mousePressed() {
//   ballArray.push(new Particle(mouseX, mouseY, random(10, 20), "green"));
// }



function draw() {
  background(0);
  frameCount++;

  if (frameCount % 100 === 0) {
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];

    ballArray.push(new Particle(width/2, -50, random(10, 11), color));
    // ballArray.push(new Particle(500, -50, random(10, 11), color));
  }

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    if (particleArray[i].isOffScreen()) {
      particleArray[i].removeFromWorld();
      particleArray.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].draw();
    if (ballArray[i].isOffScreen()) {
      ballArray[i].removeFromWorld();
      ballArray.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < boundaryArray.length; i++) {
    boundaryArray[i].draw();
  }

   if (mConstraint.body) {
     let pos = mConstraint.body.position;
     let offset = mConstraint.constraint.pointB;
     let m = mConstraint.mouse.position;
     stroke(0, 255, 0);
     strokeWeight(2);
     line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
   }
  // stroke('red')
  // strokeWeight(2)
  // line(
  //   particleArray[0].body.position.x,
  //   particleArray[0].body.position.y,
  //   particleArray[1].body.position.x,
  //   particleArray[1].body.position.y
  // )
  //console.log(particleArray.length, world.bodies.length);

  //draw end
}

function windowResized() {
  resizeCanvas(600, 600);
  draw();
}
