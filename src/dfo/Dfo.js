import fitness from './fitness';

export default class Dfo {

  constructor(_nof, _nod, _dt, _noe, protein_chain){
    // rename these variables
    this.num_of_flies = _nof;
    this.num_of_dimensions = _nod;
    this.dt = _dt;
    this.num_of_evaluation = _noe;
    this.population = this.generatePopulation();
    this.proteinChain = this.convertAB(protein_chain);
    this.swarm_best = {fitness: Infinity };
    this.previous_swarm_best = {fitness: Infinity};
    this.neighbour_best = [];
    this.k = 0;
    this.K = 10;
    
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
  
  iterate(){
    // generate this.population;
    
    // flies update 
    // let iteration = 0

    // let bestSolution = { fitness: Infinity }
    // while (iteration < this.num_of_evaluations) {
      // console.log(this.proteinChain);
      // apply fitness function
      this.population.forEach((fly) => {
        fly.fitness = fitness(this.proteinChain, fly.dimensions)
      })
  
      this.previous_swarm_best = this.swarm_best
      for(let i = 0; i < this.num_of_flies; i++){
        if(this.population[i].fitness < this.swarm_best.fitness){
          this.swarm_best = this.population[i]
        }
      }
  
      // fitness_arr.push(this.swarm_best.fitness)
  
      this.neighbour_best = this.population.map((fly, index) => {
        if (index === 0) {
          return [this.population[index], {fitness: Infinity}]
        } else if (index === this.population.length - 1) {
          return [{fitness: Infinity}, this.population[index]]
        } else {
          return [this.population[index - 1], this.population[index + 1]]
        }
      }).map(function (arr) {
        return arr[0].fitness < arr[1].fitness ? arr[0] : arr[1]
      })

      this.population.forEach((fly, index) => {
        if(fly === this.swarm_best) return 
        for(let i = 1; i < this.num_of_dimensions-1; i++) {
          fly.dimensions[i] = this.neighbour_best[index].dimensions[i] + Math.random()  * (this.swarm_best.dimensions[i] - fly.dimensions[i])
          if(Math.random() < this.dt){
            fly.dimensions[i] = this.getRandomArbitrary(-180,180)
          }
          if(fly.dimensions[i] < -180 || fly.dimensions[i] > 180){
            fly.dimensions[i] = this.getRandomArbitrary(-180,180) 
          }
        }
        // console.log(this.neighbour_best[index])
      })
  
      
      if (this.improvement(this.previous_swarm_best, this.swarm_best) > 0.0001) this.k = 0

      if(this.k >= this.K) {
        this.neighbour_best = this.this.population.map((fly) => {
          let flyCopy = Object.assign({}, fly)
          flyCopy.dimensions = this.generateRandomDimensionArray(this.num_of_dimensions)
          return flyCopy
        })
        this.k = 0
      }
      console.log(this.getSwarmBestDimensions(), this.swarm_best.fitness);
      // if(this.swarm_best.fitness < bestSolution.fitness) {
      //   bestSolution = this.swarm_best
      // }
      // fitness_arr.push(bestSolution.fitness)
      // console.log(this.swarm_best.fitness)
      // iteration++
      // k++
    // }
    // return fitness_arr
  }

  getSwarmBestDimensions(){
    return this.swarm_best.dimensions;
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

  generatePopulation () {
    let population_array = [];
    for (let i = 0; i < this.num_of_flies; i++) {
      let fly = {
        dimensions: this.insertZeroAtEnds(this.generateRandomDimensionArray(this.num_of_dimensions))
      }
      population_array.push(fly);
    
    }
    return population_array;
  }

}



// let proteinChain = convertAB("ABBABBABABBAB")
// let proteinAngle = insertZeroAtEnds([-20.3009, 32.7677,-99.1187,
//   8.9153,-25.6173, 23.3967,-111.4206, 95.4252, 6.6239,-54.4829,-103.5475,
//  -17.8249,-20.5841, 25.7852,-111.2621, 99.8364, 60.9015, 22.8205, 35.5087,
//  -112.0200, 94.7888, 6.6231,-53.2306,-103.5627,-18.3558,-22.9026,
//   91.2604,-111.9488, 29.3274,-25.5453, 19.4017, 100.9575])






// fitness_per_iteration.push(this.swarm_best.fitness);  

