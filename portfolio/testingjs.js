
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