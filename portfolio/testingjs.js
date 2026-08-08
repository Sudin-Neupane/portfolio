
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

                   // Highlight radial glow around mouse coordinate
                if (mouse.x > -1000) {
                    const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
                    grad.addColorStop(0, 'rgba(255, 107, 107, 0.04)');
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, width, height);
                }

                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                
                particles.forEach((p, index) => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                    ctx.fill();
                           // Connect lines of proximal elements
                    for (let j = index + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.lineWidth = (100 - dist) / 100 * 0.45;
                            ctx.strokeStyle = `rgba(100, 181, 246, ${((100 - dist) / 100) * 0.08})`;
                            ctx.stroke();
                        }
                    }
                });

                requestAnimationFrame(renderNodes);
            }
            renderNodes();
        }
                //  Hamburger menu dropdown logic ---
        const hamBtn = document.getElementById('hamburger-btn');
        const mobileDropdown = document.getElementById('mobile-dropdown');
        if (hamBtn && mobileDropdown) {
            hamBtn.addEventListener('click', () => {
                mobileDropdown.classList.toggle('hidden');
            });
        }

        const mobBtns = document.querySelectorAll('.mob-btn');
        mobBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (mobileDropdown) mobileDropdown.classList.add('hidden');
            });
        });

       // --- Filter systems: Skills ---
        const skBtns = document.querySelectorAll('.sk-filter-btn');
        const skCards = document.querySelectorAll('.sk-card');

        skBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                skBtns.forEach(b => {
                    b.className = "sk-filter-btn px-4.5 py-2 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all duration-300 bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:border-white/10";
                });
                btn.className = "sk-filter-btn px-4.5 py-2 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all duration-300 bg-brand-blue border-brand-blue text-black font-bold shadow-[0_0_20px_rgba(100,181,246,0.3)]";
                
                const filter = btn.getAttribute('data-filter');
                skCards.forEach(card => {
                    const cat = card.getAttribute('data-cat');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // --- Filter systems: Projects ---
        const prBtns = document.querySelectorAll('.pr-filter-btn');
        const prCards = document.querySelectorAll('.pr-card');

        prBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                prBtns.forEach(b => {
                    b.className = "pr-filter-btn px-4.5 py-2 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all duration-300 bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:border-white/10";
                });
                btn.className = "pr-filter-btn px-4.5 py-2 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all duration-300 bg-brand-green border-brand-green text-black font-bold shadow-[0_0_20px_rgba(129,199,132,0.3)]";
                
                const filter = btn.getAttribute('data-filter');
                prCards.forEach(card => {
                    const cat = card.getAttribute('data-cat');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        
        // --- Interactive Contact Message Form logic ---
        const messageBox = document.getElementById('form-message');
        const charCounter = document.getElementById('char-counter');
        if (messageBox && charCounter) {
            messageBox.addEventListener('input', () => {
                const count = messageBox.value.length;
                charCounter.textContent = `${count} characters`;
                if (count > 450) {
                    charCounter.style.color = '#ff6b6b';
                } else {
                    charCounter.style.color = '#64b5f6';
                }
            });
        }

        const contactForm = document.getElementById('contact-form');
        const formFeedback = document.getElementById('form-feedback');

        if (contactForm && formFeedback) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('form-name').value.trim();
                const email = document.getElementById('form-email').value.trim();
                const message = messageBox.value.trim();

                if (!name || !email || !message) {
                    formFeedback.className = "text-xs py-2 px-3 rounded-lg text-center font-mono bg-brand-coral/10 text-brand-coral border border-brand-coral/30";
                    formFeedback.textContent = "Please populate all layout fields.";
                    formFeedback.classList.remove('hidden');
                    return;
                }

                const subject = encodeURIComponent(`Inquiry from ${name} // Portfolio`);
                const body = encodeURIComponent(`Greetings Sudin,\n\nI visited your boilerlab-styled portfolio and would love to connect.\n\nSender Name: ${name}\nSender Email: ${email}\n\nMessage Details:\n${message}\n\nBest regards,\n${name}`);
                git