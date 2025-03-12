// Custom cursor effects
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        
        this.cursorTrail = document.createElement('div');
        this.cursorTrail.className = 'cursor-trail';
        
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorTrail);
        document.body.appendChild(this.cursorDot);
        
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.1;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Update cursor trail position immediately
            this.cursorTrail.style.left = e.clientX + 'px';
            this.cursorTrail.style.top = e.clientY + 'px';
            
            // Update cursor dot with slight delay
            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
        });
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .career-card, .benefit-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.enterInteractive());
            el.addEventListener('mouseleave', () => this.leaveInteractive());
        });
        
        this.animate();
    }
    
    enterInteractive() {
        this.cursor.classList.add('cursor-interactive');
        this.cursorTrail.classList.add('trail-interactive');
    }
    
    leaveInteractive() {
        this.cursor.classList.remove('cursor-interactive');
        this.cursorTrail.classList.remove('trail-interactive');
    }
    
    animate() {
        // Smooth cursor following
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
        
        this.cursor.style.left = this.pos.x + 'px';
        this.cursor.style.top = this.pos.y + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// Magnetic effect for buttons
class MagneticButton {
    constructor(el) {
        this.el = el;
        this.bound = this.el.getBoundingClientRect();
        this.magneticPull = 0.3;
        
        this.mouse = {
            x: 0,
            y: 0
        };
        
        this.init();
    }
    
    init() {
        this.el.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.el.addEventListener('mouseleave', () => this.handleMouseLeave());
    }
    
    handleMouseMove(e) {
        this.bound = this.el.getBoundingClientRect();
        
        const x = (e.clientX - this.bound.left) - this.bound.width / 2;
        const y = (e.clientY - this.bound.top) - this.bound.height / 2;
        
        this.mouse.x = x * this.magneticPull;
        this.mouse.y = y * this.magneticPull;
        
        this.el.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    }
    
    handleMouseLeave() {
        this.el.style.transform = 'translate(0px, 0px)';
    }
}

// Particle effect
class ParticleEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 203, 5, 0.3)';
            this.ctx.fill();
            
            // Connect particles near mouse
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
                this.ctx.lineTo(particle.x, particle.y);
                this.ctx.strokeStyle = `rgba(255, 203, 5, ${0.2 * (1 - distance / 100)})`;
                this.ctx.stroke();
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom cursor
    const cursor = new CustomCursor();
    
    // Initialize magnetic effect for buttons
    const buttons = document.querySelectorAll('.apply-butn, .filter-btn');
    buttons.forEach(button => new MagneticButton(button));
    
    // Initialize particle effect
    const particles = new ParticleEffect();
});
