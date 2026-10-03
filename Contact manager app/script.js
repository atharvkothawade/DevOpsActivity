// ==============================
// CONTACT DATA
// ==============================

let contacts = [];

// ==============================
// DOM ELEMENTS
// ==============================

const list = document.querySelector(".Contact_list");
const form = document.querySelector(".js-form");

const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("myEmail");
const phoneInput = document.getElementById("myTel");
const imageInput = document.getElementById("imgurl");

// ==============================
// LOCAL STORAGE
// ==============================

function saveContacts() {
localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
try {
const savedContacts = localStorage.getItem("contacts");

contacts = savedContacts
  ? JSON.parse(savedContacts)
  : [];

// Make sure stored data is actually an array
if (!Array.isArray(contacts)) {
  contacts = [];
}


} catch (error) {
console.error("Unable to load contacts:", error);
contacts = [];
}
}

// ==============================
// RENDER CONTACTS
// ==============================

function renderContacts() {
list.innerHTML = "";

if (contacts.length === 0) {
list.innerHTML = <p class="empty-message"> No contacts found. </p> ;

return;


}

const fragment = document.createDocumentFragment();

contacts.forEach((contact) => {
const node = createContactElement(contact);
fragment.appendChild(node);
});

list.appendChild(fragment);
}

// ==============================
// CREATE CONTACT ELEMENT
// ==============================

function createContactElement(contact) {
const node = document.createElement("article");

node.className = "person";
node.dataset.key = contact.id;

node.innerHTML = `
<img src="${escapeHTML(contact.imageurl)}" alt="${escapeHTML(contact.name)}" >

<div class="contactdetail">

  <h1>
    <i class="fas fa-user-circle contactIcon"></i>
    ${escapeHTML(contact.name)}
  </h1>

  <p>
    <i class="fas fa-envelope contactIcon"></i>
    ${escapeHTML(contact.email)}
  </p>

  <p>
    <i class="fas fa-phone-alt contactIcon"></i>
    ${escapeHTML(contact.contactnumber)}
  </p>

</div>

<button
  type="button"
  class="delete-contact js-delete-contact"
  aria-label="Delete ${escapeHTML(contact.name)}"
>
  <svg
    fill="var(--deleteIconColor)"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
</button>


`;

return node;
}

// ==============================
// ADD CONTACT
// ==============================

function addContact() {

const contact = {
id: Date.now(),

name: nameInput.value.trim(),

email: emailInput.value.trim(),

imageurl: imageInput.value.trim(),

contactnumber: phoneInput.value.trim()


};

contacts.push(contact);

saveContacts();

renderContacts();

form.reset();
}

// ==============================
// DELETE CONTACT
// ==============================

function deleteContact(id) {

const contactId = Number(id);

contacts = contacts.filter(
(contact) => contact.id !== contactId
);

saveContacts();

renderContacts();
}

// ==============================
// FORM SUBMIT
// ==============================

form.addEventListener("submit", (event) => {

event.preventDefault();

addContact();

});

// ==============================
// DELETE EVENT
// ==============================

list.addEventListener("click", (event) => {

const deleteButton = event.target.closest(
".js-delete-contact"
);

if (!deleteButton) return;

const contact = deleteButton.closest(".person");

if (!contact) return;

const contactId = contact.dataset.key;

deleteContact(contactId);

});

// ==============================
// ESCAPE HTML
// ==============================

function escapeHTML(value) {

const div = document.createElement("div");

div.textContent = value;

return div.innerHTML;
}

// ==============================
// INITIALIZE APP
// ==============================

function init() {

loadContacts();

renderContacts();

}

init();