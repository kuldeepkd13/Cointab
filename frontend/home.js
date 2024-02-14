let userButton = document.getElementById("userbutton")
let tbody = document.getElementById("tbody")

userButton.addEventListener("click", () => {

    if(userTable.style.display === "block"){
        userTable.style.display = "none"
    }else{
        userTable.style.display = "block"
    }
    fetchData()
})

async function fetchData() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users")
        let jsonData = await response.json()
        console.log(jsonData);

        let userResponse = await fetch("https://cointab-915w.onrender.com/user/userdata")
        let userData = await userResponse.json()
        console.log(userData);




        if (userData.message === "No User Data") {
            displayData(jsonData, []);
            return;
        }

        displayData(jsonData, userData.userIDs);

    } catch (error) {
        console.log(error)
    }

}


function displayData(jsonData, userIDs) {
    tbody.innerHTML = ""

    jsonData.forEach(element => {
        let tr = document.createElement("tr")
        let name = document.createElement("td")
        let email = document.createElement("td")
        let phone = document.createElement("td")
        let website = document.createElement("td")
        let city = document.createElement("td")
        let company = document.createElement("td")
        let operation = document.createElement("td")
        let toggleButton = document.createElement("button")

        name.innerText = element.name
        email.innerText = element.email
        phone.innerText = element.phone
        website.innerText = element.website
        city.innerText = element.address.city
        company.innerText = element.company.name

        // Check if the user is already in the database
        if (userIDs.includes(element.id)) {
            toggleButton.innerText = "Open";
            toggleButton.addEventListener("click", () => {
                // Redirect to the post page

                const nextUrl = `postpage.html?userId=${encodeURIComponent(element.id)}`
                window.location.href = nextUrl
            });

        } else {
            toggleButton.innerText = "Add";

            toggleButton.addEventListener("click", async () => {
                try {
                    let response = await fetch("https://cointab-915w.onrender.com/user/addUser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: element.name,
                            email: element.email,
                            phone: element.phone,
                            website: element.website,
                            city: element.address.city,
                            company: element.company.name,
                            userId: element.id
                        })
                    });
                    let data = await response.json();
                    console.log(data.message);
                    alert(data.message);
                    fetchData()
                } catch (error) {
                    console.error(error);
                }
            });


        }

        tr.append(name, email, phone, website, city, company, operation)
        operation.append(toggleButton);
        tbody.append(tr)
    });
}

