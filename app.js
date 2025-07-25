const filter = document.getElementById("filter");
const pdfList = document.getElementById("pdfList");

fetch("metadata.json")
  .then(res => res.json())
  .then(data => {
    const dersler = new Set();
    data.forEach(item => dersler.add(item.ders));
    dersler.forEach(ders => {
      const option = document.createElement("option");
      option.value = ders;
      option.textContent = ders;
      filter.appendChild(option);
    });

    // PDF iframe gösterim alanı
    const viewer = document.createElement("div");
    viewer.id = "pdfViewer";
    pdfList.parentNode.insertBefore(viewer, pdfList.nextSibling);

    const showList = (selected) => {
      pdfList.innerHTML = "";
      viewer.innerHTML = ""; // Önceki gösterimi temizle
      data.forEach(item => {
        if (selected === "hepsi" || item.ders === selected) {
          const link = document.createElement("a");
          link.href = "#";
          link.textContent = `${item.ders} – ${item.title} (${item.tarih})`;
          link.style.display = "block";
          link.style.margin = "10px 0";
          link.addEventListener("click", e => {
            e.preventDefault();
            viewer.innerHTML = ""; // Önceki PDF'yi kaldır
            const iframe = document.createElement("iframe");
            iframe.src = `notlar/${item.file}`;
            iframe.width = "100%";
            iframe.height = "600px";
            iframe.loading = "lazy";
            viewer.appendChild(iframe);
          });
          pdfList.appendChild(link);
        }
      });
    };

    filter.addEventListener("change", () => {
      showList(filter.value);
    });

    showList("hepsi");
  });

