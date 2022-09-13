import { handleBgMessage, handleTabUpdate } from './controllers/bgEventControllers';

/** Main */
console.log('Running <EXTENSION_NAME_HERE> background script');

// Event listeners
chrome.runtime.onMessage.addListener(handleBgMessage);
chrome.tabs.onUpdated.addListener(handleTabUpdate);