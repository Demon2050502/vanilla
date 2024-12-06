document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll(".main-command-button");

    triggers.forEach(trigger => {
        // Флаг для предотвращения повторного нажатия
        let isAnimating = false;

        trigger.addEventListener("click", () => {
            // Если анимация еще идет, игнорируем нажатие
            if (isAnimating) return;

            const contentId = trigger.getAttribute("aria-controls");
            const content = document.getElementById(contentId);

            const isOpen = trigger.getAttribute("data-state") === "open";

            isAnimating = true;

            if (isOpen) {
                // Закрыть
                trigger.setAttribute("data-state", "closed");
                trigger.setAttribute("aria-expanded", "false");
                content.setAttribute("data-state", "closed");

                // Сбрасываем стили и закрываем
                content.style.transition = "none";
                content.style.height = `${content.scrollHeight}px`;

                requestAnimationFrame(() => {
                    content.style.transition = "height 0.5s ease";
                    content.style.height = "0px";
                });

                // Убираем элемент из потока и снимаем блокировку после завершения анимации
                setTimeout(() => {
                    content.hidden = true;
                    isAnimating = false;
                }, 400);
            } else {
                // Открыть
                trigger.setAttribute("data-state", "open");
                trigger.setAttribute("aria-expanded", "true");
                content.setAttribute("data-state", "open");

                content.hidden = false;
                content.style.transition = "none";
                content.style.height = "0px";

                requestAnimationFrame(() => {
                    content.style.transition = "height 0.5s ease";
                    content.style.height = `${content.scrollHeight}px`;
                });

                setTimeout(() => {
                    content.style.height = "auto";
                    isAnimating = false;
                }, 400);
            }
        });
    });
});