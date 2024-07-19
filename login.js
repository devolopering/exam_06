document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loginContainer = document.getElementById('login-container');

  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'index.html';
    return;
  }
  
  document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Oddiy validatsiya
    if (email === '' || password === '') {
      errorMessage.textContent = 'Username va parol talab qilinadi';
      return;
    }

    loader.style.display = 'flex';
    loginContainer.style.display = 'none';

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token); 
        window.location.href = 'index.html';
      } else {
        errorMessage.textContent = 'Notog\'ri email yoki parol';
        loader.style.display = 'none';
        loginContainer.style.display = 'block';
      }
    } catch (error) {
      errorMessage.textContent = 'Xatolik yuz berdi. Iltimos, keyinroq yana urinib ko\'ring.';
      loader.style.display = 'none';
      loginContainer.style.display = 'block';
    }
  });
});
