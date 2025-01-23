import React, { useState } from 'react';
import { Terminal, MonitorUp } from 'lucide-react';

function App() {
  const [displayText, setDisplayText] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would add your ESP32 endpoint
      await fetch('YOUR_ESP32_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: displayText }),
      });
    } catch (error) {
      console.error('Failed to send text to ESP32:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-8 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Terminal className="w-8 h-8" />
          <h1 className="text-3xl font-bold tracking-wider">TFT CONTROLLER v1.0</h1>
        </div>

        {/* Display Preview */}
        <div className="border-2 border-green-500 p-6 mb-8 relative">
          <div className="absolute -top-3 bg-black px-2 flex items-center gap-2">
            <MonitorUp size={16} />
            <span className="text-sm">DISPLAY PREVIEW</span>
          </div>
          <div className="h-32 flex items-center justify-center bg-black">
            <p className="text-2xl tracking-wide blink">
              {displayText || '_'}
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500">{'>'}</span>
            <input
              type="text"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              className="flex-1 bg-black border-2 border-green-500 p-2 text-green-500 focus:outline-none focus:border-green-400"
              placeholder="Enter display text..."
              maxLength={20}
            />
          </div>
          <button
            type="submit"
            className="w-full border-2 border-green-500 p-2 hover:bg-green-500 hover:text-black transition-colors duration-200"
          >
            TRANSMIT TO DISPLAY
          </button>
        </form>

        {/* Status Section */}
        <div className="mt-8 p-4 border-2 border-green-500">
          <p className="text-sm">
            STATUS: <span className="text-yellow-500">READY</span>
          </p>
          <p className="text-sm">
            CHARACTERS: {displayText.length}/20
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;