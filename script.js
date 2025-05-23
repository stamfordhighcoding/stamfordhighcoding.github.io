document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");
    const projectIdeasContainer = document.getElementById("projectIdeas");
    const resourceListContainer = document.getElementById("resourcelist");

    // Helper function to create the SVG element
    const createResourceSVG = () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        
        svg.appendChild(path);
        return svg;
    };

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

            if (resourceListContainer) {
                data.resourceList.sections.forEach(section => {
                    if (section.type === "div") {
                        const containerDiv = document.createElement("div");
            
                        if (section.content.button) {
                            const button = document.createElement("button");
                            button.className = "resource-button";
                            button.textContent = section.content.button.content;
                            containerDiv.appendChild(button);
                        }
            
                        if (section.tags && section.tags.length > 0) {
                            const tags = document.createElement("span");
                            tags.className = "tags";
                            tags.textContent = section.tags.join(", ");
                            containerDiv.appendChild(tags);
                        }
            
                        resourceListContainer.appendChild(containerDiv);
                    } else if (section.type === "links") {
                        const ul = document.createElement("ul");
                        ul.className = "resource-links";
            
                        section.links.forEach(linkData => {
                            const li = document.createElement("li");
            
                            
            
                            // Add hyperlink if available
                            if (linkData.href && linkData.content) {
                                const link = document.createElement("a");
                                link.href = linkData.href;
                                link.textContent = linkData.content;
                                li.appendChild(link);
                            }
                            
                            // Add extra text after the link
                            if (linkData.extraText) {
                                const textSpan = document.createElement("span");
                                textSpan.textContent = linkData.extraText;
                                textSpan.className = "extra-text";
                                li.appendChild(document.createTextNode(" ")); // Adds space between link and text
                                li.appendChild(textSpan);
                            }
                            
                            ul.appendChild(li);
                        });
            
                        resourceListContainer.appendChild(ul);
                    }
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
// Get all tab container instances
document.querySelectorAll(".windowcontainer").forEach(container => {
    // Add click listener to each container's button selection area
    const buttonArea = container.querySelector(".buttonselections");
    
    buttonArea.addEventListener("click", function(event) {
        const buttons = Array.from(this.querySelectorAll("button"));
        const clickedButton = event.target;
        
        if (buttons.includes(clickedButton)) {
            // Remove active state from all buttons in this container
            buttons.forEach(button => button.classList.remove("active"));
            // Add active state to clicked button
            clickedButton.classList.add("active");
            
            const index = buttons.indexOf(clickedButton);
            
            // Find and toggle windows within this specific container
            const windows = container.querySelectorAll(".windowcontainer-objects > div");
            windows.forEach((window, i) => {
                window.style.display = i === index ? "block" : "none";
            });
        }
    });
    
    // Initialize first tab as active for each container
    const firstButton = buttonArea.querySelector("button");
    if (firstButton) {
        firstButton.classList.add("active");
        const firstWindow = container.querySelector(".windowcontainer-objects > div");
        if (firstWindow) {
            firstWindow.style.display = "block";
        }
        // Hide other windows
        const otherWindows = container.querySelectorAll(".windowcontainer-objects > div:not(:first-child)");
        otherWindows.forEach(window => {
            window.style.display = "none";
        });
    }
});
/*-------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const codeEditor = document.querySelector(".code-editor");
  
    if (codeEditor) {
        codeEditor.addEventListener("click", function (event) {
            if (event.target.classList.contains("file-folder-shown")) {
                const folderContainer = event.target.closest(".file-folder");
                if (folderContainer) {
                    const hiddenFolder = folderContainer.querySelector(".file-folder-hidden");

                    
                    if (hiddenFolder) {
                        if (hiddenFolder.style.display === 'none' || !hiddenFolder.style.display) {
                            hiddenFolder.style.display = 'block';
                          
                        } else {
                            hiddenFolder.style.display = 'none';
             
                        }
                    }
                }
            }
        });
    }
});
/*------------------------------^-------------------*/
document.querySelectorAll('.file').forEach(button => {
    button.addEventListener('click', function() {
        let currentlyDisplayedCode = `docs_external_${this.id}.txt`;
        document.querySelector(".code-content iframe").src = currentlyDisplayedCode;
        document.querySelector(".file-name").innerText = this.innerText; // Update the span text
    });
});
