addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const ip = request.headers.get('cf-connecting-ip');
  const apiKey = IPGEOLOCATION_API_KEY; // Get API key from ipgeolocation.io
  const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

	const htmlContent = `
	<!DOCTYPE html>
	<html>
		<head>
			<title>What's my IP</title>
		</head>
		<body>
			<ul>
				IP: ${data.ip}<br>
				ISP: ${data.isp}<br>
				Country: ${data.country_name}<br>
				Region: ${data.state_prov}<br>
				City: ${data.city}<br>
				Latitude: ${data.latitude}<br>
				Longitude: ${data.longitude}<br>
			</ul>
		</body>
	</html>
	`;

	return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}