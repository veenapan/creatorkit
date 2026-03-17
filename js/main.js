// CreatorKit shared utilities
// Works from both root (index.html) and tools/ subdirectory

(function(window) {
  'use strict';

  const DAILY_FREE_LIMIT = 3;

  function getTodayKey(toolName) {
    const today = new Date().toISOString().split('T')[0];
    return 'ck_uses_' + toolName + '_' + today;
  }

  function getUsesLeft(toolName) {
    try {
      const used = parseInt(localStorage.getItem(getTodayKey(toolName)) || '0');
      return Math.max(0, DAILY_FREE_LIMIT - used);
    } catch(e) { return DAILY_FREE_LIMIT; }
  }

  function recordUse(toolName) {
    try {
      const key = getTodayKey(toolName);
      const used = parseInt(localStorage.getItem(key) || '0');
      localStorage.setItem(key, used + 1);
    } catch(e) {}
  }

  function isPro() {
    try {
      const key = localStorage.getItem('ck_pro_key');
      return !!(key && key.length > 10);
    } catch(e) { return false; }
  }

  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(function() {
      var original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(function() {
      // fallback for older browsers
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
    });
  }

  // Detect if we're in tools/ subdirectory or root
  function getApiBase() {
    // When deployed on Vercel, API is always at /api/generate
    return '/api/generate';
  }

  async function callAI(prompt) {
    const response = await fetch(getApiBase(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });
    if (!response.ok) {
      const err = await response.json().catch(function() { return { error: 'Server error' }; });
      throw new Error(err.error || 'Something went wrong. Please try again.');
    }
    const data = await response.json();
    return data.result;
  }

  function updateUsesDisplay(toolName) {
    var el = document.getElementById('usesCounter');
    if (!el) return;
    if (isPro()) {
      el.innerHTML = '<span>Pro</span> · Unlimited uses';
      return;
    }
    var left = getUsesLeft(toolName);
    var pricingPath = window.location.pathname.includes('/tools/') ? '../pricing.html' : 'pricing.html';
    el.innerHTML = '<span>' + left + '</span> free use' + (left !== 1 ? 's' : '') + ' left today · <a href="' + pricingPath + '" style="color:var(--accent)">Go Pro for unlimited</a>';
  }

  // Expose globally
  window.CreatorKit = {
    getUsesLeft: getUsesLeft,
    recordUse: recordUse,
    isPro: isPro,
    copyText: copyText,
    callAI: callAI,
    updateUsesDisplay: updateUsesDisplay
  };

})(window);
