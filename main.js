const URL = "https://gifts-cha-bb-api.onrender.com/presentes";

async function loader() {
  let request = await fetch(URL);
  let data = request.json();
  data.then(function (result) {
    result.forEach((element) => {
      let table = document.querySelector("table");

      let row = document.createElement("tr");
      let id = document.createElement("td");
      let item = document.createElement("td");
      let nome = document.createElement("td");
      let input = document.createElement("td");

      if (element.id % 2 == 0) {
        row.style.backgroundColor = "#db7da7";
      } else {
        row.style.backgroundColor = "#dfa0c9";
      }
      id.className = "id";
      nome.className = "name";

      id.innerHTML = element.id;
      item.innerHTML = element.name;
      nome.innerHTML = element.giver;

      row.appendChild(id);
      row.appendChild(item);
      row.appendChild(nome);

      if (!element.giver || element.giver == "") {
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Assinar";
        button.addEventListener("click", sender.bind(this, button));
        input.appendChild(button);

        let textarea = document.createElement("textarea");
        textarea.cols = 13;
        textarea.rows = 3;
        nome.appendChild(textarea);
        row.appendChild(input);
      } else {
        nome.colSpan = "2";
      }

      table.appendChild(row);
    });
  });
}

loader();

async function sender(element) {
  let row = element.parentElement.parentElement;
  if (
    confirm(
      "Tem certeza que deseja assinar " + row.children[1].innerHTML + " ?"
    )
  ) {
    let id = row.firstChild.innerHTML;
    let name = row.children[2].firstChild.value.trim();

    if (name && name.includes(" ")) {
      let obj = {
        giver: name,
      };

      await fetch(URL + "/" + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      document.location.reload(true);
    } else {
      alert("Insira nome e sobrenome!");
    }
  }
}
