//Routes = Route container / Route = defines which component should display for a specific URL
import { Route, Routes } from "react-router" 

//Components
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"

const App = () => {
  return (
    //This div wraps the entire application
    //The mesh background is applied to all the pages
    <div className="bg-[url('./assets/mesh-bg.png')]"> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App