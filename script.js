async function getData() {
  let IPAddress;

  // // This API call is for getting the user's IP address
  // $.getJSON("https://api.ipify.org?format=json", function (data) {
  //     IPAddress = data.ip;
  //     document.getElementById("user-ip").innerHTML = IPAddress;
  //     console.log(IPAddress)

  // });

  IPAddress = await fetch(`https://api.ipify.org?format=json`);
  IPAddress = await IPAddress.json();
  IPAddress = IPAddress.ip;
  console.log(IPAddress);
  document.getElementById("user-ip").innerHTML = IPAddress;

  //  const response = await fetch(`https://ipinfo.io/103.198.173.228/geo`)
  const response = await fetch(
    `https://ipinfo.io/219.91.171.160?token=da0588ddb69592`
  );
  const geoinfo = await response.json();
  console.log(geoinfo);

  document.getElementById("timezone").innerText = geoinfo.timezone;
  document.getElementById("city").innerText = geoinfo.city;
  document.getElementById("region").innerText = geoinfo.region;
  document.getElementById("oraganisation").innerText = geoinfo.org;
  document.getElementById("hostname").innerText = geoinfo.hostname;
  document.getElementById("Zone").innerText = geoinfo.timezone;
  document.getElementById("date").innerText = geoinfo.timezone;
  document.getElementById("pincode").innerText = geoinfo.postal;
  document.getElementById("hostname").innerText = "Ajay Birare";
  // const ipLabel = document.getElementById("getip")
  // console.log(ipLabel)

  showMap(geoinfo.loc);

  console.log(geoinfo);

  function showMap(location) {
    // Extracting latitude and longitude from the location string
    var latLong = location.split(",");
    var latitude = latLong[0];
    var longitude = latLong[1];

    // Assuming you have a <div> with the ID "map-container" to show the map
    var mapContainer = document.getElementById("map-container");
    mapContainer.innerHTML = `<iframe width="100%" height="300" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed"></iframe>`;
  }

  const postal = await fetch(`https://api.postalpincode.in/pincode/110001`);
  const postOfc = await postal.json();
  const postOffice = postOfc[0].PostOffice;

  const postofficeslistcontainer = document.getElementById("post-offices-list");

  postOffice.forEach((element) => {
    postofficeslistcontainer.innerHTML += ` <div class="card">
                    <div>Name : ${element.Name}</div>
                    <div>Branch Type : ${element.BranchType}</div>
                    <div>Delivery Status : ${element.DeliveryStatus}</div>
                    <div>District : ${element.District}</div>
                    <div>Division : ${element.Division}</div>
                    </div>`;
  });
}

getData();
