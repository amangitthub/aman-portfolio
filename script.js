        // Active navigation highlighting on scroll
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-menu a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Skills Filter Functionality with underline on skills
        const categoryButtons = document.querySelectorAll('.category-btn');
        const skillItems = document.querySelectorAll('.skill-item');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                // Add/Remove underline on skill items
                skillItems.forEach(item => {
                    if (category === 'all') {
                        item.classList.add('active');
                    } else if (item.getAttribute('data-category') === category) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            });
        });

        // Set all skills as active initially
        skillItems.forEach(item => item.classList.add('active'));
        const galleryItems = document.querySelectorAll('.gallery-item');
        const popup = document.getElementById('imagePopup');
        const popupImage = document.getElementById('popupImage');
        const closeBtn = document.getElementById('closeBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const imageCounter = document.getElementById('imageCounter');
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

        // Open popup on image click
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                openPopup();
            });
        });

        function openPopup() {
            popup.classList.add('active');
            updatePopupImage();
            document.body.style.overflow = 'hidden';
        }

        function closePopup() {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function updatePopupImage() {
            popupImage.src = images[currentIndex];
            imageCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        // Close popup
        closeBtn.addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Navigate images
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updatePopupImage();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updatePopupImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!popup.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closePopup();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updatePopupImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                updatePopupImage();
            }
        });