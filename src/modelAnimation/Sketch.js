import Animation from './Animation';
import Dfo from '../dfo/Dfo';

export default function sketch (sketch) {
  let animation = new Animation();
  let dfo = new Dfo();
  console.log(dfo)
  const angles = [-29.4339, 111.0289, -26.9311,
    20.8178, -10.7849, -95.0706, 111.3693, -25.7034, 20.7508, 17.5707, 103.5723,
    54.6928, -6.8404, -95.3601, 111.3307, -25.0472, 19.8815, -12.8529,-73.1896]
  sketch.setup = function (){
    // console.log(animation);
    sketch.createCanvas(800, 600);
    animation.setAngles(angles);
    animation.createSegments(sketch);
  };
  sketch.draw = function () {
    sketch.background("#EBF4FA");
    animation.draw(sketch);
  }
  sketch.setAngles = function (angles) {
    animation.setAngles(angles);
  }
}