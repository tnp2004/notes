const addNoteBtn = document.querySelector('.addnote-box');
const popup = document.querySelector('.popup');
const bg = document.querySelector('.bg');
const closeBtn = document.querySelector('.closeBtn');
const closeBtnE = document.querySelector('.closeBtnEdit');
const title = document.querySelector('.title-input');
const message = document.querySelector('.msg-input');
const messageE = document.querySelector('.msg-inputE');
const addBtn = document.querySelector('.addNoteBtn');
const container = document.querySelector('.container');
const charCount = document.querySelector('.char');
const charCountE = document.querySelector('.charE');
const alert = document.querySelectorAll('.warning');
const hidden = document.querySelectorAll('.hidden-menu');
const dotMenu = document.querySelector('.menu');
const edit = document.querySelector('.edit');
const saveEdit = document.querySelector('.save');

const addNote = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateTime = new Date();
    if (!!title.value && !!message.value) {
        const boxNote = document.createElement('div')
        boxNote.classList.add('note')
        const titleNote = document.createElement('h2')
        titleNote.classList.add('title')
        titleNote.innerHTML = title.value
        const messageNote = document.createElement('p')
        messageNote.classList.add('message')
        messageNote.innerHTML = message.value

        const hiddenOpt = document.createElement('div');
        hiddenOpt.classList.add('hidden-menu')
        const deleteOp = document.createElement('div')
        const iconDelete = '<img class="icon" draggable="false" src="./image/trash.png">'
        deleteOp.setAttribute('onclick', '{deleteNote(this)}')
        deleteOp.innerHTML = `${iconDelete} delete`
        const editOp = document.createElement('div')
        const iconEdit = '<img class="icon" draggable="false" src="./image/edit.png">'
        editOp.setAttribute('onclick', '{editNote(this)}')
        editOp.innerHTML = `${iconEdit} edit`
        
        const data = document.createElement('div')
        data.classList.add('bottom')
        const date = document.createElement('div')
        const iconDate = '<img draggable="false" class="icon" src="./image/calendar.png">'
        date.innerHTML = `${iconDate}${dateTime.getDate()} ${months[dateTime.getMonth()]} ${dateTime.getFullYear()}`
        date.classList.add('date')
        const menu = document.createElement('img')
        menu.classList.add('menu')
        menu.setAttribute('onclick', '{menuClick(this)}')
        menu.setAttribute('draggable', 'false')
        menu.src = "./image/menu-dots.png"
        menu.alt = "menu"

        hiddenOpt.append(deleteOp, editOp)
        data.append(date, menu, hiddenOpt)
        boxNote.append(titleNote, messageNote, data)
        container.prepend(boxNote)

        // clear popup
        closePopup();

        // clear value
        title.value = ''
        message.value = ''
        charCount.innerHTML = '0/190'
        alert[0].style.display = 'none'
    }else {
        alert[0].style.display = 'block'
    }
}

const showPopup = () => {
    popup.style.display = 'block'
    bg.style.display = 'block'
}

const closePopup = () => {
    popup.style.display = 'none'
    edit.style.display = 'none'
    bg.style.display = 'none'
    alert[0].style.display = 'none'
    alert[1].style.display = 'none'
}

const saveEditNote = (event) => {
    if (!!edit.children[3].value && !!edit.children[6].value) {
        e.parentNode.parentNode.previousSibling.previousSibling.innerHTML = edit.children[3].value;
        e.parentNode.parentNode.previousSibling.innerHTML = edit.children[6].value;

        edit.style.display = 'none';
        bg.style.display = 'none';
        edit.children[3].value = ''
        edit.children[6].value = ''
    }else {
        alert[1].style.display = 'block';
    }
}

addBtn.addEventListener('click', addNote)
closeBtn.addEventListener('click', closePopup)
closeBtnE.addEventListener('click', closePopup)
bg.addEventListener('click', closePopup)
addNoteBtn.addEventListener('click', showPopup)
saveEdit.addEventListener('click', saveEditNote)

const menuClick = (event) => {
    if (event.nextElementSibling.style.display != 'block') {
        return event.nextElementSibling.style.display = 'block';
    }
    event.nextElementSibling.style.display = 'none';
}

const deleteNote = (event) => {
    event.parentNode.parentNode.parentNode.remove()
}

let e;
const editNote = (event) => {
    event.parentNode.style.display = 'none'
    e = event;
    
    // title edit
    edit.children[3].value = event.parentNode.parentNode.previousSibling.previousSibling.innerHTML
    // message edit
    edit.children[6].value = event.parentNode.parentNode.previousSibling.innerHTML

    edit.style.display = 'block';
    bg.style.display = 'block'
    charCountE.innerHTML = ''
}

// Char count
message.addEventListener("input", event => {
    const target = event.currentTarget;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;
    charCount.innerHTML = `${currentLength}/190`
});

messageE.addEventListener("input", event => {
    const target = event.currentTarget;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;
    charCountE.innerHTML = `${currentLength}/190`
});


document.addEventListener('keyup', (keyValue) => {
    if (keyValue.key == 'Enter') {
        saveEditNote();
        addNote();
    }
})