
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
