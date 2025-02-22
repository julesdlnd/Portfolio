// Ajoutez ces variables au début de votre JavaScript existant
let scale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("imageModal");
  let modalImg = document.getElementById("modalImg");
  let close = document.querySelector(".close");
  
  // Forcer la modal à être cachée au chargement
  modal.style.display = "none";

  // Gestionnaire de zoom avec la molette de la souris
  modalImg.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    const zoomSpeed = 0.1;
    const rect = modalImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Déterminer la direction du zoom
    if (e.deltaY < 0) {
      // Zoom in
      scale = Math.min(scale + zoomSpeed, 4);
    } else {
      // Zoom out
      scale = Math.max(scale - zoomSpeed, 1);
    }

    // Appliquer le zoom et la translation
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  });

  // Gestionnaire pour le déplacement de l'image
  modalImg.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

  // Réinitialiser le zoom et la position quand on ferme la modal
  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    modalImg.style.transform = `translate(0px, 0px) scale(1)`;
  }

  document.querySelectorAll(".photo-container img").forEach(item => {
    item.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
      resetZoom(); // Réinitialiser le zoom à l'ouverture d'une nouvelle image
    });
  });

  close.addEventListener("click", function () {
    modal.style.display = "none";
    resetZoom();
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      resetZoom();
    }
  });
});