import { Cloud } from 'lucide-react';
import './LoadingSpinner.css';


export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <Cloud className="cloud-icon" />
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="spinner"></div>
        </div>

        <h2 className="loading-title">
          Loading Weather Data
        </h2>
        <p className="loading-text">
          Please wait while we fetch the latest weather information...
        </p>
        
        <div className="mt-6 dot-container gap-2">
          <div className="dot"></div>
          <div className="dot" style={{animationDelay: '0.2s'}}></div>
          <div className="dot" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}