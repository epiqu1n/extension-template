import { handleContentMessage } from './controllers/contentEventController';
import { messageBg } from '../modules/messenger';
import { BgMessageType as BGMT } from '../types/Messages';
// import { createRoot } from 'react-dom/client';
// import App from './components/App';

/** Main */
console.info('Running <EXTENSION_NAME_HERE> content script');
// initContentApp();

// Event listeners
chrome.runtime.onMessage.addListener(handleContentMessage);

/** Ancillary functions */
// Ping background script
messageBg(BGMT.PING, { timeDeparted: Date.now() }).then(({ deltaTime, timeReceived }) => {
  const roundTrip = deltaTime + (Date.now() - timeReceived);
  console.debug(`Ping to background took ${deltaTime} ms. Round trip: ${roundTrip} ms`);
});

/** Initializes content React app */
function initContentApp() {
  // TODO :
  // Create element for root
  // Append element to DOM
  // Create React root
  
  // root.render(<App />);
  
  console.log('Initialized <EXTENSION_NAME_HERE> content app');
}