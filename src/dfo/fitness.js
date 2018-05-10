// function toDegrees (angle) {
//   return angle * (180 / Math.PI);
// }
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function distance (i, j, proteinAngles) {
 let cos_sum = 0
 
 for(let k = i + 1; k <= j - 1; k++){
   let angle_l = 0
   for(let l = i + 1; l <= k; l++){
    angle_l += toRadians(proteinAngles[l])
   }
   cos_sum += Math.cos(angle_l)
 }  

 let sin_sum = 0
 for(let k = i + 1; k <= j-1; k++){
   let angle_l = 0
   for(let l = i + 1; l <= k; l++){
    angle_l += toRadians(proteinAngles[l])
   }
   sin_sum += Math.sin(angle_l)
 }
 
 
 //  console.log(`distance ${Math.sqrt(cos_sum + sin_sum)}`)
 return Math.sqrt((Math.pow(1 + cos_sum, 2)) + Math.pow(sin_sum, 2))
}

function trigonometricPotential (angle) {
  return (1 - Math.cos(toRadians(angle))) / 4
}

function lennardJonesPotential (distance, c_i, c_j) {
  // console.log(`coeffcients is ${coefficients(c_i,c_j)}`)
  // console.log(`distance: ${distance}`)
  // console.log(Math.pow(distance, -12))
  // console.log(Math.pow(distance, -12) - (coefficients(c_i,c_j) * Math.pow(distance, -6)))
  return (Math.pow(distance, -12) - (coefficients(c_i,c_j) * Math.pow(distance, -6)))
}

function coefficients(i, j) {
  // console.log(`i: ${i}, j: ${j}, ${(1 + (i + j) + (5 * i * j)) * 0.125}`)
  return (1 + (i + j) + (5 * i * j)) * 0.125
}

export default function fitness (proteinChain, proteinAngle) {
  let n = proteinChain.length

  let total_sum = 0
  for(let i = 1; i <= n; i++){
    let sum1 = 0
    for(let j = i + 2; j <= n; j++){
        sum1 += lennardJonesPotential(distance(i - 1,j - 1, proteinAngle), proteinChain[i-1], proteinChain[j-1])
    }
    total_sum += sum1
  }

  let sum2 = 0
  for(let i = 0; i < n; i++){
    sum2 += (trigonometricPotential(proteinAngle[i]))
  }
  return sum2 + (4 * total_sum)
}
