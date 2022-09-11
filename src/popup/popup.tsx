import './styles/popup.scss';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { messageBg } from '../modules/messenger';
import { BgMessageType as BGMT } from '../types/Messages';
import App from './components/App';

/** Main */
initPopup();
console.info('Running <EXTENSION_NAME_HERE> popup script'); // TODO?

/** Ancillary functions */
// Ping background script
messageBg(BGMT.PING, { timeDeparted: Date.now() }).then(({ deltaTime, timeReceived }) => {
  const roundTrip = deltaTime + (Date.now() - timeReceived);
  console.debug(`Ping to background took ${deltaTime} ms. Round trip: ${roundTrip} ms`);
});

/** Initializes popup app */
function initPopup() {
  const rootEl = document.createElement('main');
  rootEl.id = 'root';
  document.body.appendChild(rootEl);
  
  const root = createRoot(rootEl);
  root.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}