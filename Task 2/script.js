
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(navLink => navLink.classList.remove('active')); 
            link.classList.add('active'); 

            navbar.classList.remove('active');
        });
    });

    const updateActiveLinkOnScroll = () => {
        let scrollY = window.scrollY;

        sections.forEach(sec => {
            let offsetTop = sec.offsetTop - 150;
            let offsetHeight = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    let activeLink = document.querySelector(`.navbar a[href*=${id}]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
            }
        });


        let header = document.querySelector('header');
        header.classList.toggle('sticky', scrollY > 100);

        navbar.classList.remove('active');
    };

    window.onload = () => {
        window.scrollTo(0, 0);
    };
    
    ScrollReveal({ 
        distance: '80px',
        duration: 2000,
        delay: 200,
    });
    
    ScrollReveal().reveal('.home-content, .header,.services h1 , .contact-details', { origin: 'top'});
    ScrollReveal().reveal('.photo, .service-container , .skill-rating', { origin: 'bottom'});
    ScrollReveal().reveal(' .photo , .project h1 , .photo2', { origin: 'left'});
    ScrollReveal().reveal('.home-contact p, .about-me, .social-media, .project-container , .skills-container , .skills h1', { origin: 'right'});
    
    window.addEventListener('scroll', updateActiveLinkOnScroll);

    const typed = new Typed('.toggle-text', {
        strings: ['Developer','Designer'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true,
    });



