const filter = document.getElementById("filter");
const pdfList = document.getElementById("pdfList");

fetch("metadata.json")
  .then((res) => res.json())
  .then((data) => {
    const dersler = new Set();

    data.forEach((item) => {
      dersler.add(item.ders);
    });

    dersler.forEach((ders) => {
      const option = document.createElement("option");
      option.value = ders;
      option.textContent = ders;
      filter.appendChild(option);
    });

    const showPDFs = (selected) => {
      pdfList.innerHTML = "";
      data.forEach((item) => {
        if (selected === "hepsi" || item.ders === selected) {
          const container = document.createElement("div");
          container.classList.add("pdf-entry");

          const title = document.createElement("h3");
          title.textContent = `${item.ders} – ${item.title} (${item.tarih})`;

          const iframe = document.createElement("iframe");
          const rawURL = `https://raw.githubusercontent.com/carbenk/not_sitem/main/${item.file}`;
          iframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(rawURL)}&embedded=true`;
          iframe.width = "100%";
          iframe.height = "600px";
          iframe.loading = "lazy";
          iframe.style.border = "none";

          container.appendChild(title);
          container.appendChild(iframe);
          pdfList.appendChild(container);
        }
      });
    };

    filter.addEventListener("change", () => {
      showPDFs(filter.value);
    });

    showPDFs("hepsi");
  });