
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get("userId")
    const BulkAdd = document.getElementById("BulkAdd")
    const Download = document.getElementById("Download")
    const tbody = document.getElementById("tbody")
    const userName = document.getElementById("name")
    const company = document.getElementById("company")
    let data = []


    fetchData();

    async function fetchData() {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            let jsonData = await response.json()

            let formattedData = jsonData.map(el => ({
                userId: userId,
                postId: el.id,
                title: el.title,
                body: el.body
            }));

            data = formattedData

            let userResponse = await fetch(`http://127.0.0.1:4500/user/user/${userId}`)
            let userData = await userResponse.json()


            let postResponse = await fetch(`http://127.0.0.1:4500/post/checkUserId/${userId}`)
            let postData = await postResponse.json()

            
            userName.innerText = userData.data.name
            company.innerText = userData.data.company

            if (postData.exists) {
                Download.style.display = "block";
                BulkAdd.style.display = "none";
            } else {
                BulkAdd.style.display = "block";
            }

            displayData(jsonData)

        } catch (error) {
            console.log(error)
        }

    }


    function displayData(jsonData) {
        tbody.innerHTML = ""

        jsonData.forEach(element => {
            let tr = document.createElement("tr")
            let title = document.createElement("td")
            let body = document.createElement("td")
            let Id = document.createElement("td")

            title.innerText = element.title
            body.innerText = element.body
            Id.innerText = element.id

            tr.append(Id, title, body)
            tbody.append(tr)
        });
    }

    BulkAdd.addEventListener("click", async () => {
        try {
            let response = await fetch("http://127.0.0.1:4500/post/addBulkPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let responseData = await response.json();
            console.log(responseData.message);
            alert(responseData.message)
            fetchData()

        } catch (error) {
            console.error(error);

        }
    });




    Download.addEventListener("click", function() {
        downloadExcel();
    });
    
    function downloadExcel() {
        let exceldata = data.map(obj => Object.values(obj));
        let headers = ["UserId", "PostId", "Title", "Body"];
        exceldata.unshift(headers);
    
        let ws = XLSX.utils.aoa_to_sheet(exceldata);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
        // Save the Excel file
        XLSX.writeFile(wb, "exceldata.xlsx");
    }
    
