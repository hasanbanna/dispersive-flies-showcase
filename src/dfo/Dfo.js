import fitness from './fitness';

export default class Dfo {

  constructor(_nof, _nod, _dt, _noe, protein_chain){
    // rename these variables
    this.num_of_flies = _nof;
    this.num_of_dimensions = _nod;
    this.dt = _dt;
    this.num_of_evaluation = _noe;
    this.proteinChain = protein_chain;
  }
  generateRandomDimensionArray (num_of_dimensions) {
    const lowerbound = -180;
    const upperbound = 180;
    // returns an array of random values
    let dimension_arr = [];
    for (let i = 0; i < num_of_dimensions; i++) {
      dimension_arr.push(this.getRandomArbitrary(lowerbound, upperbound));
    }
    return dimension_arr;
  }
  
  getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
  }
  
  dfo(){
    // generate population;
    let population = [];
  
    for (let i = 0; i < this.num_of_flies; i++) {
      let fly = {
        dimensions: this.insertZeroAtEnds(this.generateRandomDimensionArray(this.num_of_dimensions))
      }
      population.push(fly);
    }
    // flies update 
    let iteration = 0
    let swarm_best = { fitness: Infinity }
    let previous_swarm_best = {fitness: Infinity}
    let neighbour_best = []
    // let bestSolution = { fitness: Infinity }
  
    let k = 0
    let K = 5
    while (iteration < this.num_of_evaluations) {
  
      // apply fitness function
      population.forEach(function (fly) {
        fly.fitness = fitness(this.proteinChain, fly.dimensions)
      })
  
      previous_swarm_best = swarm_best
      for(let i = 0; i < this.num_of_flies; i++){
        if(population[i].fitness < swarm_best.fitness){
          swarm_best = population[i]
        }
      }
  
      // fitness_arr.push(swarm_best.fitness)
  
      neighbour_best = population.map(function (fly, index) {
        if (index === 0) {
          return [population[index], {fitness: Infinity}]
        } else if (index === population.length - 1) {
          return [{fitness: Infinity}, population[index]]
        } else {
          return [population[index - 1], population[index + 1]]
        }
      }).map(function (arr) {
        return arr[0].fitness < arr[1].fitness ? arr[0] : arr[1]
      })

      population.forEach( (fly, index) => {
        if(fly === swarm_best) return 
        for(let i = 1; i < this.num_of_dimensions-1; i++) {
          fly.dimensions[i] = neighbour_best[index].dimensions[i] + Math.random()  * (swarm_best.dimensions[i] - fly.dimensions[i])
          if(Math.random() < this.dt){
            fly.dimensions[i] = this.getRandomArbitrary(-180,180)
          }
          if(fly.dimensions[i] < -180 || fly.dimensions[i] > 180){
            fly.dimensions[i] = this.getRandomArbitrary(-180,180) 
          }
        }
      })
  
      
      if (this.improvement(previous_swarm_best, swarm_best) > 0.0001) k = 0

      if(k >= K) {
        neighbour_best = population.map((fly) => {
          let flyCopy = Object.assign({}, fly)
          flyCopy.dimensions = this.generateRandomDimensionArray(this.num_of_dimensions)
          return flyCopy
        })
        k = 0
      }
      // if(swarm_best.fitness < bestSolution.fitness) {
      //   bestSolution = swarm_best
      // }
      // fitness_arr.push(bestSolution.fitness)
      // console.log(swarm_best.fitness)
      iteration++
      k++
    }
    // return fitness_arr
  }

  convertAB (ab_string) {
    let residue = []
    for(let i = 0; i < ab_string.length; i++){
      if(ab_string.charAt(i) === 'A'){
        residue.push(1)
      }else{
        residue.push(-1)
      }
    }
    return residue
  }
  
  insertZeroAtEnds(proteinAngle) {
    proteinAngle.push(0)
    proteinAngle.unshift(0)
    return proteinAngle
  }
  
  improvement (previousGlobalBest, currentGlobalBest) {
    return (previousGlobalBest.fitness - currentGlobalBest.fitness) / previousGlobalBest.fitness
  }

}



// let proteinChain = convertAB("ABBABBABABBAB")
// let proteinAngle = insertZeroAtEnds([-20.3009, 32.7677,-99.1187,
//   8.9153,-25.6173, 23.3967,-111.4206, 95.4252, 6.6239,-54.4829,-103.5475,
//  -17.8249,-20.5841, 25.7852,-111.2621, 99.8364, 60.9015, 22.8205, 35.5087,
//  -112.0200, 94.7888, 6.6231,-53.2306,-103.5627,-18.3558,-22.9026,
//   91.2604,-111.9488, 29.3274,-25.5453, 19.4017, 100.9575])






// fitness_per_iteration.push(swarm_best.fitness);  

