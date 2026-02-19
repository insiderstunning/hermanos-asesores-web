document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-on-scroll');
        revealObserver.observe(section);
    });

    // Count up animation for metrics
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                let startTime = null;

                const animateCount = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    entry.target.innerText = Math.floor(progress * target);
                    if (progress < 1) {
                        requestAnimationFrame(animateCount);
                    } else {
                        entry.target.innerText = target + (entry.target.innerText.includes('%') ? '%' : '');
                    }
                };

                requestAnimationFrame(animateCount);
                countObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.metric-number').forEach(num => countObserver.observe(num));

    // Smooth reveal CSS addition
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Mobile Menu Toggle (simplified)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            // Logic for a real mobile menu could go here
            alert('Menú móvil activado');
        });
    }

    // Form Submission to Webhook
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                mensaje: document.getElementById('mensaje').value,
                sentAt: new Date().toISOString()
            };

            try {
                const response = await fetch('https://insider-stunning.app.n8n.cloud/webhook/98dd343d-dd2c-46a3-9d80-4eb6e4c1950a', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('¡Gracias! Hemos recibido su consulta. Un asesor le contactará pronto.');
                    contactForm.reset();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});
