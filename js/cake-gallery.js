// ========================================
// TASTY CAKERY - DYNAMIC CAKE GALLERY
// ========================================

import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const cakeGallery =
    document.getElementById("firebase-cake-gallery");

const category =
    cakeGallery.dataset.category;


async function loadCakes() {

    try {

        const cakesQuery = query(
            collection(db, "cakes"),
            where("category", "==", category)
        );

        const snapshot = await getDocs(cakesQuery);


        snapshot.forEach(function (cakeDocument) {

            const cake = cakeDocument.data();

            const galleryItem =
                document.createElement("div");

            galleryItem.classList.add("gallery-item");


            galleryItem.innerHTML = `
                <img
                    src="${cake.imageUrl}"
                    alt="${cake.name}"
                    onclick="openLightbox(this)"
                >
            `;


            cakeGallery.appendChild(galleryItem);

        });


    } catch (error) {

        console.error(
            "Error loading cakes:",
            error
        );

    }

}


loadCakes();