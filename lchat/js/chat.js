const API_KEY = "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";

async function send() {
  const input = document.getElementById("question");
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful multilingual assistant." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;
    addMessage("bot", reply);

  } catch (err) {
    addMessage("bot", "⚠️ AI service unavailable");
  }
}

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = role;
  div.innerText = text;
  document.getElementById("messages").appendChild(div);
}
