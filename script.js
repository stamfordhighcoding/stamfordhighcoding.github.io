// Check if the current page is index.html or main page
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // Fetch JSON data and dynamically populate the carousel
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const carousel = document.getElementById('carousel');
  
        // Reverse the cards array to append in reverse order
        data.cards.reverse().forEach(card => {
          const cardDiv = document.createElement('div');
          cardDiv.className = 'card';
          cardDiv.id = card.id;
  
          // Replace the placeholder #{id} in expandedContent with the actual card id, making sure to format it correctly with a hashtag
          const expandedContentWithLink = card.expandedContent.replace('#', `#${card.id}`);
  
          // Create the HTML structure for each card
          cardDiv.innerHTML = `
            <p class="date">${card.date}</p>
            <img class="coverimage" src="${card.coverimage}" alt="Cover image for ${card.id}">
            <p class="description">${card.description}</p>
            <button class="viewmore" onclick="viewmore('${card.id}')">${card.viewmore}</button>
            <div class="expandedContent" id="expanded-${card.id}" style="display: none;">
              ${expandedContentWithLink}
            </div>
          `;
  
          // Append the card to the carousel container
          carousel.appendChild(cardDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  
    // Function to toggle the visibility of the expanded content
    function viewmore(cardId) {
      const expandedContent = document.getElementById(`expanded-${cardId}`);
      const button = document.querySelector(`#${cardId} .viewmore`);
  
      // Toggle visibility of the expanded content
      if (expandedContent.style.display === "none") {
        expandedContent.style.display = "block";
        button.textContent = "See Less";  // Change button text to "See Less"
      } else {
        expandedContent.style.display = "none";
        button.textContent = "See More";  // Change button text back to "See More"
      }
    }
  }
/*--------------------------------------------------------*/
function copycode(button) {
    // Find the corresponding <pre> tag inside the parent .codecopy div
    const preTag = button.closest('.codecopy').querySelector('pre');
    
    // Create a range and selection to copy text
    const range = document.createRange();
    range.selectNode(preTag);
    window.getSelection().removeAllRanges(); // Clear any previous selections
    window.getSelection().addRange(range);

    // Execute the copy command
    try {
        document.execCommand('copy');
        
        // Change the button text to "Copied"
        button.textContent = "Copied";

        // Revert the button text back to "Copy" after 2 seconds
        setTimeout(function() {
            button.textContent = "Copy";
        }, 2000);
        
    } catch (err) {
        console.error("Copy failed", err);
    }

    // Clear selection
    window.getSelection().removeAllRanges();
}