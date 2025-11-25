
document.addEventListener('click', function (e) {
  // delegate only for our play buttons
  if (!e.target.closest) return;
  const btn = e.target.closest('.rv__play');
  if (!btn) return;

  const wrapper = btn.closest('.responsive-video');
  const frame = wrapper.querySelector('.rv__frame');

  // If there's a native video element
  const vid = frame.querySelector('video');
  if (vid) {
    // Play and mark playing
    vid.play().then(() => {
      wrapper.classList.add('is-playing');
      // Optionally show native controls after hitting play:
      vid.setAttribute('controls', '');
    }).catch((err) => {
      // play may be blocked (autoplay policy) — try muted play
      vid.muted = true;
      vid.play().then(() => {
        wrapper.classList.add('is-playing');
        vid.setAttribute('controls', '');
      }).catch((err2) => {
        console.warn('Video play blocked', err2);
      });
    });
    return;
  }

  // If iframe (e.g., YouTube)
  const iframe = frame.querySelector('iframe');
  if (iframe) {
    // Simple method: append autoplay=1 to src (works often but may be blocked)
    const src = iframe.getAttribute('src') || '';
    if (src.indexOf('autoplay=1') === -1) {
      // preserve query string or add correctly
      const sep = src.indexOf('?') === -1 ? '?' : '&';
      iframe.setAttribute('src', src + sep + 'autoplay=1');
    }
    wrapper.classList.add('is-playing');
    return;
  }

});

