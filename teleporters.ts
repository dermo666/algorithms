/**
 * Teleporters exercise test
 */

const teleporters1 = ['3,1', '4,2', '5,10'];
const teleporters2 = ['5,10', '6,22', '39,40', '40,49', '47,29'];
const teleporters3 = ['6,18', '36,26', '41,21', '49,55', '54,52',
                      '71,58', '74,77', '78,76', '80,73', '92,85'];
const teleporters4 = ['97,93', '99,81', '36,33', '92,59', '17,3',
                      '82,75', '4,1', '84,79', '54,4', '88,53',
                      '91,37', '60,57', '61,7', '62,51', '31,19'];
const teleporters5 = ['3,8', '8,9', '9,3'];

function destinations(teleporters, die, start, end) {
  const result = {};
  
  const teleportMap = {};
  
  for (let i = 0; i < teleporters.length; i++) {
    const [key, value] = teleporters[i].split(',');
    teleportMap[key] = parseInt(value);
  }
  
  for (let i = 1; i <= die; i++) {
    let field = i + start;
    
    if (!(field > end)) {
      if (teleportMap[field]) {
        field = teleportMap[field];
      }
      
      result[field] = true;
    }
  }
  
  return Object.keys(result);
}

console.log(destinations(teleporters1,  6,   0,    20));
console.log(destinations(teleporters2,  6,  46,   100));
console.log(destinations(teleporters2, 10,  0, 50));
console.log(destinations(teleporters3, 10,  95,   100));

console.log(destinations(teleporters3, 10,  70,   100));

console.log(destinations(teleporters4,  6,   0,   100));
console.log(destinations(teleporters5,  6,   0,    20));