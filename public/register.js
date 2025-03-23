// Функция для проверки email
function validate_email(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

// Функция для проверки пароля (например, минимум 6 символов)
function validate_password(password) {
  return password.length >= 6;
}

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('regEmail').value;
  const username = document.getElementById('userName').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confrimPassword').value;

  if (!validate_email(email) || !validate_password(password) || password !== confirmPassword) {
    alert('Invalid email, password format, or passwords do not match.');
    return;
  }

  // AJAX запрос для проверки email и имени
  try {
    const response = await fetch('check_user.php', {
      method: 'POST',
      body: new URLSearchParams({
        email: email,
        username: username,
      }),
    });

    const data = await response.text(); // Получаем ответ (успех/ошибка)
    if (data) {
      alert(data); // Если пользователь уже существует
    } else {
      // Если ошибок нет, продолжаем регистрацию
      const response = await fetch('register.php', {
        method: 'POST',
        body: new URLSearchParams({
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      const data = await response.text();
      alert(data); // Показываем ответ (успех/ошибка)
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + error.message);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const showRegistration = document.getElementById("showRegistration");
  const loginForm = document.getElementById("loginForm");
  const registrationForm = document.getElementById("registrationForm");

  if (showRegistration) {
      showRegistration.addEventListener("click", function() {
          loginForm.style.display = "none";
          registrationForm.style.display = "block";
      });
  }

  const backToLogin = document.getElementById("backToLogin");
  if (backToLogin) {
      backToLogin.addEventListener("click", function() {
          registrationForm.style.display = "none";
          loginForm.style.display = "block";
      });
  }
});
