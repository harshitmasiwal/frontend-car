gsap.registerPlugin(ScrollTrigger);

// Fade-in animation for sections
gsap.utils.toArray('.gsap-fade').forEach(element => {
  gsap.from(element, {
    opacity: 0.1,
    y: 50,
    duration: 0.4,
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      toggleActions: "play none none reverse",
    }
  });
});

// Select the video and mute/unmute button
const heroVideo = document.querySelector('.background-video');
const muteToggleButton = document.getElementById('mute-toggle-btn');

// Function to toggle mute/unmute
muteToggleButton.addEventListener('click', () => {
  if (heroVideo.muted) {
    heroVideo.muted = false; // Unmute the video
    muteToggleButton.textContent = 'Mute'; // Change button text
  } else {
    heroVideo.muted = true; // Mute the video
    muteToggleButton.textContent = 'Unmute'; // Change button text
  }
});

heroVideo.muted = true;

// Function to handle video pause/play when it's in/out of the viewport
function handleVideoVisibility(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // When the video is in the viewport, play it
      heroVideo.play().catch(error => {
        console.log('Autoplay error:', error);
      });
    } else {
      // When the video is out of the viewport, pause it
      heroVideo.pause();
    }
  });
}

const observer = new IntersectionObserver(handleVideoVisibility, {
  threshold: 0.5 // Trigger when 50% of the video is visible
});

observer.observe(heroVideo);
