(() => {
  const canvas = document.getElementById('background-particles');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  window.addEventListener('resize', resize);
  resize();

  // Particle class
  class Particle {
    constructor() {
      this.reset();
      this.hue = Math.floor(Math.random() * 360);
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 1 + Math.random() * 1.5;
      this.speedX = (Math.random() - 0.5) * 0.1;
      this.speedY = (Math.random() - 0.5) * 0.1;
      this.alpha = 0.1 + Math.random() * 0.15;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 70%, 75%)`;
      ctx.fill();
    }
  }

  const particlesCount = 60;
  const particles = Array.from({ length: particlesCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  animate();
})();