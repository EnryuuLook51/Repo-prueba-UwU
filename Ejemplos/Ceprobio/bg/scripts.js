const canvas = document.getElementById('animation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#ff6f61', '#6f9cff', '#00ffa3', '#ffd700'];

class Particle {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.glowSize = Math.random() * 20 + 10; // Random glow size
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glowSize;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow blur after drawing
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Reverse direction on boundary collision
        if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;
    }
}

function initParticles(count) {
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocityX = (Math.random() - 0.5) * 2;
        const velocityY = (Math.random() - 0.5) * 2;

        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animate);
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Create gradient for the line
                const gradient = ctx.createLinearGradient(
                    particlesArray[i].x,
                    particlesArray[i].y,
                    particlesArray[j].x,
                    particlesArray[j].y
                );
                gradient.addColorStop(0, particlesArray[i].color);
                gradient.addColorStop(1, particlesArray[j].color);

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray.length = 0;
    initParticles(100);
});

initParticles(100);
animate();