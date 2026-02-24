// JavaScript to make the first doodle follow the mouse cursor
document.addEventListener('mousemove', (e) => {
    const doodle1 = document.querySelector('.doodle-1');
    const mouseX = e.pageX;
    const mouseY = e.pageY;
  
    // Update position of doodle 1 based on mouse position
    doodle1.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Wait for the page to load
window.onload = function() {
  // Set timeout for the preloader (e.g., 3 seconds)
  setTimeout(function() {
      // Hide the preloader
      document.getElementById('preloader').style.display = 'none';
      // Show the main content
      document.getElementById('main-content').style.display = 'block';
  }, 5090); // 3000 milliseconds = 3 seconds
};
