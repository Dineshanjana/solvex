import { useState, useEffect, useRef } from "react"
import axios from "axios"
import {
  Paperclip,
  Instagram,
  Facebook,
  Linkedin,
  X as Twitter,
  ChevronDown,
  Loader2 // 👈 spinner icon
} from "lucide-react"
import "./InputSection.css"

const platforms = [
  // { label: "Instagram", value: "instagram", icon: <Instagram size={16} /> },
  { label: "Facebook", value: "facebook", icon: <Facebook size={16} /> },
  // { label: "X", value: "twitter", icon: <Twitter size={16} /> },
  // { label: "LinkedIn", value: "linkedin", icon: <Linkedin size={16} /> }
]

const placeholderPrompts = [
  "a summer offer post for our hotel in Goa...",
  "a weekend brunch announcement for Instagram...",
  "a Facebook story promoting our new spa service..."
]

const InputSection = ({ onGenerate, setIsLoading, postSectionRef}) => {
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [typedPlaceholder, setTypedPlaceholder] = useState("")
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)
  const maxCharacters = 7000

  const handleGenerate = async () => {
    if (postSectionRef?.current) {
      postSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsLoading(true)
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/api/post/post-gen", {
        prompt: inputValue,
        platform: selectedPlatform
      })
      onGenerate(response.data)
    } catch (error) {
      console.error("Error generating post", error)
    }
    setIsLoading(false)
    setLoading(false)
  }

  useEffect(() => {
    let index = 0
    let timeout
    const type = () => {
      const fullText = placeholderPrompts[placeholderIndex]
      if (index <= fullText.length) {
        setTypedPlaceholder(fullText.substring(0, index++))
        timeout = setTimeout(type, 50)
      } else {
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderPrompts.length)
          setTypedPlaceholder("")
        }, 2000)
      }
    }
    type()
    return () => clearTimeout(timeout)
  }, [placeholderIndex])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const text = e.target.value
    if (text.length <= maxCharacters) {
      setInputValue(text)
    }
  }

  return (
    <div className={`slx-input-section ${isFocused ? "slx-focused" : ""}`}>
      <div className="slx-input-container">
        <textarea
          className="slx-input-field"
          placeholder={`Ask SolveX to generate a post for ${typedPlaceholder}`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className="slx-input-actions">
          <div className="slx-action-buttons-left">
            <button className="slx-action-button">
              <Paperclip size={18} className="slx-icon" />
              <span>Attach</span>
            </button>

            <div
              className={`slx-platform-dropdown ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              ref={dropdownRef}
            >
              <div className="slx-selected-option">
                <span className="slx-platform-icon">
                  {selectedPlatform.icon}
                </span>
                <span>{selectedPlatform.label}</span>
                <ChevronDown
                  size={16}
                  className={`slx-chevron ${dropdownOpen ? "rotate" : ""}`}
                />
              </div>

              {dropdownOpen && (
                <div className="slx-dropdown-menu">
                  {platforms.map((p) => (
                    <div
                      key={p.value}
                      className="slx-dropdown-item"
                      onClick={() => {
                        setSelectedPlatform(p)
                        setDropdownOpen(false)
                      }}
                    >
                      <span className="slx-platform-icon">{p.icon}</span>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button 
            className="slx-create-button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="slx-spinner" size={18} />
            ) : (
              <span>Create</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputSection
