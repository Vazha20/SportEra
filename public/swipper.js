const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 }
    }
});

const categoryItems = document.querySelectorAll('.card-item');
categoryItems.forEach(item => {
    item.addEventListener('click', function(e) {
        categoryItems.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
    });
});
