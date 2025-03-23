document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById('newsContent');
    contentDiv.innerHTML = '';  // შეასრულე რეფრეშირება სანამ ჩატვირთავ ახალ მონაცემებს
    const timestamp = new Date().getTime();
    fetch('news.php?nocache=' + timestamp)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
        })
        .catch(error => {
            contentDiv.innerHTML = "<p>დაფიქსირდა შეცდომა სტატიების დატვირთვისას.</p>";
        });
});