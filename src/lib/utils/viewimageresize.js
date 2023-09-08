
export function viewimageresize(selector = "img") {
    const images = document.querySelectorAll(selector);

    function image_resize() {
        images.forEach(image => {
            const width = image.offsetWidth;
            
            if (!image.dataset.width) {
                image.dataset.width = image.offsetWidth;
            }

            if (image.dataset.width > width) {
                image.style.width = "100%";
            } else {
                image.style.width = image.dataset.width + "px";
            }
        });
    }

    window.addEventListener("load", image_resize);
    window.addEventListener("resize", image_resize);
}

export function viewimageresize2(selector = "img") {
    const images = document.querySelectorAll(selector);

    function image_resize() {
        const width = images[0].offsetParent.offsetWidth;

        images.forEach(image => {
            image.style.width = "";
            image.style.height = "";

            if (!image.dataset.width) {
                image.dataset.width = image.offsetWidth;
            }

            if (image.dataset.width > width) {
                image.style.width = "100%";
            }
        });
    }

    window.addEventListener("resize", image_resize);
    image_resize();
}
