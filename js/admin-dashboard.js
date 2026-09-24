// ========================================
// TASTY CAKERY ADMIN DASHBOARD
// ========================================

import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const logoutButton = document.getElementById("logout-button");


// ========================================
// PROTECT ADMIN DASHBOARD
// ========================================

onAuthStateChanged(auth, function (user) {

    if (!user) {
        // No logged-in Firebase user
        window.location.href = "login.html";
    }

});


// ========================================
// LOG OUT
// ========================================

logoutButton.addEventListener("click", async function () {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error("Logout error:", error);

    }

});
// ========================================
// UPLOAD CAKE PHOTO TO CLOUDINARY
// ========================================

const cakeUploadForm = document.getElementById("cake-upload-form");
const cakeNameInput = document.getElementById("cake-name");
const cakeCategoryInput = document.getElementById("cake-category");
const cakeImageInput = document.getElementById("cake-image");
const uploadMessage = document.getElementById("upload-message");


cakeUploadForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const cakeName = cakeNameInput.value.trim();
    const category = cakeCategoryInput.value;
    const imageFile = cakeImageInput.files[0];


    if (!cakeName || !category || !imageFile) {

        uploadMessage.textContent =
            "Please complete all fields and choose a photo.";

        return;
    }


    uploadMessage.textContent = "Uploading cake photo...";


    try {

        const formData = new FormData();

        formData.append("file", imageFile);

        formData.append(
            "upload_preset",
            "tasty_cakery_uploads"
        );


        const response = await fetch(
            "https://api.cloudinary.com/v1_1/a5psnpjh/image/upload",
            {
                method: "POST",
                body: formData
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.error?.message || "Cloudinary upload failed."
            );
        }


        // Save cake information to Firestore
await addDoc(collection(db, "cakes"), {

    name: cakeName,
    category: category,
    imageUrl: data.secure_url,
    cloudinaryPublicId: data.public_id,
    createdAt: serverTimestamp()

});


   uploadMessage.textContent =
    "Cake published successfully!";

cakeUploadForm.reset();

// Refresh the cake list immediately
await loadCakes();

    } catch (error) {

        console.error("Upload error:", error);

        uploadMessage.textContent =
            "Photo upload failed. Please try again.";
    }

});


// ========================================
// LOAD CAKES IN ADMIN DASHBOARD
// ========================================

const adminCakeList = document.getElementById("admin-cake-list");


async function loadCakes() {

    try {

        const cakesQuery = query(
            collection(db, "cakes"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(cakesQuery);


        if (snapshot.empty) {

            adminCakeList.innerHTML = `
                <p class="admin-empty-message">
                    No cakes have been published yet.
                </p>
            `;

            return;
        }


        adminCakeList.innerHTML = "";


        snapshot.forEach(function (cakeDocument) {

            const cake = cakeDocument.data();

            const cakeCard = document.createElement("div");

            cakeCard.classList.add("admin-cake-card");


            cakeCard.innerHTML = `
                <img
                    src="${cake.imageUrl}"
                    alt="${cake.name}"
                >

                <div class="admin-cake-info">

                    <p class="admin-cake-category">
                        ${cake.category}
                    </p>

                    <h3>${cake.name}</h3>

                    <button
                        type="button"
                        class="admin-delete-button"
                    >
                        Delete
                    </button>

                </div>
            `;


            const deleteButton =
                cakeCard.querySelector(".admin-delete-button");


            deleteButton.addEventListener("click", async function () {

                const confirmed = confirm(
                    `Delete "${cake.name}" from the website?`
                );

                if (!confirmed) {
                    return;
                }


                try {

                    await deleteDoc(
                        doc(db, "cakes", cakeDocument.id)
                    );

                    await loadCakes();

                } catch (error) {

                    console.error("Delete error:", error);

                    alert("The cake could not be deleted.");
                }

            });


            adminCakeList.appendChild(cakeCard);

        });


    } catch (error) {

        console.error("Error loading cakes:", error);

        adminCakeList.innerHTML = `
            <p class="admin-empty-message">
                Cakes could not be loaded.
            </p>
        `;
    }

}


// Load cakes when dashboard opens
loadCakes();