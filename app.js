document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    const stage = document.getElementById('stage');
    const navContainer = document.getElementById('progress-nav');
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const body = document.body;

    let currentSceneIndex = 0;
    let isLocked = false;
    const SCROLL_COOLDOWN = 1000;
    const totalScenes = scenes.length;

    // --- 0. Motion / Mouse Tracking (rAF) ---
    let mouseX = 0, mouseY = 0;
    let rafPending = false;

    function updateCursorGlow() {
        root.style.setProperty('--mx', `${mouseX}px`);
        root.style.setProperty('--my', `${mouseY}px`);
        rafPending = false;
    }

    if (window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!rafPending) {
                rafPending = true;
                requestAnimationFrame(updateCursorGlow);
            }
        }, { passive: true });
    }

    // --- 1. Progress UI ---
    scenes.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        dot.setAttribute('data-target', idx);
        dot.title = `Ir a sección ${idx + 1}`;
        dot.addEventListener('click', () => jumpToScene(idx));
        navContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // --- 2. Theme Toggle ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- 3. Scene Engine ---

    function updateScene(direction = 0) {
        // Remove active class from all
        scenes.forEach(s => {
            s.classList.remove('active');
            s.classList.remove('prev');
            s.classList.remove('just-entered'); // Ensure cleanup
        });

        const targetScene = scenes[currentSceneIndex];

        // Add classes
        targetScene.classList.add('active');

        // Add "Just Entered" kick
        // We defer slightly to ensure display:none -> block transition works if any
        // but here we use opacity/visibility so it's fine.
        requestAnimationFrame(() => {
            targetScene.classList.add('just-entered');
        });

        // Remove just-entered after animation settles to save resources
        setTimeout(() => {
            targetScene.classList.remove('just-entered');
        }, 800);

        // Ambient Intensity Logic (Hero & Contact are strong)
        if (currentSceneIndex === 0 || currentSceneIndex === totalScenes - 1) {
            body.classList.add('scene-strong');
        } else {
            body.classList.remove('scene-strong');
        }

        // Typing effect trigger for Hero
        if (currentSceneIndex === 0) {
            // JS Typewriter is self-managing once started
        }

        // Update Dots
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === currentSceneIndex);
        });
    }

    // --- TYPEWRITER LOGIC ---
    function initTypewriter() {
        const typeEl = document.getElementById('hero-typewriter');
        if (!typeEl) return;

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.classList.add('no-cursor');
            return; // Leave text as is (static)
        }

        const text = typeEl.textContent.trim();
        typeEl.textContent = ''; // Clear for typing start

        // Loop State
        let isDeleting = false;
        let charIndex = 0;

        // Settings
        const typeSpeed = 50;
        const deleteSpeed = 30;
        const pauseEnd = 2000;
        const pauseStart = 800;

        function loop() {
            // Safety check if element removed
            if (!document.body.contains(typeEl)) return;

            const currentString = text.substring(0, charIndex);
            typeEl.textContent = currentString;

            let delta = typeSpeed;

            if (isDeleting) {
                delta = deleteSpeed;
                charIndex--;
            } else {
                charIndex++;
            }

            // Logic
            if (!isDeleting && charIndex === text.length + 1) {
                // Done typing
                isDeleting = true;
                delta = pauseEnd;
                charIndex--; // correct index
            } else if (isDeleting && charIndex === 0) {
                // Done deleting
                isDeleting = false;
                delta = pauseStart;
            }

            setTimeout(loop, delta);
        }

        // Start loop with small delay
        setTimeout(loop, 500);
    }

    // Start Typewriter
    initTypewriter();



    function jumpToScene(index) {
        if (index < 0 || index >= totalScenes) return;
        currentSceneIndex = index;
        updateScene();
    }

    function nextScene() {
        if (currentSceneIndex < totalScenes - 1) {
            currentSceneIndex++;
            updateScene(1);
            lockScroll();
        }
    }

    function prevScene() {
        if (currentSceneIndex > 0) {
            currentSceneIndex--;
            updateScene(-1);
            lockScroll();
        }
    }

    function lockScroll() {
        isLocked = true;
        setTimeout(() => isLocked = false, SCROLL_COOLDOWN);
    }

    // --- 4. Inputs ---

    // Wheel
    window.addEventListener('wheel', (e) => {
        if (isLocked) return;
        if (Math.abs(e.deltaY) < 20) return; // Threshold

        if (e.deltaY > 0) {
            nextScene();
        } else {
            prevScene();
        }
    }, { passive: true });

    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.code)) {
            e.preventDefault();
        }

        if (isLocked) return;

        switch (e.code) {
            case 'ArrowDown':
            case 'PageDown':
                nextScene();
                break;
            case 'ArrowUp':
            case 'PageUp':
                prevScene();
                break;
            case 'Home':
                jumpToScene(0);
                break;
            case 'End':
                jumpToScene(totalScenes - 1);
                break;
            case 'Space':
                nextScene();
                break;
        }
    });

    // Touch Swipe
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isLocked) return;

        const touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextScene();
            } else {
                prevScene();
            }
        }
    }, { passive: true });

    // Internal Interactions
    const btnExp = document.getElementById('btn-start-exp');
    if (btnExp) btnExp.addEventListener('click', () => jumpToScene(1));

    // Copy buttons
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.getAttribute('data-copy');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = "¡Copiado!";
                    setTimeout(() => btn.textContent = originalText, 2000);
                });
            } else {
                alert('Portapapeles no disponible: ' + text);
            }
        });
    });

    // Init state
    updateScene();

    // Simple Body Fade In
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});
