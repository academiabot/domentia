const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");
const characterCount = document.querySelector("#character-count");

const demoReplies = [
  { match: /expl[ií]ca|aprend|tema/i, text: "¡Vamos paso a paso! Cuéntame qué tema quieres explorar y qué te gustaría entender mejor." },
  { match: /redact|document|escrib|contenido/i, text: "Puedo ayudarte a ordenar esa idea. ¿Para quién es el documento y qué te gustaría comunicar?" },
  { match: /cita|organiza|agenda/i, text: "Empecemos por lo esencial: ¿qué tipo de cita necesitas organizar y qué horarios te vienen bien?" },
];

function addChatMessage(text, className) {
  const message = document.createElement("div");
  message.className = `chat-bubble ${className}`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendDemoPrompt(text) {
  const prompt = text.trim();
  if (!prompt) return;

  addChatMessage(prompt, "user-bubble");
  const reply = demoReplies.find(({ match }) => match.test(prompt));
  addChatMessage(reply?.text ?? "Gracias por compartirlo. Cuéntame un poco más sobre lo que necesitas y exploramos juntos un siguiente paso.", "assistant-bubble");
}

chatInput.addEventListener("input", () => {
  characterCount.textContent = `${chatInput.value.length} / 2000`;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDemoPrompt(chatInput.value);
  chatInput.value = "";
  characterCount.textContent = "0 / 2000";
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendDemoPrompt(button.dataset.prompt));
});
