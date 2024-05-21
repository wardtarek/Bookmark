var siteName = document.getElementById("siteInput");
var siteUrl = document.getElementById("urlInput");
var subBtn = document.getElementById("subBtn");
var List = [];
const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};
if (localStorage.getItem("dataArray") != null) {
  List = JSON.parse(localStorage.getItem("dataArray"));
  displaySite();
}
function addSite() {
  if (validationSite() && validationName()) {
    var site = {
      name: siteName.value,
      Url: siteUrl.value,
    };
    List.push(site);
    localStorage.setItem("dataArray", JSON.stringify(List));
    displaySite();
    clearInput();
  }
}
function validationName() {
  if (siteName.value.length >= 3) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    subBtn.removeAttribute("data-bs-toggle");
    subBtn.removeAttribute("data-bs-target");
    return true;
  } else {
    subBtn.setAttribute("data-bs-toggle", "modal");
    subBtn.setAttribute("data-bs-target", "#exampleModal");
    siteName.classList.add("is-invalid");
    return false;
  }
}
function validationSite() {
  if (isValidUrl(siteUrl.value)) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
    subBtn.removeAttribute("data-bs-toggle");
    subBtn.removeAttribute("data-bs-target");
    return true;
  } else {
    subBtn.setAttribute("data-bs-toggle", "modal");
    subBtn.setAttribute("data-bs-target", "#exampleModal");
    siteUrl.classList.add("is-invalid");
    return false;
  }
}

function displaySite() {
  var temp = "";
  for (var i = 0; i < List.length; i++) {
    if (isValidUrl(List[i].Url) && List[i].name.length >= 3) {
      temp +=
        `<tr>
            <td>` +
        Number(i + 1) +
        `</td>
            <td>` +
        List[i].name +
        `</td>
            <td><button class="btn btn-success fw-semibold px-4"><a class="text-white text-decoration-none" target="_blank"  href="` +
        List[i].Url +
        `"><i class="fa-solid fa-eye me-2"></i>Visit</a></button></td>
            <td><button onclick="remove(` +
        i +
        `)" class="btn btn-danger fw-semibold px-3"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        </tr>`;
    }
  }
  document.getElementById("demo").innerHTML = temp;
}
// function displaySite() {
//   var temp = "";
//   for (var i = 0; i < List.length; i++) {
//     if (isValidUrl(List[i].Url) && List[i].name.length >= 3) {
//       temp +=
//         `<tr>
//             <td>` +
//         Number(i + 1) +
//         `</td>
//             <td>` +
//         List[i].name +
//         `</td>
//             <td><button class="btn btn-success fw-semibold px-4"><a class="text-white text-decoration-none" target="_blank"  href="` +
//         List[i].Url +
//         `"><i class="fa-solid fa-eye me-2"></i>Visit</a></button></td>
//             <td><button onclick="remove(` +
//         i +
//         `)" class="btn btn-danger fw-semibold px-3"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
//         </tr>`;
//       siteUrl.classList.remove("is-invalid");
//       siteName.classList.remove("is-invalid");
//       document.getElementById("item").style.display = "none";
//       document.getElementsByClassName("modal-backdrop").style =
//         "opacity:0;--bs-backdrop-zindex: -2;";
//     } else if (!isValidUrl(List[i].Url) && List[i].name.length < 3) {
//       remove(i);
//       siteUrl.classList.add("is-invalid");
//       siteName.classList.add("is-invalid");
//       document.getElementById("exampleModal").style.backgroundColor = "#0007";
//       document.getElementById("item").style.display = "block";
//       document.getElementsByClassName("modal-backdrop").style =
//         "opacity:1;--bs-backdrop-zindex: 2;";
//     } else if (isValidUrl(List[i].Url) && List[i].name.length < 3) {
//       remove(i);
//       siteUrl.classList.remove("is-invalid");
//       siteName.classList.add("is-invalid");
//       document.getElementById("exampleModal").style.backgroundColor = "#0007";
//       document.getElementById("item").style.display = "block";
//       document.getElementsByClassName("modal-backdrop").style =
//         "opacity:1;--bs-backdrop-zindex: 2;";
//     } else {
//       remove(i);
//       siteUrl.classList.add("is-invalid");
//       siteName.classList.remove("is-invalid");
//       document.getElementById("exampleModal").style.backgroundColor = "#0007";
//       document.getElementById("item").style.display = "block";
//       document.getElementsByClassName("modal-backdrop").style =
//         "opacity:1;--bs-backdrop-zindex: 2;";
//     }
//   }
//   document.getElementById("demo").innerHTML = temp;
// }
function remove(x) {
  List.splice(x, 1);
  localStorage.setItem("dataArray", JSON.stringify(List));
  displaySite();
}
function clearInput() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}
