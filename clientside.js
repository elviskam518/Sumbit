document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault()
      const url = this.getAttribute('href')
      window.location.href = url
    })
  })
})

// eslint-disable-next-line no-unused-vars
function getRandomImage () {
  window.location.reload()
}

document.getElementById('searchButton').addEventListener('click', function () {
  const searchTerm = document.getElementById('searchInput').value
  window.location.href = '/gallery?search=' + searchTerm
})

// eslint-disable-next-line no-unused-vars
function changeBackgroundColor () {
  const color = document.getElementById('colorPicker').value
  document.body.style.backgroundColor = color
}
