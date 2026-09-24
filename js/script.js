// ========================================
// CAKE GALLERY LIGHTBOX
// ========================================

function openLightbox(image) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeLightbox(event) {
    const lightbox = document.getElementById("lightbox");

    if (
        !event ||
        event.target === lightbox ||
        event.target.classList.contains("lightbox-close")
    ) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }
}