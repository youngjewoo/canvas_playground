function component() {
  const element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerText = 'Hello canvas world';
  element.style.textAlign = 'center'
  element.style.fontSize = '20pt'
  return element;
}

// 시간마다 불릴 옵저버 리스트
const observerList = [];

// Init canvas
const canvasContainer = document.createElement('div');
canvasContainer.style.textAlign = 'center';
const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 503;
canvas.style.display = 'inline';

// Init chart frame
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(0,canvas.height);
ctx.lineTo(canvas.width, canvas.height);
ctx.stroke();

const dotSize = 3;

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
}, 500);

// Init data buffer
const buffer = Array.from({length: 30},() => new Array());

// Update buffer
const updateBuffer = (data) => {
  buffer.shift();
  buffer.push(data);
}

// Update chart func
const updateChart = (data) => {
  // Clear without border
  ctx.clearRect(1,0,canvas.width, canvas.height-1);
  
  for(let i=0;i<buffer.length;++i){
    const x = i * (canvas.width / 30);
    for(let j=0;j<buffer[i].length;++j){
      const y = canvas.height-3 - (buffer[i][j] * ((canvas.height-3)/1000));
      ctx.fillStyle = 'green';
      ctx.fillRect(x,y,dotSize,dotSize);
    }
  }
}

const tooltip = document.createElement('div');
tooltip.style = `width: 50px; text-align: center; background-color: gray; color: white; display: none; z-index: 1`;

// Canvas event handler
canvas.onmouseenter = () => {
  const idx = observerList.indexOf(updateChart);
  observerList.splice(idx, 1);
}
canvas.onmouseleave = () => {
  observerList.push(updateChart);
}
canvas.onmousemove = (e) => {
  const x = e.clientX - canvas.offsetLeft; 
  const y = e.clientY - canvas.offsetTop;
  const imgData = ctx.getImageData(x,y,1,1).data;
  const g = imgData[1];
  const a = imgData[3];
  if(g === 128 && a === 255) {
    const value = (canvas.height-3 - y) * (1000/(canvas.height-3));
    tooltip.textContent = value < 0 ? 0 : value;
    tooltip.style.display = 'block';
  } else {
    tooltip.style.display = 'none';
  }
}

observerList.push(updateChart);
observerList.push(updateBuffer);

const timeDiv = document.createElement('div');
timeDiv.textContent = 'time';
timeDiv.style.marginLeft = `${canvas.offsetLeft + canvas.width+10}px`;
const valueHeaderSpan = document.createElement('span');
const valueSpan = document.createElement('span');

valueHeaderSpan.style.verticalAlign = 'top';
valueSpan.textContent = 'value';
valueSpan.style.marginRight = '8px';
valueSpan.style.marginBottom = `${canvas.height}px`;
valueHeaderSpan.appendChild(valueSpan);
canvasContainer.appendChild(valueHeaderSpan);
canvasContainer.appendChild(canvas);
canvasContainer.appendChild(timeDiv);

document.body.appendChild(component());
document.body.appendChild(canvasContainer);
canvasContainer.appendChild(tooltip);
// document.body.appendChild(timeDiv);

