document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const title = item.querySelector(".accordion-title");
    const iconUse = item.querySelector("svg use");
    const content = item.nextElementSibling;
    const clickableElements = [title, item.querySelector("svg")];

    content.style.maxHeight = null;

    clickableElements.forEach((el) => {
      el.addEventListener("click", () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

        document.querySelectorAll(".accordion-content").forEach((c) => {
          c.style.maxHeight = null;
        });
        accordionItems.forEach((i) => {
          const useEl = i.querySelector("svg use");
          if (useEl) useEl.setAttribute("href", "./img/sprite.svg#icon-icon-add");
          i.classList.remove("open");
        });

        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + "px";
          if (iconUse) iconUse.setAttribute("href", "./img/sprite.svg#icon-icon-close");
          item.classList.add("open");
        }
      });
    });
  });
});
