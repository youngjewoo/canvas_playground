function component() {
  const element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello canvas world';

  return element;
}

// 시간마다 불릴 옵저버 리스트
const observerList = [];

// Init chart frame
const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 250;
canvas.id = 'test_canvas';
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(0,250);
ctx.lineTo(300,250);
ctx.stroke();

// Random number generator
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

// Random data generator
const getRandomData = () => {
  const data = [];
  const cnt = getRandomInt(0, 5);
  for(let i=0;i<cnt;++i){
    data.push(getRandomInt(0, 1000));
  }
  return data;
}

// Emiiter!
setInterval(()=>{
  const data = getRandomData();
  observerList.forEach(obr => obr(data));
}, 1000);

// Init data buffer
const buffer = Array.from({length: 30},() => new Array());

// Update chart func
const updateChart = (data) => {
  buffer.shift();
  buffer.push(data);

  // Clear without border
  ctx.clearRect(1,0,canvas.width, canvas.height-1);
  
  for(let i=0;i<buffer.length;++i){
    const x = i * 10;
    buffer[i].length !== 0 ? console.log(buffer[i]) : false;
    for(let j=0;j<buffer[i].length;++j){
      const y = buffer[i][j] * 0.4;
      ctx.fillStyle = 'green';
      ctx.fillRect(x,y,2,2);
    }
  }
}
observerList.push(updateChart);

document.body.appendChild(component());
document.body.appendChild(canvas);
