const popupForm = document.querySelector(".div__popup-form");
const sectionForm = document.querySelector(".section-form");

//тут указываем на какой секунде нужна форма
const timing = 1102;

let video = document.querySelector("video");

if (video) {
  console.log("video найден при загрузке:", video);
  setupVideoEvents(video);
} else {
  const observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(function (node) {
          // Проверяем, является ли добавленный элемент тегом VIDEO
          if (node.tagName === "VIDEO") {
            console.log("video было добавлено:", node);
            video = node;
            setupVideoEvents(video);
          }
        });
      }
    });
  });

  // Указываем, что наблюдать за добавлением элементов на всей странице (включая поддеревья)
  observer.observe(document.body, { childList: true, subtree: true });
}

function setupVideoEvents(video) {
  let flagFormTimeUpdate = false;

  video.addEventListener("ended", function () {
    sectionForm.classList.remove("none");
    popupForm.classList.remove("none");
    const btnClose = document.querySelector(".popup-form__btn-close");
    btnClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      popupForm.classList.add("none");
    });
    popupForm.addEventListener("click", function (e) {
      if (e.target.classList.contains("div__popup-form")) {
        popupForm.classList.add("none");
      }
    });
  });

  video.addEventListener("timeupdate", function () {
    const timeVideo = Math.floor(video.currentTime);
    if (timeVideo > timing && flagFormTimeUpdate === false) {
      // popupForm.classList.remove("none");
      // const btnClose = document.querySelector(".popup-form__btn-close");
      // btnClose.addEventListener("click", function (e) {
      //   e.preventDefault();
      //   e.stopPropagation();

      //   popupForm.classList.add("none");
      // });
      // popupForm.addEventListener("click", function (e) {
      //   if (e.target.classList.contains("div__popup-form")) {
      //     popupForm.classList.add("none");
      //   }
      // });

      flagFormTimeUpdate = true;

      const sectionForm = document.querySelector(".section-form");
      sectionForm.classList.remove("none");

      //Запускаем таймер
      const timerElements = document.querySelectorAll(".my-timer-now");
      timerElements.forEach((element) => {
        createTimer(element);
      });
    }
  });
}

//Функция для комментов
const coments = Array.from(document.querySelectorAll(".coment"));
const placeComent = document.querySelector(".place-coment");

function showComent() {
  coments.forEach((elem) => {
    elem.style.display = "none";
  });

  placeComent.style.flexDirection = "column-reverse";

  let timeShow = 3000;
  coments.forEach((elem) => {
    setTimeout(() => {
      elem.style.display = "flex";
      elem.classList.add("animate-show");
      setTimeout(() => {
        elem.classList.remove("animate-show");
      }, 300);
    }, timeShow);
    timeShow = timeShow + 3000;
  });
}

showComent();
//----------------------------------------------------------------------------------------------------------------------------

//Таймер
// function createTimer(element) {
//   const startTime = Date.now();
//   const endTime = startTime + 60 * 60 * 1000;
//   function updateTimer() {
//     const remainingTime = endTime - Date.now();
//     const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
//     const seconds = Math.floor((remainingTime / 1000) % 60);
//     const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//     element.textContent = formattedTime;
//     if (remainingTime <= 0) {
//       clearInterval(timerInterval);
//       element.textContent = "00:00";
//     }
//   }
//   const timerInterval = setInterval(updateTimer, 1000);
//   updateTimer();
// }
//----------------------------------------------------------------------------------------------------------------------------

//Дата
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

const currentDate = new Date();
const elements = document.querySelectorAll(".date-now");
elements.forEach((element) => {
  element.textContent = formatDate(currentDate);
});
//----------------------------------------------------------------------------------------------------------------------------

//Скролл
// document.addEventListener("DOMContentLoaded", function () {
//   const myHref = "form-wrapper";
//   const lastForm = document.querySelector(`#${myHref}`);
//   const allLinks = document.querySelectorAll("a");
//   const elemsForScroll = document.querySelectorAll(".my-scroll");
//   const stylesForBehavior = `<style>html { scroll-behavior: smooth; }</style>`;
//   document.body.insertAdjacentHTML("beforeend", stylesForBehavior);
//   [...allLinks, ...elemsForScroll]?.forEach((link) => {
//     if (link.tagName === "A" || link.hasAttribute("href")) {
//       link.href = `#${myHref}`;
//     }
//     if (link.tagName !== "A") {
//       link.style.cursor = "pointer";
//     }
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
//       const targetPosition =
//         lastForm.getBoundingClientRect().top + window.scrollY;
//       const windowHeight = window.innerHeight;
//       const targetHeight = lastForm.offsetHeight;
//       const scrollToPosition =
//         targetPosition - windowHeight + targetHeight + 60;
//       window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
//     });
//   });
// });
//----------------------------------------------------------------------------------------------------------------------------

//Валидация
// document.addEventListener("DOMContentLoaded", function () {
//   const ssElements = document.querySelectorAll(".ss");
//   const ppElements = document.querySelectorAll(".pp");
//   /* Устанавливаем мин и макс длину номер, в рамках этого диапозона кнопка будет рабочей */
//   const minLengthNumber = 7;
//   const maxlengthNumber = 15;
//   /* код страны */
//   const countryCode = "+39";
//   /* Валидация инпутов */
//   ssElements.forEach((el) => {
//     el.addEventListener("input", () => {
//       el.value = el.value.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s.]/g, "");
//     });
//   });
//   ppElements.forEach((element) => {
//     let isCodeAdded = false;
//     let isFisrtInput = true;
//     element.addEventListener("input", () => {
//       let firstSymbol;
//       if (isFisrtInput) {
//         firstSymbol = element.value.replace(/[^0-9\.]/g, "");
//       }
//       element.value = "+" + element.value.replace(/[^0-9\.]/g, "");
//       if (!isCodeAdded && element.value.length >= 1) {
//         if (isFisrtInput) {
//           element.value = countryCode + firstSymbol;
//           isFisrtInput = false;
//         } else {
//           element.value = countryCode;
//         }
//         isCodeAdded = true; /* указываем длинну кода тсраны, надо чтобы было меньше длины кода, считая + */
//       } else if (element.value.length < countryCode.length) {
//         element.value = "";
//         isCodeAdded = false;
//         isFisrtInput = true;
//       }
//     });
//   });
//   /* Обрабатываем кнопки */ const submitButtons = document.querySelectorAll(
//     'button[type="submit"]'
//   );
//   submitButtons.forEach((btn) => {
//     btn.style.opacity = "0.5";
//   });
//   submitButtons.forEach((button, index) => {
//     const phoneInput = ppElements[index];
//     button.disabled = true;
//     phoneInput.addEventListener("input", () => {
//       if (
//         phoneInput.value.length >= minLengthNumber &&
//         phoneInput.value.length <= maxlengthNumber
//       ) {
//         button.disabled = false;
//         button.style.opacity = "1";
//       } else {
//         button.disabled = true;
//         button.style.opacity = "0.5";
//       }
//     });
//   });
// });
