/**
 * Check if the app is being displayed in standalone mode (installed PWA)
 */
export const isInStandaloneMode = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         // @ts-ignore - This property exists in iOS Safari
         (window.navigator.standalone === true);
};

/**
 * Send a message to the service worker
 */
export const sendMessageToSW = async (message: any): Promise<any> => {
  if (!('serviceWorker' in navigator)) return null;
  
  const registration = await navigator.serviceWorker.ready;
  if (!registration.active) return null;
  
  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();
    
    messageChannel.port1.onmessage = (event) => {
      resolve(event.data);
    };
    
    registration.active.postMessage(message, [messageChannel.port2]);
  });
};

/**
 * Check if the app can be installed (not already installed)
 */
let deferredPrompt: any = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
});

export const isAppInstallable = (): boolean => {
  return !!deferredPrompt;
};

export const installApp = async (): Promise<boolean> => {
  if (!deferredPrompt) return false;
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;
  
  // Clear the saved prompt since it can't be used again
  deferredPrompt = null;
  
  return choiceResult.outcome === 'accepted';
};