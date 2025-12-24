let wardrobe = JSON.parse(localStorage.getItem("wardrobe")) || [];

function addItem() {
    let category = document.getElementById("category").value;
    let name = document.getElementById("name").value;
    let photoFile = document.getElementById("photo").files[0];

    if (!name || !photoFile) {
        alert("Please enter name and upload a photo");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        let item = {
            category: category,
            name: name,
            photo: e.target.result
        };

        wardrobe.push(item);
        localStorage.setItem("wardrobe", JSON.stringify(wardrobe));
        document.getElementById("name").value = "";
        document.getElementById("photo").value = "";

        showList();
    };

    reader.readAsDataURL(photoFile);
}

function showList() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    wardrobe.forEach(item => {
        let div = document.createElement("div");
        div.className = "item-card";

        div.innerHTML = `
            <img src="${item.photo}">
            <p><strong>${item.name}</strong></p>
            <p>${item.category}</p>
        `;

        list.appendChild(div);
    });
}

showList();

function suggestOutfit() {
    let occasion = document.getElementById("occasion").value;

    let picks = [];

    let top = wardrobe.find(i => i.category === "top");
    let jeans = wardrobe.find(i => i.category === "jeans");
    let kurti = wardrobe.find(i => i.category === "kurti");
    let jacket = wardrobe.find(i => i.category === "jacket");
    let layering = wardrobe.find(i => i.category === "layering");
    let bag = wardrobe.find(i => i.category === "bag");
    let shoes = wardrobe.find(i => i.category === "shoes");
    let jewelry = wardrobe.find(i => i.category === "jewelry");

    if (occasion === "casual") {
        if (top) picks.push(top);
        if (jeans) picks.push(jeans);
        if (shoes) picks.push(shoes);
        if (bag) picks.push(bag);
    }

    if (occasion === "college") {
        if (top) picks.push(top);
        if (jeans) picks.push(jeans);
        if (layering) picks.push(layering);
        if (shoes) picks.push(shoes);
    }

    if (occasion === "party") {
        if (top) picks.push(top);
        if (jeans) picks.push(jeans);
        if (jewelry) picks.push(jewelry);
        if (bag) picks.push(bag);
    }

    if (occasion === "ethnic") {
        if (kurti) picks.push(kurti);
        if (shoes) picks.push(shoes);
        if (jewelry) picks.push(jewelry);
    }

    let result = document.getElementById("result");
    result.innerHTML = "";

    if (picks.length === 0) {
        result.innerHTML = "Not enough items to suggest an outfit";
        return;
    }

    picks.forEach(p => {
        let img = document.createElement("img");
        img.src = p.photo;
        result.appendChild(img);
    });
}
