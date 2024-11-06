export const playSFX = (sfx: HTMLAudioElement, volume: number = 1.0) => {
  sfx.volume = volume;
  sfx.currentTime = 0;
  sfx.play().catch((error) => console.error("Play error:", error));
};

export function addHoverSoundEffect(
  selector: string,
  audioFile: string,
  delay: number = 200,
  volume: number = 1.0
): () => void {
  const audio = new Audio(audioFile);
  audio.volume = volume; // Set the volume (range: 0.0 to 1.0)
  let canPlayHoverSound = true;

  const handleMouseEnter = () => {
    if (canPlayHoverSound) {
      audio.currentTime = 0; // Restart audio if necessary
      audio.play();
      canPlayHoverSound = false;

      // Set a delay before the sound can play again
      setTimeout(() => {
        canPlayHoverSound = true;
      }, delay);
    }
  };

  // Add event listener to all matching elements
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("mouseenter", handleMouseEnter);
  });

  // Return a cleanup function to remove event listeners if needed
  return () => {
    document.querySelectorAll(selector).forEach((element) => {
      element.removeEventListener("mouseenter", handleMouseEnter);
    });
  };
}
