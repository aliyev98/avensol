(function () {
    function sanitizeToDigits(value) {
        return value.replace(/\D+/g, "");
    }

    function handleInput(e) {
        const el = e.target;
        if (!el.classList.contains("js-numeric-only")) return;
        const cleaned = sanitizeToDigits(el.value);
        if (el.value !== cleaned) {
            const pos = el.selectionStart;
            el.value = cleaned;
            if (typeof pos === "number") el.setSelectionRange(pos - 1, pos - 1);
        }
    }

    function handleKeyDown(e) {
        const el = e.target;
        if (!el.classList.contains("js-numeric-only")) return;

        const allowedControl = [
            "Backspace",
            "Delete",
            "Tab",
            "Enter",
            "Escape",
            "ArrowLeft",
            "ArrowRight",
            "Home",
            "End",
        ];

        const meta = e.ctrlKey || e.metaKey;
        if (meta) return;

        if (allowedControl.includes(e.key)) return;

        const isDigit = /^[0-9]$/.test(e.key);
        if (!isDigit) {
            e.preventDefault();
        }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("input", handleInput, true);

    document.addEventListener("DOMContentLoaded", () => {
        document
            .querySelectorAll(".js-numeric-only")
            .forEach((el) => (el.value = sanitizeToDigits(el.value || "")));
    });
})();
