import InputSection from "./InputSection"
import SuggestionButtons from "./SuggestionButtons"
import PostLayout from '../util/pageLayout'
import "./MainContent.css"
import { useRef, useState } from "react"

const MainContent = () => {

  const [postData, setPostData]  = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const postSectionRef = useRef(null);


  const handleGenerate = (data) =>{
    setPostData(data)
    setIsLoading(false)

  }

  return (
    <main className="main-content">
      <h1 className="main-title">From prompt to post in seconds.</h1>
      <p className="subtitle">SolveX is your AI social content manager.</p>

      <InputSection onGenerate={handleGenerate} setIsLoading={setIsLoading} postSectionRef={postSectionRef}/>
      <SuggestionButtons />
      <div id="resultP" ref={postSectionRef}>
      <PostLayout data={postData} loading={isLoading}/>
      </div>
    </main>
  )
}

export default MainContent
