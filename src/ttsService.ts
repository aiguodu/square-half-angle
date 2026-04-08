export interface TTSState {
  isPlaying: boolean;
  isLoading: boolean;
  currentText: string;
}

type TTSCallback = (state: TTSState) => void;

class TTSService {
  private listeners: TTSCallback[] = [];
  private state: TTSState = { isPlaying: false, isLoading: false, currentText: '' };
  private timer: NodeJS.Timeout | null = null;

  subscribe(callback: TTSCallback) {
    this.listeners.push(callback);
    callback(this.state);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.state));
  }

  // 模拟 TTS 播放，实际项目中可替换为 fetch('/api/tts')
  async play(text: string) {
    this.stop();
    
    this.state = { isPlaying: false, isLoading: true, currentText: text };
    this.notify();

    // 模拟网络请求延迟
    await new Promise((resolve) => setTimeout(resolve, 600));

    this.state = { isPlaying: true, isLoading: false, currentText: text };
    this.notify();

    // 模拟语音播放时长 (根据字数估算)
    const duration = Math.max(2000, text.length * 180);
    this.timer = setTimeout(() => {
      this.stop();
    }, duration);
  }

  stop() {
    if (this.timer) clearTimeout(this.timer);
    this.state = { isPlaying: false, isLoading: false, currentText: '' };
    this.notify();
  }
}

export const ttsService = new TTSService();
