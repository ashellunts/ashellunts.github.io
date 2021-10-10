let visitors_add_url = "https://ashelluntsgithubio.ashellunts.repl.co/visitors/add";
let visitors_count_url = "https://ashelluntsgithubio.ashellunts.repl.co/visitors/count";

function add_visitor() {
    fetch(visitors_add_url, { method: "POST"}).then(handleResponse)
}

async function handleResponse(response) {
    const responseJson = await response.json()
    document.getElementById("today_page_visits").innerHTML = JSON.stringify(responseJson)
}

window.onload = add_visitor