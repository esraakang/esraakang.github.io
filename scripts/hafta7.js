const themeToggle = document.getElementById("themeToggle");
const applyForm = document.getElementById("applyForm");
const alertArea = document.getElementById("alertArea");
const resultArea = document.getElementById("resultArea");
const shuffleTipsBtn = document.getElementById("shuffleTips");

function setAlert(message, type) {
  alertArea.innerHTML = `
    <div class="alert alert-${type} mb-0" role="alert">
      ${message}
    </div>
  `;
}

function clearAlert() {
  alertArea.innerHTML = "";
}

function setTheme(mode) {
  document.body.setAttribute("data-bs-theme", mode);
  if (mode === "dark") {
    themeToggle.textContent = "Tema: Koyu";
    themeToggle.classList.remove("btn-primary");
    themeToggle.classList.add("btn-outline-light");
  } else {
    themeToggle.textContent = "Tema: Açık";
    themeToggle.classList.remove("btn-outline-light");
    themeToggle.classList.add("btn-primary");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-bs-theme") || "light";
    setTheme(current === "light" ? "dark" : "light");
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function isChecked(id) {
  const el = document.getElementById(id);
  return Boolean(el && el.checked);
}

function buildSummaryCard({ fullName, email, track, timeSlot, note }) {
  const safeNote = note ? escapeHtml(note) : "—";

  return `
    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-body">
        <div class="d-flex align-items-start justify-content-between gap-3">
          <div>
            <div class="h5 fw-bold mb-1">${escapeHtml(fullName)}</div>
            <div class="meta">${escapeHtml(email)}</div>
          </div>
          <span class="badge text-bg-primary">${escapeHtml(track)}</span>
        </div>
        <hr class="my-3" />
        <div class="row g-2">
          <div class="col-12 col-sm-6">
            <div class="meta">Saat</div>
            <div class="fw-semibold">${escapeHtml(timeSlot)}</div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="meta">Not</div>
            <div class="fw-semibold">${safeNote}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

if (applyForm) {
  applyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert();

    const fullName = getValue("fullName");
    const email = getValue("email");
    const track = getValue("track");
    const timeSlot = getValue("timeSlot");
    const note = getValue("note");
    const agree = isChecked("agree");

    const missing = [];
    if (!fullName) missing.push("Ad Soyad");
    if (!email) missing.push("E-posta");
    if (!track) missing.push("Katılım Türü");
    if (!timeSlot) missing.push("Saat");
    if (!agree) missing.push("KVKK onayı");

    if (missing.length > 0) {
      setAlert(`Lütfen şu alanları tamamla: <strong>${missing.join(", ")}</strong>`, "warning");
      resultArea.innerHTML =
        '<div class="text-secondary">Eksik alanları tamamladığında burada başvuru özetin görünecek.</div>';
      return;
    }

    setAlert("Başvurun alındı. Özet aşağıda.", "success");
    resultArea.innerHTML = buildSummaryCard({ fullName, email, track, timeSlot, note });
  });
}

const tips = [
  "Bootstrap grid ile responsive düzen kur.",
  "Form submit’te event.preventDefault() kullan.",
  "Eksik alan varsa uyarı göster, başarılıysa özet üret.",
  "Tema butonuyla data-bs-theme değerini değiştir.",
  "Sonuç alanını innerHTML ile dinamik güncelle.",
];

function shuffleTips() {
  const tipEls = Array.from(document.querySelectorAll("[data-tip]"));
  const pool = [...tips].sort(() => Math.random() - 0.5);
  tipEls.forEach((el, i) => {
    el.textContent = pool[i % pool.length];
  });
}

if (shuffleTipsBtn) {
  shuffleTipsBtn.addEventListener("click", shuffleTips);
}
