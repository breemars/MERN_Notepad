import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-amber-300/30 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                
                {/* Website Title */}
                <h1 className="text-3xl font-bold text-black font-mono tracking-tight">vibepad</h1>
            
                {/* Create New Note Button */}
                <div className="flex items-center gap-4 border border-black">
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className='size-5'/>
                        <span>New Note</span>
                    </Link>
                </div>

            </div>
        </div>
    </header>
  )
}

export default Navbar