import Segment from './Segment';

export default class Animation {
  constructor (_lenSize, _residueSize, _lineWeight) {
   this.segments = [];
   this.angles = [];  
   this.lenSize = _lenSize || 30;
   this.residueSize = _residueSize || 20;
   this.lineWeight = _lineWeight || 7;
  }
 setAngles(angle) {
   this.angles = angle;
 }
 getAngles() {
   return this.angles;
 }
 createSegments (sketch) {
   this.segments.push(new Segment(sketch.width/2, sketch.height/2, sketch.radians(0),this.lenSize, this.residueSize, sketch));
   let currentSeg = 1;
   let currentAngle = 0;
   for(let angle in this.angles){
     currentAngle -= this.angles[angle];
     let seg = new Segment(this.segments[currentSeg-1].getB().x,this.segments[currentSeg-1].getB().y,sketch.radians(currentAngle), this.lenSize, this.residueSize, sketch);
     this.segments.push(seg);
     currentSeg++;
   }
 }
 draw (sketch) {
   sketch.fill(255,100,10);
   sketch.ellipse(sketch.width/2, sketch.height/2,this.residueSize,this.residueSize);
   for(let segment in this.segments){
     this.segments[segment].show(sketch); 
   }
 }   
}

