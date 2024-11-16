let contacts = [];
let editIndex = null;
function addOrUpdateContact() {
    const nameInput = document.getElementById("name");
    const telInput = document.getElementById("tel");
    const emailInput = document.getElementById("email");

    const name = nameInput.value.trim();
    const tel = telInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !tel || !email) {
        alert('Вы не заполнили все поля !');
        return;
    }
    switch (true) {
        // 1. Проверка на заполненность всех полей
        case !name || !tel || !email:
            alert('Вы не заполнили все поля!');
            return;
    
        // 2. Проверка на формат номера телефона
        case tel.length !== 9 || isNaN(tel):
            telInput.style.backgroundColor = 'rgba(228, 72, 72, 0.422)';
            telInput.style.border = '2px solid red';
            telInput.setAttribute('placeholder', 'Введите номер в формате 11 цифр');
            telInput.value = '';
            return;
    
        // 3. Проверка на формат email
        case !(email.includes('@') && email.includes('.')):
            emailInput.style.backgroundColor = 'rgba(228, 72, 72, 0.422)';
            emailInput.style.border = '2px solid red';
            emailInput.setAttribute('placeholder', 'Введите почту в правильном формате');
            emailInput.value = '';
            return;
    
        // 4. Проверка на редактирование или добавление нового контакта
        case editIndex !== null:
            contacts[editIndex] = { name, tel, email }; // Редактируем существующий контакт
            editIndex = null;
            alert('Контакт отредактирован');
            break;
    
        // 5. Добавление нового контакта
        default:
            contacts.push({ name, tel, email }); // Добавляем новый контакт
            break;
    }

    nameInput.value = '';
    telInput.value = '';
    emailInput.value = '';
    renderContacts()
}


function renderContacts(filter = '') {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredContacts.forEach((contact, index) => {
        const contactItem = document.createElement('li');
        contactItem.className = 'contact-item';

        contactItem.innerHTML = `
            <input type="text" value="${contact.name}" readonly>
            <input type="text" value="${contact.tel}" readonly>
            <input type="text" value="${contact.email}" readonly>
            <button onclick="editContact(${index})" class="edit-btn">Редактировать</button>
            <button onclick="deleteContact(${index})" class="delete-btn">Удалить</button>
        `;

        contactList.appendChild(contactItem);
    });

}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('tel').value = contact.tel;
    document.getElementById('email').value = contact.email;
    editIndex = index;
}

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}

function searchBar() {
    let searchInput = document.getElementById('search');
    searchInput.oninput = function () {
        let value = this.value.trim().toLowerCase();
        let list = document.querySelectorAll('li');
        if (value !== '') {
            list.forEach(elem => {
                if (elem.innerText.toLowerCase().search(value) === -1) {
                    elem.classList.add('hide');
                } else {
                    elem.classList.remove('hide');
                }
            });
        } else {
            list.forEach(elem => {
                elem.classList.remove('hide');
            });
        }

        console.log(this.value);
    };
}

