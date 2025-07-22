(() => {
  const canvas = document.getElementById("animated-gradient-bg");
  const ctx = canvas.getContext("2d");

  let width, height, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resize);
  resize();

  const blobs = [
    {
      x: 0.2,
      y: 0.3,
      color: "#ff7eb3",
      radius: 400,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3,
    },
    {
      x: 0.8,
      y: 0.7,
      color: "#6a93ff",
      radius: 500,
      phase: Math.random() * Math.PI * 2,
      speed: 0.22,
    },
    {
      x: 0.5,
      y: 1.0,
      color: "#c792ea",
      radius: 400,
      phase: Math.random() * Math.PI * 2,
      speed: 0.27,
    },
  ];

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    blobs.forEach((blob, i) => {
      const t = time * 0.001 * blob.speed + blob.phase;

      const offsetX = Math.sin(t * 1.5 + i) * 60;  // 🔁 increase motion range
      const offsetY = Math.cos(t * 1.3 + i) * 60;

      const pulse = 0.06 + 0.05 * Math.sin(t * 2.5); // 🔁 pulse more visibly

      const x = blob.x * width + offsetX;
      const y = blob.y * height + offsetY;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius);
      const alphaHex = Math.floor(pulse * 255).toString(16).padStart(2, "0");

      gradient.addColorStop(0, blob.color + alphaHex); // Color with opacity
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });

    requestAnimationFrame(animate);
  }

  animate(0);
})();