(() => {
  const modal = document.getElementById('command-modal');
  const input = document.getElementById('command-input');
  const list = document.getElementById('command-list');
  const commands = [...list.querySelectorAll('li')];

  // Open modal on Ctrl+K or Cmd+K
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.add('visible');
      input.focus();
    }

    // Close modal on Escape
    if (e.key === 'Escape' && modal.classList.contains('visible')) {
      closeModal();
    }
  });

  // Close modal helper
  function closeModal() {
    modal.classList.remove('visible');
    input.value = '';
    resetList();
  }

  // Close when clicking outside modal content
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Filter commands based on input
  input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    commands.forEach(cmd => {
      const text = cmd.textContent.toLowerCase();
      cmd.style.display = text.includes(val) ? '' : 'none';
    });
  });

  // Keyboard navigation in list
  let focusedIndex = -1;
  input.addEventListener('keydown', e => {
    const visibleCommands = commands.filter(cmd => cmd.style.display !== 'none');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex = (focusedIndex + 1) % visibleCommands.length;
      visibleCommands[focusedIndex].focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = (focusedIndex - 1 + visibleCommands.length) % visibleCommands.length;
      visibleCommands[focusedIndex].focus();
    }
    if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      visibleCommands[focusedIndex].click();
    }
  });

  // Reset list & focus index
  function resetList() {
    commands.forEach(cmd => (cmd.style.display = ''));
    focusedIndex = -1;
  }

  // Command actions
  commands.forEach(cmd => {
    cmd.addEventListener('click', () => {
      const action = cmd.dataset.action;

      switch (action) {
        case 'github':
          window.open('https://github.com/fashido', '_blank');
          break;
        case 'discord':
          window.open('https://discordapp.com/users/324877029868568576', '_blank');
          break;
      }
      closeModal();
    });
  });
})();