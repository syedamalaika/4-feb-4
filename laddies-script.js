document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe Product Cards and Content Sections
    const scrollElements = document.querySelectorAll('.product-card, .content-section');
    scrollElements.forEach(el => observer.observe(el));


    // --- Modal Logic ---
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.close-modal');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    // Elements inside modal to update
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');

    // Form Logic Elements
    const productView = document.getElementById('product-details-view');
    const formView = document.getElementById('order-form-view');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const backToDetailsBtn = document.getElementById('back-to-details');

    // Function to open modal
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.id === 'back-to-details') return;

            // Get data from the product card
            const card = e.target.closest('.product-card');
            if (!card) return;

            const imgSrc = card.querySelector('.product-image').src;
            const title = card.querySelector('.product-title').innerText;
            const price = card.querySelector('.product-price').innerText;
            const desc = card.getAttribute('data-desc') || "Experience the elegance of this premium Pakistani dress, crafted with the finest fabrics and intricate embroidery tailored for special occasions.";

            if (modalImg) modalImg.src = imgSrc;
            if (modalTitle) modalTitle.innerText = title;
            if (modalPrice) modalPrice.innerText = price;
            if (modalDesc) modalDesc.innerText = desc;

            if (productView) productView.style.display = 'block';
            if (formView) formView.style.display = 'none';

            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            if (productView) productView.style.display = 'block';
            if (formView) formView.style.display = 'none';
        }, 300);
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            productView.style.display = 'none';
            formView.style.display = 'block';
        });
    }

    if (backToDetailsBtn) {
        backToDetailsBtn.addEventListener('click', () => {
            formView.style.display = 'none';
            productView.style.display = 'block';
        });
    }

});
