class Boundary {
  constructor(x, y, w, h, a) {
    let options = {
      friction: 0.001,
      restitution: 0.9,
      isStatic:true,
      angle: a
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    Composite.add(engine.world, [this.body]);
  }
  draw() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(0,255,0);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
