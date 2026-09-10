import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

//Navigation Bar at the Top of the Page
const Navbar = () => {
  return (
    <header className="bg-amber-300/30 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between"> {/* flex + justify-between = pushes the two objects to opposite sides */}
                
                {/* Website Title */}
                <h1 className="text-3xl font-bold text-black font-mono tracking-tight">vibepad</h1> {/* tracking-tight = letter spacing */}
            
                {/* Create New Note Button */}
                <Link to={"/create"} className="btn btn-primary border-black/60 border-2">
                    <PlusIcon className='size-5'/>
                    <span>New Note</span>
                </Link>
                
            </div>
        </div>
    </header>
  )
}

export default Navbar