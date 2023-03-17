const generateButton = document.getElementById('generateButton')

generateButton.addEventListener('click', function () {
  fetch('/code') //1
    .then(response => response.json()) //2
    .then(result => {
      console.log(result) //3
    })
})
