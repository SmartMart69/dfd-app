<script>
  let userInput = ""
  let messages = []
  let loading = false

  async function sendMessage() {
    if (!userInput.trim()) return

    messages = [...messages, { role: "user", content: userInput }]
    loading = true

    const res = await fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    })

    const data = await res.json()
    messages = [...messages, { role: "assistant", content: data.reply }]
    userInput = ""
    loading = false
  }
</script>

<main>
  <h1>Chat mit ChatGPT</h1>

  <div class="chat">
    {#each messages as m}
      <div class={m.role}>{m.content}</div>
    {/each}
    {#if loading}
      <div class="assistant">...</div>
    {/if}
  </div>

  <input bind:value={userInput} on:keydown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Nachricht eingeben" />
  <button on:click={sendMessage}>Senden</button>
</main>

<style>
  main {
    max-width: 800px;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
    padding: 1rem;
    background: #f9f9f9;
    color: #111111;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .chat {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .user,
  .assistant {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    max-width: 80%;
    color: #222222;
    word-wrap: break-word;
  }

  .user {
    align-self: flex-end;
    background-color: #a0a8af;
  }

  .assistant {
    align-self: flex-start;
    background-color: #e3ffe3;
  }

  input {
    width: 90%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    background-color: #007acc;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background-color: #005fa3;
  }
</style>
