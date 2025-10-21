const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(50, canvas.height / 2);
  const colors = ['#ff9ce2','#ffd1dc','#ffb6c1','#ffa6c9','#ff7b91'];
  const particles = [];
  for(let i=0;i<30;i++){
    const angle = Math.random() * 2 * Math.PI;
    const speed = random(2,6);
    const color = colors[Math.floor(Math.random()*colors.length)];
    particles.push({x,y,angle,speed,color,alpha:1});
  }
  fireworks.push(...particles);
}

function animate() {
  ctx.fillStyle = 'rgba(255, 240, 245, 0.2)'; // 薄ピンクで残像
  ctx.fillRect(0,0,canvas.width,canvas.height);

  fireworks.forEach((p,i)=>{
    p.x += Math.cos(p.angle)*p.speed;
    p.y += Math.sin(p.angle)*p.speed;
    p.alpha -= 0.02;
    if(p.alpha <= 0) fireworks.splice(i,1);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x,p.y,3,0,2*Math.PI);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

// 花火を1秒ごとに作る
setInterval(createFirework, 1000);
animate();
