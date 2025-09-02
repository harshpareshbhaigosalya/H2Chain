const API = "http://localhost:3000";

// Utility to display results with animation
async function showResult(elementId, data) {
  const el = document.getElementById(elementId);
  el.textContent = JSON.stringify(data, null, 2);
  el.classList.add('highlight');
  setTimeout(() => el.classList.remove('highlight'), 2000);
}

/* ------------------- PRODUCER ------------------- */
async function createBatch() {
  const name = document.getElementById("batchName").value;
  const amount = document.getElementById("batchAmount").value;

  const res = await fetch(API + "/createBatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amount })
  });

  const data = await res.json();
  showResult("createResult", data);
}

/* ------------------- CERTIFIER ------------------- */
async function certifyBatch() {
  const batchId = document.getElementById("certifyId").value;

  const res = await fetch(API + "/certifyBatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ batchId })
  });

  const data = await res.json();
  showResult("certifyResult", data);
}

/* ------------------- BUYER ------------------- */
async function transferBatch() {
  const batchId = document.getElementById("transferId").value;
  const to = document.getElementById("transferTo").value;

  const res = await fetch(API + "/transferBatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ batchId, to })
  });

  const data = await res.json();
  showResult("transferResult", data);
}

async function retireBatch() {
  const batchId = document.getElementById("transferId").value;

  const res = await fetch(API + "/retireBatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ batchId })
  });

  const data = await res.json();
  showResult("transferResult", data);
}

/* ------------------- REGULATOR ------------------- */

// Fetch all batches for regulator dashboard
async function fetchLogs() {
  const res = await fetch(API + "/getAllBatches");
  const data = await res.json();

  const container = document.getElementById("logs");
  container.innerHTML = "";
  data.forEach(batch => {
    const div = document.createElement("div");
    div.className = "log-card";
    div.innerHTML = `
      <b>Batch ID:</b> ${batch.id}<br>
      <b>Producer:</b> ${batch.producer}<br>
      <b>Amount:</b> ${batch.amount}<br>
      <b>Status:</b> ${batch.status}<br>
      <b>Timestamp:</b> ${batch.timestamp}
    `;
    container.appendChild(div);
  });
}

// Simulate hacker/fraud attempt
async function simulateHacker() {
  const res = await fetch(API + "/simulateFraud", { method: "POST" });
  const data = await res.json();

  const container = document.getElementById("fraudResult");
  container.innerHTML = "";
  const div = document.createElement("div");
  div.className = data.alert ? "alert log-card" : "log-card";
  div.innerHTML = `<b>${data.message}</b>`;
  container.appendChild(div);
}
