import "./SocialButtons.css"

const SocialButtons = () => {
  // Social platform buttons data
  const socialPlatforms = [
    { name: "google", icon: "G" },
    { name: "facebook", icon: "f" },
    { name: "linkedin", icon: "in" },
  ]

  return (
    <div className="social-buttons">
      {socialPlatforms.map((platform, index) => (
        <button
          key={index}
          className={`social-button ${platform.name}`}
          style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
        >
          {platform.icon}
        </button>
      ))}
    </div>
  )
}

export default SocialButtons
