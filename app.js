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
          const link = document.createElement("a");
          link.href = `notlar/${item.file}`;
          link.target = "_blank";
          link.textContent = `${item.ders} – ${item.title} (${item.tarih})`;
          pdfList.appendChild(link);
        }
      });
    };

    filter.addEventListener("change", () => {
      showPDFs(filter.value);
    });

    showPDFs("hepsi");
  });
