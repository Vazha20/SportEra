// მოძებნეთ ელემენტები
const loginBtn = document.getElementById('loginBtn');
const authPopup = document.getElementById('authPopup');
const closeBtn = document.getElementById('closeBtn');

// დააჭირეთ შესვლის ღილაკს და დააჩვენეთ ფანჯარა
loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // თავიდან აიცილეთ ლინკის მოქმედება
    authPopup.style.display = 'block'; // ფანჯარას ხსნის
});

// დახურეთ ფანჯარა, როდესაც დააჭირეთ '×'
closeBtn.addEventListener('click', function() {
    authPopup.style.display = 'none'; // ფანჯარას დახურავს
});

// დახურეთ ფანჯარა, თუ დააჭირეთ გარეთ
window.addEventListener('click', function(event) {
    if (event.target === authPopup) {
        authPopup.style.display = 'none'; // ფანჯარას დახურავს
    }
});
