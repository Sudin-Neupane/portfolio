
// cursor follower 
        const cursor = document.getElementById('custom-cursor');
        document.addEventListener('mousemove', (e) => {
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        });

        const clickables = document.querySelectorAll('a, button, input, textarea, .glass-card, .sk-card, .pr-card');
        clickables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                    cursor.style.backgroundColor = 'rgba(100, 181, 246, 0.8)';
                }
            });
            item.addEventListener('mouseleave', () => {
                if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = 'rgba(255, 107, 107, 0.75)';
                }
            });
        });
     // --- Simulated Pre-Loader screen logic ---
        let loadProgress = 0;
        const loader = document.getElementById('loader');
        const loaderBar = document.getElementById('loader-bar');
        const loaderText = document.getElementById('loader-text');

        const loadInterval = setInterval(() => {
            if (loadProgress >= 100) {
                clearInterval(loadInterval);
                setTimeout(() => {
                    if (loader) {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                            // Activate first viewport triggers
                            triggerScrollRevelations();
                        }, 500);
                    }
                }, 300);
                return;
            }
            loadProgress += 4;
            if (loaderBar) loaderBar.style.width = loadProgress + '%';
            if (loaderText) loaderText.style.textContent = loadProgress + '%';
        }, 40);
        
            // --- Interactive background particle nodes logic ---
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            const particles = [];
            const count = Math.min(65, Math.floor(width / 24));

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() - 0.5) * 0.45,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.25
                });
            }
        let mouse = { x: -1000, y: -1000 };
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });

            function renderNodes() {
                if (!ctx) return;
                ctx.clearRect(0, 0, width, height);
                