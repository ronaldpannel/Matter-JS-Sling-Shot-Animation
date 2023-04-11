class Particle {
  constructor(x, y, r, color, fixed) {
    let options = {
      friction: 0,
      restitution: 0.95,
      isStatic: fixed
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.color = color
    Composite.add(engine.world, [this.body]);
  }
  isOffScreen() {
    let pos = this.body.position;
    if (pos.x < 0 || pos.x > width || pos.y > height) {
      return true;
    } else {
      return false;
    }
  }
  removeFromWorld(){
    Composite.remove(world, this.body)
  }
  draw() { 
    let r = random( 1, 225)
    let b = random( 1, 225)
    let g = random( 1, 225)
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(this.color);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
