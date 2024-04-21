const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
module.exports = app

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Image')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })
app.set('views', path.join(__dirname))
app.set('view engine', 'ejs')

app.use('/Image', express.static(path.join(__dirname, 'Image')))

app.get('/gallery', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err)
      res.render('gallery', { image: null })
      return
    }
    try {
      const images = JSON.parse(data)
      const randomIndex = Math.floor(Math.random() * images.length)
      const randomImage = images[randomIndex]
      res.render('gallery', { image: randomImage })
    } catch (parseError) {
      console.log('Error parsing JSON:', parseError)
      res.render('gallery', { image: null })
    }
  })
})

app.get('/search', (req, res) => {
  const searchQuery = req.query.q

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err)
      res.render('gallery', { image: null })
      return
    }
    try {
      const images = JSON.parse(data)
      const foundImage = images.find((image) => image.title === searchQuery)
      if (foundImage) {
        res.render('search', { image: foundImage })
      } else {
        res.render('search', { image: null, notFound: true })
      }
    } catch (parseError) {
      console.log('Error parsing JSON:', parseError)
      res.render('search', { image: null })
    }
  })
})
app.get('/meet', (req, res) => {
  const searchQuery = req.query.n

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err)
      res.render('meet', { image: null })
      return
    }
    try {
      const images = JSON.parse(data)
      const Sameimage = images.filter((image) => image.category === searchQuery)
      if (Sameimage.length === 0) {
        res.render('meet', { image: null })
        return
      }
      const randomIndex = Math.floor(Math.random() * Sameimage.length)
      const randomImage = Sameimage[randomIndex]
      res.render('meet', { image: randomImage })
    } catch (parseError) {
      console.log('Error parsing JSON:', parseError)
      res.render('meet', { image: null })
    }
  })
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/gallery', (req, res) => {
  res.render('gallery')
})

app.get('/search', (req, res) => {
  res.render('search')
})

app.get('/comment', (req, res) => {
  res.render('comment')
})

app.get('/meet', (req, res) => {
  res.render('meet')
})

app.post('/', upload.single('filename'), (req, res) => {
  const category = req.body.category
  const imageUrl = req.file.filename
  const title = req.body.title
  const name = req.body.name
  const phonenumber = req.body.phonenumber

  const imagemetaData = {
    title,
    category,
    imageUrl,
    name,
    phonenumber
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    let images = []
    if (!err) {
      images = JSON.parse(data)
    }
    images.push(imagemetaData)
    fs.writeFile('data.json', JSON.stringify(images), (err) => {
      if (err) {
        console.log('Error writing file:', err)
        return
      }
      console.log('Data saved successfully')
      res.redirect('/')
    })
  })
})

app.use(express.static(path.join(__dirname)))

app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(8090, () => {
  console.log('Server is listening on port 8090')
})
