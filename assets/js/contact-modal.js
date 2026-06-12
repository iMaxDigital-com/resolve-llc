(function () {
  const FORM_ID = '0fHXQucDsEEy3J2JRCyC';
  const FORM_SCRIPT_SRC = 'https://link.msgsndr.com/js/form_embed.js';

  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'contact-modal-title');

    modal.innerHTML = `
      <div class="contact-modal__overlay" data-contact-close></div>
      <div class="contact-modal__dialog" tabindex="-1">
        <button class="contact-modal__close" type="button" aria-label="Close" data-contact-close>&times;</button>
        <div class="contact-modal__intro">
          <span class="label contact-modal__eyebrow">Before you continue</span>
          <h2 class="contact-modal__title" id="contact-modal-title">Before You Schedule a Conversation</h2>
          <div class="contact-modal__copy">
            <p>Thank you for your interest in Resolve Advisory.</p>
            <p>Resolve works with individuals, business owners, investors, and families facing difficult situations involving relationships, money, ownership, leadership, and family matters.</p>
            <p>Many clients come to Resolve because they feel stuck. Conversations have become difficult. Trust has eroded. Important decisions need to be made, but emotions, uncertainty, or conflict are making it hard to move forward.</p>

            <h3>What Resolve Does</h3>
            <p>I advise one side in a conflict or difficult situation.</p>
            <p>I help clients think clearly, evaluate options, prepare for important conversations, communicate more effectively, and move toward resolution.</p>
            <p>Depending on the situation, I may remain entirely in the background as an advisor, or I may participate more directly in discussions and negotiations.</p>

            <h3>What Resolve Is Not</h3>
            <p>Resolve is not mediation. I do not represent both sides.</p>
            <p>Resolve is not therapy.</p>
            <p>Resolve is not legal representation.</p>
            <p>While I often work alongside attorneys, accountants, therapists, financial advisors, and other professionals, my role is different. I provide independent advice, perspective, and judgment to help clients navigate difficult situations.</p>

            <h3>Typical Situations</h3>
            <ul>
              <li>Business partnership disputes</li>
              <li>Ownership and investor conflicts</li>
              <li>Leadership disagreements</li>
              <li>Family business issues</li>
              <li>Divorce-related decision support</li>
              <li>Inheritance and estate conflicts</li>
              <li>Family conflict and estrangement</li>
              <li>Difficult conversations where significant relationships or financial interests are involved</li>
            </ul>

            <h3>Working Together</h3>
            <p>Every situation is different.</p>
            <p>The process begins with a Short Initial Conversation, typically lasting 15-20 minutes. The purpose is to understand the situation, answer questions, and determine whether there is a potential fit.</p>
            <p>I am selective about the matters I accept and do not take every engagement.</p>
            <p>If we decide to work together, most engagements begin with a minimum commitment of $2,500, which is applied toward future advisory work. I also maintain office hours at $650 per hour for clients seeking limited guidance or a second opinion.</p>

            <h3>A Good Fit</h3>
            <p>You may be a good fit for Resolve if:</p>
            <ul>
              <li>You want clarity, not just validation.</li>
              <li>You are open to candid advice.</li>
              <li>You are looking for resolution, not unnecessary escalation.</li>
              <li>You are willing to consider perspectives beyond your own.</li>
              <li>You value judgment, discretion, and practical guidance.</li>
            </ul>
            <p>If this sounds like your situation, I invite you to schedule a Short Initial Conversation.</p>
          </div>
          <label class="contact-modal__confirm">
            <input type="checkbox" data-contact-confirm>
            <span>I've read the above text.</span>
          </label>
        </div>
        <div class="contact-modal__form" data-contact-form></div>
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
        src="https://link.msgsndr.com/widget/form/${FORM_ID}"
        style="width:100%;height:100%;border:none;border-radius:8px"
        id="inline-${FORM_ID}"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Resolve Website form"
        data-height="592"
        data-layout-iframe-id="inline-${FORM_ID}"
        data-form-id="${FORM_ID}"
        title="Resolve Website form">
      </iframe>
    `;

    formContainer.dataset.loaded = 'true';
    loadFormEmbedScript();
  }

  function initContactModal() {
    const modal = createModal();
    const dialog = modal.querySelector('.contact-modal__dialog');
    const checkbox = modal.querySelector('[data-contact-confirm]');
    const formContainer = modal.querySelector('[data-contact-form]');
    let lastFocusedElement = null;

    function openModal(event) {
      event.preventDefault();
      lastFocusedElement = document.activeElement;
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
      if (checkbox.checked) renderForm(formContainer);
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
