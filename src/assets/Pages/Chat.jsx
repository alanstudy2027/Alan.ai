import { useState, useEffect } from 'react';
import { FiMessageSquare, FiMic, FiVolume2, FiUpload, FiUser, FiMenu, FiX } from 'react-icons/fi';
import ChatTab from './components/ChatTab';
import STTTab from './components/STTTab';
import STSTab from './components/STSTab';
import DocTab from './components/DocTab';

const MultiModelApp = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mock user data
  const [user] = useState({
    name: 'Vittron.ai',
    email: 'vittronAI@example.com',
    avatar: null
  });

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Open by default on desktop, closed on mobile
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat': return <ChatTab />;
      case 'stt': return <STTTab />;
      case 'sts': return <STSTab />;
      case 'doc': return <DocTab />;
      default: return <ChatTab />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with toggle button */}
      <header style={{position:"absolute", width:"100%"}} className="bg-white py-3 px-4 flex items-center justify-between md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vittron.Ai
            </h2>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside 
          className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transform transition-transform duration-300 ease-in-out
          fixed md:relative inset-y-0 z-20 w-64 md:w-1/5 bg-white shadow-xl md:shadow-xl
          flex flex-col`}
        >
          <div className="space-y-6 flex-1 p-4 overflow-y-auto">
            <div className="text-center py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">HI, I'm Vittron</h2>
              <p className="text-gray-500 mt-1">How can I help you today?</p>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('chat');
                  isMobile && setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              >
                <FiMessageSquare className="mr-3" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('stt');
                  isMobile && setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'stt' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              >
                <FiMic className="mr-3" />
                <span>Speech to Text</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('sts');
                  isMobile && setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'sts' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              >
                <div className="flex mr-3">
                  <FiMic className="text-sm" />
                  <FiVolume2 className="text-sm ml-0.5" />
                </div>
                <span>Speech to Speech</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('doc');
                  isMobile && setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'doc' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              >
                <FiUpload className="mr-3" />
                <span>Upload Document</span>
              </button>
            </div>
          </div>

          {/* User Profile at the bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-full h-full rounded-full" />
                ) : (
                  <FiUser className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={toggleSidebar}
          />
        )}

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 flex flex-col overflow-auto">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default MultiModelApp;