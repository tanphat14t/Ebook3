const header = document.querySelector('#header');
const headerHeight = header.offsetHeight;
const originalPadding = getComputedStyle(header).padding;

gsap.set(header, { y: 0 });

window.addEventListener('scroll', () => {
    if (window.scrollY >= 90) {
        gsap.to(header, { y: 0, duration: 0.5, ease: 'power2.out' });
        header.style.position = 'sticky';
        header.style.top = '0px';
        header.style.padding = '0px 20px';
        header.style.opacity = '0.97';
    } else {
        gsap.to(header, { y: 0, duration: 0.5, ease: 'power2.out' });
        header.style.position = 'static';
        header.style.top = `-${headerHeight}px`;
        header.style.padding = originalPadding;
    }
});

// scroll to section 
const links = document.querySelectorAll('.menu a');

// Lặp qua các thẻ a trong menu và thêm sự kiện click vào mỗi thẻ
links.forEach((link, index) => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // Xóa class active khỏi tất cả các thẻ a trong menu
        links.forEach(link => link.classList.remove('active'));

        // Thêm class active vào thẻ a được click
        link.classList.add('active');

        // Lấy id của section cần scroll đến từ href của thẻ a được click
        const sectionId = link.getAttribute('href');

        // Lấy chiều cao của header
        const headerHeight = header.offsetHeight;

        // Tính toán vị trí muốn scroll đến
        const sectionTop = document.querySelector(sectionId).getBoundingClientRect().top + window.scrollY - headerHeight + 60;

        if (index === 0) {
            // nếu thẻ a đang được click là thẻ đầu tiên trong menu thì scroll lên đầu trang
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll đến vị trí muốn đến
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    });
});

// Xử lý sự kiện scroll để cập nhật class active cho thẻ a trong menu
window.addEventListener('scroll', () => {
    const headerHeight = header.offsetHeight;
    const currentPos = window.scrollY;

    // Lặp qua các section trong trang
    document.querySelectorAll('section').forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.menu a[href="#${id}"]`);

        // Nếu vị trí scroll đang nằm trong section và chưa có class active cho thẻ a của section đó
        if (currentPos >= top - headerHeight && currentPos < top + section.offsetHeight - headerHeight && !link.classList.contains('active')) {
            // Xóa class active khỏi tất cả các thẻ a trong menu
            links.forEach(link => link.classList.remove('active'));

            // Thêm class active vào thẻ a của section đó
            link.classList.add('active');
        }
    });
});

// back to top 

const backButton = document.querySelector('.icon-back-to-top');

backButton.addEventListener('click', function(e){
    // do something
    window.scrollTo(0, 0);

});