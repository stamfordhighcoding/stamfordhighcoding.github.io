// Track clicks state outside function to persist between calls
let clickCount = 0;
let numbersClicked = 0;

function popup() {
    clickCount++;
    
    if (clickCount === 1) {
        console.log("First time clicking the popup!");
        
        const p1 = document.getElementById("p1");
        const p2 = document.getElementById("p2");
        const p3 = document.getElementById("p3");

        // Apply styles directly
        p1.style.transform = 'rotate(45deg) translateY(10px) translateX(4px)';
        p1.style.transition = 'transform 0.3s'; // Optional: Add a transition effect to make it smooth

        p2.style.opacity = '0'; // Apply fade out effect
        p2.style.transition = 'opacity 0.2s'; // Optional: Add a transition for opacity

        p3.style.transform = 'rotate(-45deg) translateY(-10px) translateX(4px)';
        p3.style.transition = 'transform 0.3s'; // Optional: Add a transition effect for smooth transform

        const menuside = document.getElementById("menuside");
        menuside.style.transition = "left 0.3s ease"; // Smooth transition for 'left' property
        menuside.style.left = "0"; // Set left to 0


        numbersClicked++;
        console.log(`Numbers clicked: ${numbersClicked}`);
    } 
    else if (clickCount === 2) {
        console.log("Second time clicking the popup!");

        const p1 = document.getElementById("p1");
        const p2 = document.getElementById("p2");
        const p3 = document.getElementById("p3");

        // Reset transforms and opacity
        p1.style.transform = 'rotate(0deg) translateY(0px) translateX(0px)';
        p1.style.transition = 'transform 0.3s'; // Keep the smooth transition

        p2.style.opacity = '1'; // Restore visibility
        p2.style.transition = 'opacity 0.2s'; // Keep the smooth transition

        p3.style.transform = 'rotate(0deg) translateY(0px) translateX(0px)';
        p3.style.transition = 'transform 0.3s'; // Keep the smooth transition

        const menuside = document.getElementById("menuside");
        menuside.style.transition = "left 0.3s ease"; // Smooth transition for 'left' property
        menuside.style.left = "-250px"; // Move the element to the left (adjust the value as needed)


        numbersClicked++;
        console.log(`Final numbers clicked before reset: ${numbersClicked}`);
        numbersClicked = 0;
        console.log("Numbers clicked has been reset to:", numbersClicked);
        clickCount = 0;
    }
}