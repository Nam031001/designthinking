document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('#links a');
  const content = document.getElementById('content');
  const audio = document.getElementById('background-audio');

  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const url = this.getAttribute('href');

      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const newContent = doc.querySelector('.section').innerHTML;
          content.innerHTML = newContent;

          // 메인 페이지로 돌아오는 링크 추가
          const backButton = document.createElement('button');
          backButton.textContent = '메인 페이지로 돌아가기';
          backButton.addEventListener('click', function () {
            location.reload(); // 메인 페이지로 돌아가기
          });
          content.appendChild(backButton);
        })
        .catch((error) => console.error('Error loading page:', error));
    });
  });

  if (audio) {
    audio.play();
  }
});
