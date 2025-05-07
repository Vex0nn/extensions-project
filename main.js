let main = document.querySelector('main');
let body = document.querySelector('body');
let themeToggle = document.querySelector('.themeToggle');
let btn = document.querySelectorAll('.btn');
let scrollToTop = document.querySelector('.scrollToTop');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(tool => {
      let container = document.createElement('div');
      container.innerHTML = `
      <div class='pic'>
        <img src='${tool.logo}'/>
      </div>
      <div class='data'>
        <h3>${tool.name}</h3>
        <p style='font-size: 14px;' class='pa'>${tool.description}</p>
      </div>
      <button class="removeBtn">Remove</button>
      <label class="switch">
        <input type="checkbox" class='checkboxBtn'>
        <span class="slider round"></span>
      </label>
      `
      container.className = 'container'
      container.setAttribute('data-toggled', false)
      main.appendChild(container)
    });
  })
  .catch(error => console.error('Error loading JSON:', error));

function changeTheme() {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next)
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.removeBtn');
  if (btn) {
    btn.parentElement.remove();
    const container = document.querySelectorAll('.container');
    handleEmptyMessage(container);
  }
});

function handleEmptyMessage(container) {
  const visibleContainers = [...container].filter(cont => !cont.classList.contains('hidden'));
  const message = document.getElementById('emptyMessage');

    if (visibleContainers.length === 0) {
      message.classList.remove('hidden');
    } else {
      message.classList.add('hidden');
    }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.checkboxBtn');
  if (btn) {
    const label = btn.closest('label');
    const container = label.closest('.container');
    if(container) {
      const current = container.getAttribute('data-toggled');
      container.setAttribute('data-toggled', current === 'true' ? 'false' : 'true');
    }
  }
});

function handleToggle(cont, op) {
  cont.getAttribute('data-toggled') === op ? cont.classList.add('hidden') : cont.classList.remove('hidden');
}

btn.forEach((but) => {
  but.addEventListener('click', () => {
    const container = document.querySelectorAll('.container');
    let filter = but.getAttribute('data-filter');
    if(but.classList.contains('toggled')) {
      return
    } else {
      btn.forEach(b => b.classList.remove('toggled'))
      but.classList.add('toggled')
      container.forEach(cont => {
        switch(filter) {
          case 'active':
            handleToggle(cont, 'false');
            break;
          case 'inactive':
            handleToggle(cont, 'true');
            break;
          case 'all':
            cont.classList.remove('hidden')
            break;
        }
      })
      handleEmptyMessage(container)
    }
  })
})

window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme)
}

window.onscroll = () => {
  if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
    scrollToTop.style.display = "flex";
  } else {
    scrollToTop.style.display = "none";
  }
}

function scrollTopFunc() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}