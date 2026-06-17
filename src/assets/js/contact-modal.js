(function () {
  const FORM_ID = 'FPGZCeZLx51tvhZt9sjR';
  const FORM_SCRIPT_SRC = 'https://link.msgsndr.com/js/form_embed.js';
  const DEFAULT_CONTACT_MODAL = {
    closeLabel: 'Close',
    eyebrow: 'Before you continue',
    title: 'Before You Schedule a Conversation',
    introParagraphs: [
      'Thank you for your interest in Resolve Advisory.',
      'Resolve works with individuals, business owners, investors, and families facing difficult situations involving relationships, money, ownership, leadership, and family matters.',
      'Many clients come to Resolve because they feel stuck. Conversations have become difficult. Trust has eroded. Important decisions need to be made, but emotions, uncertainty, or conflict are making it hard to move forward.'
    ],
    sections: [
      {
        heading: 'What Resolve Does',
        paragraphs: [
          'I advise one side in a conflict or difficult situation.',
          'I help clients think clearly, evaluate options, prepare for important conversations, communicate more effectively, and move toward resolution.',
          'Depending on the situation, I may remain entirely in the background as an advisor, or I may participate more directly in discussions and negotiations.'
        ],
        items: [],
        closingParagraphs: []
      },
      {
        heading: 'What Resolve Is Not',
        paragraphs: [
          'Resolve is not mediation. I do not represent both sides.',
          'Resolve is not therapy.',
          'Resolve is not legal representation.',
          'While I often work alongside attorneys, accountants, therapists, financial advisors, and other professionals, my role is different. I provide independent advice, perspective, and judgment to help clients navigate difficult situations.'
        ],
        items: [],
        closingParagraphs: []
      },
      {
        heading: 'Typical Situations',
        paragraphs: [],
        items: [
          'Business partnership disputes',
          'Ownership and investor conflicts',
          'Leadership disagreements',
          'Family business issues',
          'Divorce-related decision support',
          'Inheritance and estate conflicts',
          'Family conflict and estrangement',
          'Difficult conversations where significant relationships or financial interests are involved'
        ],
        closingParagraphs: []
      },
      {
        heading: 'Working Together',
        paragraphs: [
          'Every situation is different.',
          'The process begins with a Short Initial Conversation, typically lasting 15-20 minutes. The purpose is to understand the situation, answer questions, and determine whether there is a potential fit.',
          'I am selective about the matters I accept and do not take every engagement.',
          'If we decide to work together, most engagements begin with a minimum commitment of $2,500, which is applied toward future advisory work. I also maintain office hours at $650 per hour for clients seeking limited guidance or a second opinion.'
        ],
        items: [],
        closingParagraphs: []
      },
      {
        heading: 'A Good Fit',
        paragraphs: [
          'You may be a good fit for Resolve if:'
        ],
        items: [
          'You want clarity, not just validation.',
          'You are open to candid advice.',
          'You are looking for resolution, not unnecessary escalation.',
          'You are willing to consider perspectives beyond your own.',
          'You value judgment, discretion, and practical guidance.'
        ],
        closingParagraphs: [
          'If this sounds like your situation, I invite you to schedule a Short Initial Conversation.'
        ]
      }
    ],
    confirmationLabel: "I've read the above text.",
    continueButtonLabel: 'Continue to the form',
    backButtonLabel: 'Back to note',
    formTitle: 'Schedule a Short Initial Conversation',
    successMessage: 'Thank you for scheduling this appointment.  I look forward to speaking with you.'
  };

  function getModalContent() {
    const cmsContent = window.ResolveSite && window.ResolveSite.contactModal;

    return {
      ...DEFAULT_CONTACT_MODAL,
      ...(cmsContent || {}),
      introParagraphs: Array.isArray(cmsContent && cmsContent.introParagraphs) ? cmsContent.introParagraphs : DEFAULT_CONTACT_MODAL.introParagraphs,
      sections: Array.isArray(cmsContent && cmsContent.sections) ? cmsContent.sections : DEFAULT_CONTACT_MODAL.sections
    };
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderParagraphs(paragraphs) {
    if (!Array.isArray(paragraphs)) return '';

    return paragraphs
      .filter((paragraph) => paragraph !== undefined && paragraph !== null && paragraph !== '')
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join('');
  }

  function renderList(items) {
    if (!Array.isArray(items) || !items.length) return '';

    return `
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    `;
  }

  function renderModalCopy(content) {
    return `
      ${renderParagraphs(content.introParagraphs)}
      ${content.sections.map((section) => {
        const safeSection = section || {};

        return `
        <h3>${escapeHtml(safeSection.heading)}</h3>
        ${renderParagraphs(safeSection.paragraphs)}
        ${renderList(safeSection.items)}
        ${renderParagraphs(safeSection.closingParagraphs)}
      `;
      }).join('')}
    `;
  }

  function createModal() {
    const content = getModalContent();
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'contact-modal-title');

    modal.innerHTML = `
      <div class="contact-modal__overlay" data-contact-close></div>
      <div class="contact-modal__dialog" tabindex="-1">
        <button class="contact-modal__close" type="button" aria-label="${escapeHtml(content.closeLabel)}" data-contact-close>&times;</button>
        <div class="contact-modal__intro">
          <span class="label contact-modal__eyebrow">${escapeHtml(content.eyebrow)}</span>
          <h2 class="contact-modal__title" id="contact-modal-title">${escapeHtml(content.title)}</h2>
          <div class="contact-modal__copy">
            ${renderModalCopy(content)}
          </div>
          <label class="contact-modal__confirm">
            <input type="checkbox" data-contact-confirm>
            <span><strong>${escapeHtml(content.confirmationLabel)}</strong></span>
          </label>
          <button class="btn btn--dark contact-modal__continue" type="button" data-contact-continue disabled>${escapeHtml(content.continueButtonLabel)}</button>
        </div>
        <div class="contact-modal__form-step" data-contact-form-step>
          <button class="contact-modal__back" type="button" data-contact-back>${escapeHtml(content.backButtonLabel)}</button>
          <h2 class="contact-modal__form-title">${escapeHtml(content.formTitle)}</h2>
          <div class="contact-modal__form" data-contact-form></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function loadFormEmbedScript() {
    if (document.querySelector(`script[src="${FORM_SCRIPT_SRC}"]`)) return;

    const script = document.createElement('script');
    script.src = FORM_SCRIPT_SRC;
    document.body.appendChild(script);
  }

  function renderForm(formContainer) {
    if (formContainer.dataset.loaded === 'true') return;

    formContainer.innerHTML = `
      <iframe
        src="https://link.msgsndr.com/widget/booking/${FORM_ID}"
        style="width:100%;border:none;overflow:hidden;"
        scrolling="no"
        id="${FORM_ID}_1781704016269"
        title="Schedule a Short Initial Conversation">
      </iframe>
    `;

    formContainer.dataset.loaded = 'true';
    loadFormEmbedScript();
  }

  function renderSuccessMessage(formContainer) {
    const content = getModalContent();

    formContainer.innerHTML = `
      <div class="contact-modal__copy" style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
        <p>${escapeHtml(content.successMessage)}</p>
      </div>
    `;
  }

  function initContactModal() {
    const modal = createModal();
    const dialog = modal.querySelector('.contact-modal__dialog');
    const checkbox = modal.querySelector('[data-contact-confirm]');
    const continueButton = modal.querySelector('[data-contact-continue]');
    const backButton = modal.querySelector('[data-contact-back]');
    const formContainer = modal.querySelector('[data-contact-form]');
    let lastFocusedElement = null;

    function openModal(event) {
      event.preventDefault();
      lastFocusedElement = document.activeElement;
      modal.classList.remove('is-form-step');
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      dialog.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    document.querySelectorAll('a').forEach((link) => {
      const label = link.textContent.trim().toLowerCase();
      if (label.includes('request a conversation')) {
        link.addEventListener('click', openModal);
      }
    });

    modal.querySelectorAll('[data-contact-close]').forEach((control) => {
      control.addEventListener('click', closeModal);
    });

    checkbox.addEventListener('change', () => {
      modal.classList.toggle('has-confirmed', checkbox.checked);
      continueButton.disabled = !checkbox.checked;
    });

    continueButton.addEventListener('click', () => {
      if (!checkbox.checked) return;
      modal.classList.add('is-form-step');
      renderForm(formContainer);
      dialog.scrollTop = 0;
      backButton.focus();
    });

    window.addEventListener('message', (event) => {
      const iframe = formContainer.querySelector('iframe');
      if (!iframe || event.source !== iframe.contentWindow) return;
      if (!Array.isArray(event.data) || event.data[0] !== 'set-sticky-contacts') return;
      if (event.data[1] !== `embedded_iframe_${iframe.id}` || event.data[2] !== iframe.id) return;

      formContainer.setAttribute('aria-live', 'polite');
      renderSuccessMessage(formContainer);
      dialog.scrollTop = 0;
    });

    backButton.addEventListener('click', () => {
      modal.classList.remove('is-form-step');
      dialog.scrollTop = 0;
      continueButton.focus();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactModal);
  } else {
    initContactModal();
  }
})();
