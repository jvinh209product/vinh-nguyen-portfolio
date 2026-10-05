export const OPTIONAL_MEDIA_TIMEOUT = 4000;

/** Wait for a real image decode, failure, or a bounded, intentional fallback. */
export function settleImage(image: HTMLImageElement, signal: AbortSignal, timeout = OPTIONAL_MEDIA_TIMEOUT): Promise<'decoded' | 'fallback' | 'cancelled'> {
  return new Promise(resolve => {
    let done = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (result: 'decoded' | 'fallback' | 'cancelled') => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      image.removeEventListener('load', decode);
      image.removeEventListener('error', fallback);
      signal.removeEventListener('abort', cancel);
      if (result === 'fallback') image.dispatchEvent(new Event('portfolio:media-fallback'));
      resolve(result);
    };
    const fallback = () => finish('fallback');
    const cancel = () => finish('cancelled');
    const decode = () => {
      if (!image.naturalWidth) return fallback();
      if (typeof image.decode !== 'function') return finish('decoded');
      image.decode().then(() => finish('decoded')).catch(fallback);
    };
    if (signal.aborted) return cancel();
    signal.addEventListener('abort', cancel, { once: true });
    image.addEventListener('load', decode, { once: true });
    image.addEventListener('error', fallback, { once: true });
    timer = setTimeout(fallback, timeout);
    if (image.complete) decode();
  });
}
