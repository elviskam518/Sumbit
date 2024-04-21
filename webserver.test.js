const request = require('supertest');
const app = require('./webserver');


describe('Test the things service', () => {
    test('GET /search', () => {
        return request(app)
	    .get('/search')
	    .expect(200);
    });

    test('GET /gallery', () => {
      return request(app)
    .get('/gallery')
    .expect(200);
  });

  test('GET /home', () => {
    return request(app)
  .get('/')
  .expect(200);
  });

  test('GET /comment', () => {
    return request(app)
  .get('/comment')
  .expect(200);
  });

  test('GET /404', () => {
    return request(app)
  .get('/c')
  .expect(404);
  });

  test('returns HTML for 404 page', () => {
    return request(app)
      .get('/nonexistent-route')
      .expect('Content-type', /text\/html/)
      .expect(404);
  });

  test('uploads image and redirects to home page', () => {
    // Simulating a POST request with required data
    return request(app)
      .post('/')
      .attach('filename', './image/1712939671992.jpg') // Replace 'path/to/image.jpg' with the actual path to your image file
      .field('category', 'Test category')
      .field('title', 'Test title')
      .field('name', 'Test name')
      .field('phonenumber', '1234567890')
      .expect(302) // Expects redirection
      .expect('Location', '/');
  });

  test('performs a search and returns HTML with search results', () => {
    // Assuming your search endpoint expects a JSON body with a search query
    const requestBody = { q: 'Family- Sample A' };

    return request(app)
      .post('/search')
      .send(requestBody)
      .expect('Content-type', /text\/html/)
  });


  });

  