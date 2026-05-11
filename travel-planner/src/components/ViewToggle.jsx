import React, { useEffect} from 'react';
import { LayoutGrid, List } from 'lucide-react';

function ViewToggle({ viewMode, setViewMode }) {

    useEffect(() => {
        const saveMode = localStorage.getItem('viewMode');
        if (saveMode) {
            setViewMode(saveMode);
        }
    }, [setViewMode])

    const handleToggle = (mode) => {
        setViewMode(mode);
        localStorage.setItem('viewMode', mode);
    };

  return (
    <div className='flex gap-1 bg-white p-1 rounded-lg shadow-sm border border-gray-100'>
        <button 
            onClick={() => handleToggle('grid')}
            className={`p-2 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
            }`}
        >
            <LayoutGrid size={20} />
        </button>
      
        <button 
            onClick={() => handleToggle('list')}
            className={`p-2 rounded-md transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
            }`}
        >
            <List size={20} />
        </button>
    </div>
  );
}

export default ViewToggle;