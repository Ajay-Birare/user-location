// async function getData() {
//   let IPAddress;

//   // // This API call is for getting the user's IP address
//   // $.getJSON("https://api.ipify.org?format=json", function (data) {
//   //     IPAddress = data.ip;
//   //     document.getElementById("user-ip").innerHTML = IPAddress;
//   //     console.log(IPAddress)

//   // });

//   IPAddress = await fetch(`https://api.ipify.org?format=json`);
//   IPAddress = await IPAddress.json();
//   IPAddress = IPAddress.ip;
//   console.log(IPAddress);
//   document.getElementById("user-ip").innerHTML = IPAddress;

//   //  const response = await fetch(`https://ipinfo.io/103.198.173.228/geo`)
//   const response = await fetch(
//     `https://ipinfo.io/219.91.171.160?token=da0588ddb69592`
//   );
//   const geoinfo = await response.json();
//   console.log(geoinfo);

//   document.getElementById("timezone").innerText = geoinfo.timezone;
//   document.getElementById("city").innerText = geoinfo.city;
//   document.getElementById("region").innerText = geoinfo.region;
//   document.getElementById("oraganisation").innerText = geoinfo.org;
//   document.getElementById("hostname").innerText = geoinfo.hostname;
//   document.getElementById("Zone").innerText = geoinfo.timezone;
//   document.getElementById("date").innerText = geoinfo.timezone;
//   document.getElementById("pincode").innerText = geoinfo.postal;
//   document.getElementById("hostname").innerText = "Ajay Birare";
//   // const ipLabel = document.getElementById("getip")
//   // console.log(ipLabel)

//   showMap(geoinfo.loc);

//   console.log(geoinfo);

//   function showMap(location) {
//     // Extracting latitude and longitude from the location string
//     var latLong = location.split(",");
//     var latitude = latLong[0];
//     var longitude = latLong[1];

//     // Assuming you have a <div> with the ID "map-container" to show the map
//     var mapContainer = document.getElementById("map-container");
//     mapContainer.innerHTML = `<iframe width="100%" height="300" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed"></iframe>`;
//   }

//   const postal = await fetch(`https://api.postalpincode.in/pincode/110001`);
//   const postOfc = await postal.json();
//   const postOffice = postOfc[0].PostOffice;

//   const postofficeslistcontainer = document.getElementById("post-offices-list");

//   postOffice.forEach((element) => {
//     postofficeslistcontainer.innerHTML += ` <div class="card">
//                     <div>Name : ${element.Name}</div>
//                     <div>Branch Type : ${element.BranchType}</div>
//                     <div>Delivery Status : ${element.DeliveryStatus}</div>
//                     <div>District : ${element.District}</div>
//                     <div>Division : ${element.Division}</div>
//                     </div>`;
//   });
// }

// getData();

// 000000000000000000000000
let ipcontainer = document.getElementById("ip");
let container = document.getElementById("IPAdd");

function getUserIp() {
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    let ipAddress = data.ip;
    // console.log(ipAddress);

    ipcontainer.innerHTML = `${ipAddress}`;
  });
}

var locationData;
var postofficeData;

var postalCardDiv;

document.getElementById("dataDiv").style.display = "none";

async function ShowData() {
  document.getElementById("head").style.display = "none";

  var dataDiv = document.getElementById("dataDiv");
  dataDiv.style.display = "block";

  var IPAddress;

  await $.getJSON("https://api.ipify.org?format=json", function (data) {
    IPAddress = data.ip;
    // let ipcontainer = document.getElementById("ip");
    // ipcontainer.innerHTML = `${IPAddress}`;

    container.innerHTML = `IP Address : ${IPAddress}`;
  });

  console.log(IPAddress);

  await fetch(`https://ipinfo.io/${IPAddress}?token=da0588ddb69592`)
    .then((response) => response.json())
    .then((response) => (locationData = response))
    .catch(() => {
      alert("Problem with fetching data");
    });

  var latLong = locationData.loc.split(",");
  let lat = latLong[0].trim();
  let long = latLong[1].trim();
  //   let IP = data.ip;
  //   container.innerHTML = `${IP}`;

  dataDiv.innerHTML += `
  <div class="infoDiv" id="infoDiv1">
 
        <div>
          <div>Lat : ${lat}</div>
          <div>Long : ${long}</div>
        </div>

        <div>
          <div>City : ${locationData.city}</div>
          <div>Region : ${locationData.region}</div>
        </div>

        <div>
          <div>Organisation : ${locationData.org}</div>
          <div>Hostname : ${"ipInfo"}</div>
        </div>
      </div>

      <div id="mapDiv">
      <p class="location">Your Current Location</p>
        <iframe
          src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed"
          frameborder="0"
          id="mapFrame"
        ></iframe>
      </div>
      
      `;

  console.log(locationData);
  dataDiv.innerHTML += "<h3>More Information About You</h3>";
  let datetime_str = new Date().toLocaleString("en-US", {
    timeZone: `${locationData.timezone}`,
  });

  await fetch(`https://api.postalpincode.in/pincode/${locationData.postal}`)
    .then((response) => response.json())
    .then((response) => response[0])
    .then((response) => {
      console.log(response);
      dataDiv.innerHTML += `<div class="infoDiv" id="infoDiv2">

        <div>TimeZone : ${locationData.timezone}</div>
        <div>Date And Time : ${datetime_str}</div>
        <div>Pincode : ${locationData.postal}</div>
        <div>
          Message :
          <p>${response.Message}</p>
        </div>
      </div>
      
       <div id="postalInfoDiv">
       <h3>Post Offices Near You</h3>

        <div id="searchbarDiv">
        <span class="material-symbols-outlined">
        search
        </span>
          <input type="text" placeholder="Search By Name" onkeyup="searchPostOffice()" id="searchBox" />
        </div>

        <div id="postalCardDiv"></div>`;

      postalCardDiv = document.getElementById("postalCardDiv");

      return response.PostOffice;
    })
    .then((data) => {
      console.log(data);

      postofficeData = data;

      data.forEach((element) => {
        console.log(element);

        postalCardDiv.innerHTML += ` <div class="card">
            <div>Name : ${element.Name}</div>
            <div>Branch Type : ${element.BranchType}</div>
            <div>Delivery Status : ${element.DeliveryStatus}</div>
            <div>District : ${element.District}</div>
            <div>Division : ${element.Division}</div>
          </div>`;
      });
    })
    .catch(() => {
      alert("Problem with fetching data");
    });
}

function searchPostOffice() {
  postalCardDiv.innerHTML = "";
  var searchValue = document.getElementById("searchBox").value;

  var filteredPostOffice = postofficeData.filter((item) => {
    var stringifiedItem = JSON.stringify(item);

    return stringifiedItem.toLowerCase().includes(searchValue.toLowerCase());
  });

  filteredPostOffice.forEach((element) => {
    postalCardDiv.innerHTML += ` <div class="card">
            <div>Name : ${element.Name}</div>
            <div>Branch Type : ${element.BranchType}</div>
            <div>Delivery Status : ${element.DeliveryStatus}</div>
            <div>District : ${element.District}</div>
            <div>Division : ${element.Division}</div>
            </div>`;
  });
}

getUserIp();
