const form = document.querySelector('form');
const allInputs = document.querySelectorAll('form input'); // [dom1, dom2, dom3. dom4 , dom5]
const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'password'];

form.addEventListener('submit', ev => {
  ev.preventDefault();

  const userData = {};

  for (let i = 0; i < allInputs.length; i++) {
    userData[requiredFields[i]] = allInputs[i].value;
  }

  fetch('/users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(data => {
    const paragraph = document.createElement('P');
    paragraph.innerText = data.message;
    document.body.appendChild(paragraph);
  })
  .catch(err => console.log(err))
})
