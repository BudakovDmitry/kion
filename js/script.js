new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    autoHeight: true,

    // And if we need scrollbar
    // scrollbar: {
    //     el: ".swiper-scrollbar",
    // },
});

// document.addEventListener("DOMContentLoaded", function () {
let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.visibility = "hidden";
        } else {
            panel.style.maxHeight = "200px";
            panel.style.visibility = "visible";
        }
    });
}

const form = document.getElementById("form");
form.addEventListener("submit", formSend);

async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
        form.classList.add("_sending");
        let response = await fetch("../sendmail.php", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove("_sending");
        } else {
            form.classList.remove("_sending");
            alert(result.message);
        }
    } else {
        alert("Заповніть обов'язкові поля");
    }
}

function formValidate(form) {
    let error = 0;

    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.value === "") {
            formAddError(input);
            error++;
        }
    }
    return error;
}

function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
}

function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
}

// Popup

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popup = document.getElementById("popup");
            popupOpen(popup);
        });
    }
}

const popupCloseIcon = document.querySelectorAll(".popup__close");
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener("click", function (e) {
            popupClose(el.closest(".popup"));
            e.preventDefault();
        });
    }
}

function popupOpen(popup) {
    if (popup && unlock) {
        const popupActive = document.querySelector(".popup.open");
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        popup.classList.add("open");
        popup.addEventListener("click", function (e) {
            if (!e.target.closest(".popup-content")) {
                popupClose(e.target.closest("popup"));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove("open");
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
// });
