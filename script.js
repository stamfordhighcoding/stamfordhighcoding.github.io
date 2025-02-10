document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");
  
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
            data.projects.forEach(project => {
                const link = document.createElement("a");
                link.href = project.href;
                const img = document.createElement("img");//768x432, webp
                img.src = project.img.src;
                img.alt = project.img.alt;
                link.appendChild(img);
                projectsContainer.appendChild(link);
        });
      })
      .catch(error => console.error("Error loading JSON:", error));
  });

let isNavOpen = false; 
function openNav() {
    const nav = document.querySelector("nav"); 
    if (!isNavOpen) {
        nav.style.left = "calc(100% - 260px)";
        nav.style.transition = "left 0.3s ease"; 
    } else {
        nav.style.left = "100%";
        nav.style.transition = "left 0.3s ease";
    }
    isNavOpen = !isNavOpen; 
}

function copyCode(button) {
    const codeBlock = button.nextElementSibling.querySelector("code");
    const codeText = codeBlock.innerText.trim(); // Get the code inside <code>
    navigator.clipboard.writeText(codeText).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = "Copy Code";
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

function copyID(elementID) {
    const element = document.getElementById(elementID);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const adjustedPosition = elementPosition - offset;

        window.scrollTo({
            top: adjustedPosition,
            behavior: 'smooth' 
        });

        const link = `${window.location.origin}${window.location.pathname}#${elementID}`;

        navigator.clipboard.writeText(link).then(() => {
            console.log(`Copied to clipboard: ${link}`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        console.error('Element not found with ID:', elementID);
    }
}
