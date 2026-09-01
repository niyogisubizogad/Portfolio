<template>
  <div>
    <section class="panel-section" aria-labelledby="contact-title">
      <h2 id="contact-title" class="panel-section__title">Get in touch</h2>
      <p class="contact-lede">
        Based in {{ profile.location }}. The fastest ways to reach me are email
        and WhatsApp — or use the form below.
      </p>

      <ul class="contact-channels">
        <li v-for="channel in channels" :key="channel.id">
          <a
            class="contact-channel"
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
          >
            <component :is="channel.icon" :size="18" aria-hidden="true" />
            <span class="contact-channel__text">
              <span class="contact-channel__label">{{ channel.label }}</span>
              <span class="contact-channel__value">{{ channel.value }}</span>
            </span>
            <ArrowUpRight :size="15" class="contact-channel__arrow" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            class="contact-channel"
            :href="profile.resumePath"
            :download="profile.resumeFileName"
            aria-label="Download Gad NiYoGiSuBiZo's résumé as a PDF"
          >
            <FileDown :size="18" aria-hidden="true" />
            <span class="contact-channel__text">
              <span class="contact-channel__label">Résumé</span>
              <span class="contact-channel__value">PDF download</span>
            </span>
            <Download :size="15" class="contact-channel__arrow" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>

    <section class="panel-section" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" class="panel-section__title">Send a message</h2>

      <form class="contact-form" novalidate @submit.prevent="submitForm">
        <!--
          Honeypot (spam protection): visually hidden from humans and
          removed from the tab order. Bots that fill it are silently
          discarded — no request is sent and no CAPTCHA is shown.
        -->
        <input
          v-model="honeypot"
          type="checkbox"
          name="botcheck"
          class="contact-form__honeypot"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />

        <div class="contact-form__field">
          <label for="contact-name">Full name</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            required
            :aria-invalid="errors.name ? 'true' : undefined"
            :aria-describedby="errors.name ? 'contact-name-error' : undefined"
            @blur="validateField('name')"
            @input="clearErrorIfValid('name')"
          />
          <p
            v-if="errors.name"
            id="contact-name-error"
            class="contact-form__error"
          >
            {{ errors.name }}
          </p>
        </div>

        <div class="contact-form__field">
          <label for="contact-email">Email address</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            :aria-invalid="errors.email ? 'true' : undefined"
            :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            @blur="validateField('email')"
            @input="clearErrorIfValid('email')"
          />
          <p
            v-if="errors.email"
            id="contact-email-error"
            class="contact-form__error"
          >
            {{ errors.email }}
          </p>
        </div>

        <div class="contact-form__field">
          <label for="contact-subject">Subject <span class="contact-form__optional">(optional)</span></label>
          <input
            id="contact-subject"
            v-model="form.subject"
            type="text"
            name="subject"
            autocomplete="off"
          />
        </div>

        <div class="contact-form__field">
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            name="message"
            rows="5"
            required
            :aria-invalid="errors.message ? 'true' : undefined"
            :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            @blur="validateField('message')"
            @input="clearErrorIfValid('message')"
          ></textarea>
          <p
            v-if="errors.message"
            id="contact-message-error"
            class="contact-form__error"
          >
            {{ errors.message }}
          </p>
        </div>

        <!-- Polite live region: announces success / failure without
             interrupting screen readers mid-sentence. -->
        <div class="contact-form__live" aria-live="polite">
          <p
            v-if="status === 'success'"
            class="contact-form__status contact-form__status--ok"
            role="status"
          >
            Thank you — your message has been sent. I'll get back to you soon.
          </p>
          <p
            v-else-if="status === 'error'"
            class="contact-form__status contact-form__status--error"
            role="status"
          >
            Your message could not be sent. Please try again or contact me
            directly by email or WhatsApp.
          </p>
        </div>

        <button
          type="submit"
          class="btn btn--primary"
          :disabled="status === 'sending'"
        >
          <Send :size="16" aria-hidden="true" />
          {{ status === "sending" ? "Sending message…" : "Send message" }}
        </button>
      </form>
    </section>

    <PanelFooter />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import {
  ArrowUpRight,
  Download,
  FileDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
} from "lucide-vue-next";
import { profile } from "../../data/profile.js";
import PanelFooter from "../PanelFooter.vue";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
// Read from the environment at build time — never hardcoded, never committed.
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const form = reactive({ name: "", email: "", subject: "", message: "" });
const errors = reactive({ name: "", email: "", message: "" });
const honeypot = ref(false);
const status = ref("idle"); // idle | sending | success | error

// Quick contact channels. Entries without a real URL (e.g. the LinkedIn
// and Instagram placeholders) are still rendered so links are visible,
// but they are easy to swap in src/data/profile.js.
const channels = computed(() =>
  [
    {
      id: "email",
      label: "Email",
      value: profile.email,
      href: "mailto:" + profile.email,
      icon: Mail,
      external: false,
    },
    {
      id: "github",
      label: "GitHub",
      value: profile.github.replace("https://", ""),
      href: profile.github,
      icon: Github,
      external: true,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: profile.phoneDisplay,
      href: profile.whatsapp,
      icon: MessageCircle,
      external: true,
    },
    profile.linkedin
      ? {
          id: "linkedin",
          label: "LinkedIn",
          value: profile.linkedin.replace("https://", ""),
          href: profile.linkedin,
          icon: Linkedin,
          external: true,
        }
      : null,
    profile.instagram
      ? {
          id: "instagram",
          label: "Instagram",
          value: profile.instagram.replace("https://", ""),
          href: profile.instagram,
          icon: Instagram,
          external: true,
        }
      : null,
  ].filter(Boolean)
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
  name() {
    const value = form.name.trim();
    if (!value) return "Please enter your full name.";
    if (value.length < 2) return "Name must be at least 2 characters long.";
    return "";
  },
  email() {
    const value = form.email.trim();
    if (!value) return "Please enter your email address.";
    if (!EMAIL_PATTERN.test(value)) {
      return "Please enter a valid email address, e.g. name@example.com.";
    }
    return "";
  },
  message() {
    const value = form.message.trim();
    if (!value) return "Please enter a message.";
    if (value.length < 10) return "Message must be at least 10 characters long.";
    return "";
  },
};

const FIELD_IDS = { name: "contact-name", email: "contact-email", message: "contact-message" };

function validateField(field) {
  errors[field] = validators[field]();
  return !errors[field];
}

function clearErrorIfValid(field) {
  if (errors[field] && !validators[field]()) {
    errors[field] = "";
  }
}

function clearForm() {
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
  errors.name = "";
  errors.email = "";
  errors.message = "";
}

async function submitForm() {
  console.log("1. Contact submit started");

  status.value = "idle";

  console.log("2. Honeypot value:", honeypot.value);

  if (honeypot.value) {
    console.warn("Submission stopped: honeypot was filled.");
    clearForm();
    status.value = "success";
    return;
  }

  const fields = ["name", "email", "message"];
  const allValid = fields.map(validateField).every(Boolean);

  console.log("3. Validation passed:", allValid);
  console.log("4. Validation errors:", { ...errors });

  if (!allValid) {
    const firstInvalid = fields.find((field) => errors[field]);

    console.warn("Submission stopped: invalid field:", firstInvalid);

    document.getElementById(FIELD_IDS[firstInvalid])?.focus();
    return;
  }

  console.log("5. Web3Forms key exists:", Boolean(accessKey));
  console.log(
    "6. Web3Forms key format looks correct:",
    accessKey?.startsWith("w3f_")
  );

  if (!accessKey) {
    console.error(
      "Submission stopped: VITE_WEB3FORMS_ACCESS_KEY is missing in the deployed build."
    );

    status.value = "error";
    return;
  }

  status.value = "sending";

  const payload = {
    access_key: accessKey,
    from_name: "Gad Portfolio Contact Form",
    subject:
      form.subject.trim() ||
      `New portfolio message from ${form.name.trim()}`,
    name: form.name.trim(),
    email: form.email.trim(),
    message: form.message.trim(),
    botcheck: honeypot.value,
  };

  console.log("7. About to call Web3Forms fetch", {
    endpoint: WEB3FORMS_ENDPOINT,
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    messageLength: payload.message.length,
  });

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("8. Web3Forms response status:", response.status);

    const result = await response.json();

    console.log("9. Web3Forms response:", result);

    if (!response.ok || result?.success !== true) {
      throw new Error(
        result?.message || `Web3Forms responded with status ${response.status}`
      );
    }

    clearForm();
    status.value = "success";
  } catch (error) {
    console.error("10. Web3Forms submission failed:", error);
    status.value = "error";
  }
}
</script>


<style scoped>
.contact-lede {
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 55ch;
}

.contact-channels {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contact-channel {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.8rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  color: var(--text);
  transition: border-color var(--speed-fast) ease, transform var(--speed-fast) ease;
}

.contact-channel:hover {
  border-color: var(--accent-border);
  color: var(--text);
  transform: translateY(-1px);
}

.contact-channel > svg {
  color: var(--accent);
  flex-shrink: 0;
}

.contact-channel__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.contact-channel__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.contact-channel__value {
  font-size: 0.92rem;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.contact-channel__arrow {
  margin-left: auto;
  color: var(--text-faint);
}

.contact-channel:hover .contact-channel__arrow {
  color: var(--accent);
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 520px;
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-form__field label {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.contact-form__field input,
.contact-form__field textarea {
  min-height: 44px;
  padding: 0.7rem 0.9rem;
  background: var(--surface-muted);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  color: var(--text);
  resize: vertical;
  transition: border-color var(--speed-fast) ease;
}

.contact-form__field input[aria-invalid="true"],
.contact-form__field textarea[aria-invalid="true"] {
  border-color: var(--error);
}

.contact-form__error {
  color: var(--error);
  font-size: 0.8rem;
}

.contact-form__optional {
  color: var(--text-faint);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}

/* Honeypot: rendered but invisible and unreachable for humans */
.contact-form__honeypot {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  opacity: 0;
  pointer-events: none;
}

.contact-form__field input:focus,
.contact-form__field textarea:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
  border-color: var(--accent);
}

.contact-form__field input::placeholder,
.contact-form__field textarea::placeholder {
  color: var(--text-faint);
}

.contact-form__status {
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
}

.contact-form__status--ok {
  color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--success) 30%, transparent);
}

.contact-form__status--error {
  color: var(--text);
  background: color-mix(in srgb, var(--error) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--error) 35%, transparent);
}

.contact-form .btn {
  align-self: flex-start;
}

.contact-form .btn:disabled {
  opacity: 0.6;
  cursor: wait;
}
</style>
