
    showViolationDialog(
      'CLOSE APPLICATION?', 
      'Closing Hot Dog Builder Pro will result in the permanent deletion of your hot dog configuration. The Bureau reminds you that unsaved hot dogs are counted among life\'s great regrets.\n\nAre you sure you wish to proceed?',
      '⚠️'
    );
  });
}

/* ============================================================
   3D TILT
   ============================================================ */
function initTilt() {
  const wrapper = document.getElementById('dogWrapper');
  let mouseX = 0, mouseY = 0, ticking = false;

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!ticking) requestAnimationFrame(updateTilt);
    ticking = true;
  }

  function updateTilt() {
    const rect = wrapper.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;
    const offsetX = (mouseX - midX) / (rect.width * 0.5);
    const offsetY = (mouseY - midY) / (rect.height * 0.5);
    state.tiltX = Math.min(Math.max(offsetY * -25, -12), 12);
    state.tiltY = Math.min(Math.max(offsetX * 25, -24), 24);
    const c = document.getElementById('dogContainer');
    c.style.setProperty('--tilt-x', state.tiltX + 'deg');
    c.style.setProperty('--tilt-y', state.tiltY + 'deg');
    ticking = false;
  }

  wrapper.addEventListener('mousemove', handleMouseMove);
}

/* ============================================================
   CLOCK
   ============================================================ */
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = formattedHours + ':' + formattedMinutes + ' ' + ampm;
  document.getElementById('trayTime').textContent = timeStr;
}

/* ============================================================
   INIT
   ============================================================ */
initToppingGraphics();
initUI();
initTilt();
renderAll();
setInterval(updateClock, 1000);
setStageStatus('Ready. Build a respectable hot dog.', '');
