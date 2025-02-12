document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");
    const projectIdeasContainer = document.getElementById("projectIdeas");
  
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
            if (projectsContainer) {
                // Populate main projects (only on index.html)
                data.projects.forEach(project => {
                    const link = document.createElement("a");
                    link.href = project.href;
                    const img = document.createElement("img"); // 768x432, webp. ratio:16:9
                    img.src = project.img.src;
                    img.alt = project.img.alt;
                    link.appendChild(img);
                    projectsContainer.appendChild(link);
                });
            }
            
            if (projectIdeasContainer) {
                // Populate project ideas (only on forum.html)
                data.projectIdeas.forEach(idea => {
                    const ideaDiv = document.createElement("div");
                    
                    const button = document.createElement("button");
                    
                    const img = document.createElement("img"); //800x800, webp, ratio:1:1
                    img.className = "project-cover-image";
                    img.src = idea.img.src;
                    img.alt = idea.img.alt;
                    
                    const desc = document.createElement("p");
                    desc.className = "project-description";
                    desc.textContent = idea.description;
                    
                    button.appendChild(img);
                    button.appendChild(desc);
                    
                    const expandableDiv = document.createElement("div");
                    expandableDiv.className = "project-expandable";
                    
                    const projectLink = document.createElement("a");
                    projectLink.className = "project-link";
                    projectLink.href = idea.href;
                    projectLink.textContent = "";
                    
                    const extendedDesc = document.createElement("p");
                    extendedDesc.className = "project-description-extended";
                    extendedDesc.textContent = idea.extendedDescription;
                    
                    const tags = document.createElement("span");
                    tags.className = "tags";
                    tags.textContent = idea.tags.join(", ");
                    
                    expandableDiv.appendChild(projectLink);
                    expandableDiv.appendChild(extendedDesc);
                    expandableDiv.appendChild(tags);
                    
                    ideaDiv.appendChild(button);
                    ideaDiv.appendChild(expandableDiv);
                    
                    projectIdeasContainer.appendChild(ideaDiv);
                });
            }
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
/*------------------------------------------------------------------------------------*/
