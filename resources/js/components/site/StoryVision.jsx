const StoryVision = () => {
  return (
    <section className="story-vision two-column">
      <div className="content">
        <h2 className="sect-subtitle">Our Story & Vision</h2>
        <p>MarHire was founded by two engineers with a passion for travel, on a 
        mission to make exploring Morocco easier and more affordable than ever before...</p>
        
        <p>Their vision was simple yet powerful:</p>
        <blockquote>"Morocco's best local experiences should be easily accessible to 
        everyone without middlemen, confusion, or guesswork."</blockquote>
        
        <h3 className="sect-subtitle">Timeline:</h3>
        <ul className="timeline">
          <li>2023: Launched in Agadir, Morocco</li>
          <li>2024: Expanded nationwide</li>
          <li>2025: Introduced boats, tours & more</li>
        </ul>
      </div>
      <div className="image">
        <img src="https://marhire.bytech.ma/images/morocco.webp" alt="Morocco Flag" />
      </div>
    </section>
  );
}

export default StoryVision;