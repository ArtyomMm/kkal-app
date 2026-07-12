type WebAppInstance = (typeof import('@twa-dev/sdk'))['default'];

let webAppPromise: Promise<WebAppInstance | null> | null = null;

const loadWebApp = (): Promise<WebAppInstance | null> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (!webAppPromise) {
    webAppPromise = import('@twa-dev/sdk').then((mod) => mod.default);
  }

  return webAppPromise;
};

export const initTelegram = async () => {
  const WebApp = await loadWebApp();
  if (!WebApp) return;

  WebApp.ready();
  WebApp.expand();

  // Set theme colors to match our app
  WebApp.setHeaderColor('#0a0a0a');
  WebApp.setBackgroundColor('#0a0a0a');

  // Enable haptic feedback
  WebApp.HapticFeedback.impactOccurred('light');
};

export const hapticImpact = async (
  style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light'
) => {
  const WebApp = await loadWebApp();
  WebApp?.HapticFeedback.impactOccurred(style);
};

export const hapticNotification = async (type: 'error' | 'success' | 'warning') => {
  const WebApp = await loadWebApp();
  WebApp?.HapticFeedback.notificationOccurred(type);
};

export const hapticSelection = async () => {
  const WebApp = await loadWebApp();
  WebApp?.HapticFeedback.selectionChanged();
};

export const openInvite = async () => {
  const WebApp = await loadWebApp();
  const text = 'Join me in KcalApp — guess the calories and climb the leaderboard!';
  const url = 'https://t.me/kcalapp_bot';

  if (WebApp) {
    WebApp.openTelegramLink(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    );
  }
};
