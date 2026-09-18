// ---------------------------------
// Gallery Images
// ---------------------------------

const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image5.jpg",
    "images/image6.jpg",
    "images/image7.jpg",
    "images/image8.jpg"
];


// Current image index

let currentImage = 0;


// ---------------------------------
// Open Lightbox
// ---------------------------------

function openLightbox(index) {

    currentImage = index;

    const lightbox = document.getElementById("lightbox");

    lightbox.classList.add("active");

    showImage();

}


// ---------------------------------
// Close Lightbox
// ---------------------------------

function closeLightbox() {

    const lightbox = document.getElementById("lightbox");

    lightbox.classList.remove("active");

}


// ---------------------------------
// Display Image
// ---------------------------------

function showImage() {

    const image =
        document.getElementById("lightbox-image");

    const counter =
        document.getElementById("image-counter");


    image.src = images[currentImage];

    counter.textContent =
        `${currentImage + 1} / ${images.length}`;

}


// ---------------------------------
// Next / Previous
// ---------------------------------

function changeImage(direction) {

    currentImage += direction;


    // If we reach the last image

    if (currentImage >= images.length) {

        currentImage = 0;

    }


    // If we go before first image

    if (currentImage < 0) {

        currentImage = images.length - 1;

    }


    showImage();

}


// ---------------------------------
// Keyboard Navigation
// ---------------------------------

document.addEventListener("keydown", function(event) {

    const lightbox =
        document.getElementById("lightbox");


    if (!lightbox.classList.contains("active")) {

        return;

    }


    if (event.key === "ArrowRight") {

        changeImage(1);

    }


    if (event.key === "ArrowLeft") {

        changeImage(-1);

    }


    if (event.key === "Escape") {

        closeLightbox();

    }

});


// ---------------------------------
// Close when clicking background
// ---------------------------------

document
    .getElementById("lightbox")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeLightbox();

        }

    });
    // ---------------------------------
// Image Category Filters
// ---------------------------------

function filterImages(category) {

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    // Show or hide images
    galleryItems.forEach(function(item) {

        const itemCategory =
            item.getAttribute("data-category");


        if (category === "all" ||
            itemCategory === category) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });


    // Update active button
    filterButtons.forEach(function(button) {

        button.classList.remove("active");

    });


    // Find the clicked button
    filterButtons.forEach(function(button) {

        if (
            button.getAttribute("onclick") ===
            `filterImages('${category}')`
        ) {

            button.classList.add("active");

        }

    });

}