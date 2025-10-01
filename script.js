// lấy id quick__wrapper
const wrapper = document.getElementById("quick__wrapper");
// lấy id btn__darkMode
const btnDark = document.getElementById("btn__darkMode");
// lấy id btn__add
const btnAdd = document.getElementById("btn__add");
// lấy id quick__modal
const quickModal = document.getElementById("quick__modal");
// lấy id quick__group__btn__cancel
const btnCancel = document.getElementById("quick__group__btn__cancel");
// lấy id quick__title__btn
const btnClose = document.getElementById("quick__title__btn");
// lấy id quick__form
const quickForm = document.getElementById("quick__form");
// lấy id quick__group__input
const quickTitle = document.getElementById("quick__group__input");
// lấy id quick__group__textarea
const quickTextarea = document.getElementById("quick__group__textarea");
// lấy id user__card__container
const userCardContainer = document.getElementById("user__card__container");
// lấy id emty__state
const emtyState = document.getElementById("emty__state");
// lấy id emty__state__btn
const emtyStateBtn = document.getElementById("emty__state__btn");
// đặt tên biến notes chưa form trong localstogare neu rong thi []
let notesForm = JSON.parse(localStorage.getItem("notesForm")) || [];
// đặt tên biến định danh khi edit null
let isEdit = null;

if (wrapper && btnDark) {
  const KEY = "dark-theme";
  const svg = btnDark.querySelector("svg");
  const ICON_MOON =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path>';
  const ICON_SUN =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"></path>';

  function setIcon(isDark) {
    svg.innerHTML = isDark ? ICON_SUN : ICON_MOON;
  }

  function turnOn() {
    wrapper.classList.add("theme-dark");
    setIcon(true);
    localStorage.setItem(KEY, "dark");
  }

  function turnOff() {
    wrapper.classList.remove("theme-dark");
    setIcon(false);
    localStorage.setItem(KEY, "light");
  }

  btnDark.addEventListener("click", () => {
    wrapper.classList.contains("theme-dark") ? turnOff() : turnOn();
  });

  localStorage.getItem(KEY) === "dark" ? turnOn() : turnOff();
}

// bắt sự kiện submit cho quickForm
quickForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // nếu edit không null thì update user
  if (isEdit !== null) {
    // tìm người dùng theo id
    const note = notesForm.find((item) => item.id === isEdit);
    // update người dùng
    note.title = quickTitle.value;
    note.content = quickTextarea.value;
    // reset id
    isEdit = null;
  } else {
    //lấy giá trị của title
    const titleValue = quickTitle.value;
    // lấy giá trị của content
    const contentValue = quickTextarea.value;
    //tạo object
    const note = {
      id: Date.now(),
      title: titleValue,
      content: contentValue,
    };
    // them object vao mang
    notesForm.push(note);
  }
  // luu mang vao localstogare
  localStorage.setItem("notesForm", JSON.stringify(notesForm));
  // closeModal đóng
  quickModal.close();
  // reset form
  quickForm.reset();
  // render
  renderNotesForm();
});

// tạo function render note
function renderNotesForm() {
  // check noteForm rong
  if (notesForm.length === 0) {
    emtyState.style.display = "block";
  } else {
    emtyState.style.display = "none";
  }
  userCardContainer.innerHTML = "";
  notesForm.forEach((item) => {
    userCardContainer.innerHTML += `
      <div class="user__card">
      <div class ="user__card__content">
        <h3 class="user__card__title">${item.title}</h3>
        <p class="user__card__des">${item.content}</p>
        <div class="user__btn">
          <button class="user__btn__edit" onclick="editNote(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button class="user__btn__delete" onclick="deleteNote(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    `;
  });
}

// Tạo function edit
function editNote(id) {
  const note = notesForm.find((item) => item.id === id);
  isEdit = id;
  quickTitle.value = note.title;
  quickTextarea.value = note.content;
  document.querySelector(".quick__title__text").textContent = "Edit Note";
  quickModal.showModal();
}

// tạo function xóa
function deleteNote(id) {
  notesForm = notesForm.filter((item) => item.id !== id);
  localStorage.setItem("notesForm", JSON.stringify(notesForm));
  renderNotesForm();
}

// bắt sự kiện click btnAdd
btnAdd.addEventListener("click", () => {
  document.querySelector(".quick__title__text").textContent = "Add New Note";
  isEdit = null;
  quickForm.reset();
  quickModal.showModal();
});

// bắt sự kiện click btnCancel
btnCancel.addEventListener("click", function () {
  quickModal.close();
});

// bắt sự kiện click btnClose
btnClose.addEventListener("click", function () {
  quickModal.close();
});

// bắt sự kiện click emtyStateBtn
emtyStateBtn.addEventListener("click", function () {
  document.querySelector(".quick__title__text").textContent = "Add New Note";
  quickModal.showModal();
});

renderNotesForm();

// lắng nghe sự kiện storage (chỉ chạy trên tab KHÁC tab thay đổi)
window.addEventListener("storage", function (e) {
  // kiểm tra đúng key mình quan tâm
  if (e.key === "notesForm") {
    notesForm = JSON.parse(localStorage.getItem("notesForm")) || [];
    // cập nhật dữ liệu hiển thị
    renderNotesForm();
  }

  // đồng bộ darkmode
  if (e.key === "dark-theme") {
    if (e.newValue === "dark") {
      turnOn();
    } else {
      turnOff();
    }
  }
});
