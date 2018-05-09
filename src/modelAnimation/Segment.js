export default class Segment {
  constructor(_x, _y, _angle, _len, _residueSize, sketch) {
    this.position = sketch.createVector(_x,_y);
    this.b = sketch.createVector(0,0);
    this.angle = _angle;
    this.len = _len;
    this.residueSize = _residueSize
    this.calculateB(sketch);
  }
  calculateB (sketch) {
    let dx = this.len * Math.cos(this.angle);
    let dy = this.len * Math.sin(this.angle);
    this.b = sketch.createVector(this.position.x + dx, this.position.y + dy);
  }
  getB () {
    return this.b;
  }
  show (sketch) {
    sketch.stroke('rgba(100,100,100,0.5)');
    sketch.strokeWeight(7);
    sketch.line(this.position.x, this.position.y, this.b.x, this.b.y);
    sketch.noStroke();
    sketch.fill(255,100,10);
    sketch.ellipse(this.b.x,this.b.y,this.residueSize,this.residueSize);
  }
}
