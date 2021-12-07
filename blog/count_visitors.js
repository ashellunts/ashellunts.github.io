let visitors_add_url = "https://8bumfwcy4k.execute-api.eu-central-1.amazonaws.com/prod";
let visitors_count_url = "https://8bumfwcy4k.execute-api.eu-central-1.amazonaws.com/prod";

function add_visitor() {
	url = window.location.pathname
	
	document.getElementById("today_page_visits").innerHTML = url
	
	return
	
	fetch(
		visitors_add_url,{
			method: "POST",
			//headers: {
				//'Accept': 'application/json',
				//'Content-Type': 'application/json'
			//},
			body: JSON.stringify({page: 'blog1'})
		}).then(handleResponse)
}

async function handleResponse(response) {
    const responseJson = await response.json()
    document.getElementById("today_page_visits").innerHTML = JSON.stringify(responseJson)
}

window.onload = add_visitor