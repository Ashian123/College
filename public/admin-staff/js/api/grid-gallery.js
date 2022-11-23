const root = document.querySelector("body, html");
const galWindow = document.querySelector(".features");

var from = 0;
var to = 1;
// const gallery = document.getElementById("photo_gallery");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);
const lastimageObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];

    if (!lastCard.isIntersecting) return;

    getGallery(from, to);
    lastimageObserver.unobserve(lastCard.target);
  },
  { rootMargin: "50px" }
);
onload = () => {
  gridGallery({
    selector: ".dark",
    darkMode: true,
    // layout: "square",
    gapLength: 8,
    rowHeight: 180,
    columnWidth: 280,
  });
  getGallery(from, to);
};
function getGallery(from = 0, to = 1) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/getGallery", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(this.responseText);

      if (!data.length) return;
      for (let i = 0; i < data.length; i++) {
        appendNewImage(data[i]["pic_url"]);
      }
    }
  };
  limit = { from, to };
  xhr.send("limit=" + JSON.stringify(limit));
}
function appendNewImage(url) {
  var image = document.createElement("img");
  image.classList = "GalWindow";
  image.loading = "lazy";
  image.src = `/Gallery/${url}`;
  image.setAttribute("onclick", "viewthis(this);");
  galWindow.append(image);
  observer.observe(image);
  lastimageObserver.observe(document.querySelector(".GalWindow:last-child"));
  increase();
}
function increase() {
  from = to;
  to += 1;
}
// for Upload an image
function Upload_image() {
  var image = document.getElementById("gallery_image");
  let data = new FormData();

  data.append("name", image.files[0]);

  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", "/admin/upload-Image-To-Gallery", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = this.responseText;

      displaymsg(data);
      document.getElementById("gallery_image").value = "";
      document.getElementById("gallery_image_name").value = "";
      from = 0;
      to = 1;
      galWindow.innerHTML = null;
      getGallery(from, to);
    }
  };

  xhr.send(data);
}

function displaymsg(response) {
  i = 0;
  var data = "";
  var time = setInterval(() => {
    document.getElementById("displaymsg").innerText = data += response[i++];

    data.length == response.length ? clearInterval(time) : "";
  }, 20);
  setTimeout(function () {
    document.getElementById("displaymsg").innerHTML = null;
  }, 4000);
}

function viewthis(param) {
  var container = document.querySelector(".gg-container");
  var images = document.querySelectorAll(".gg-box > img");
  var l = images.length;
  var currentImg = param;
  console.log(images[0]);
  const parentItem = currentImg.parentElement,
    screenItem = document.createElement("div");
  screenItem.id = "gg-screen";
  container.prepend(screenItem);
  if (parentItem.hasAttribute("data-theme"))
    screenItem.setAttribute("data-theme", "dark");
  var route = currentImg.src;
  root.style.overflow = "hidden";
  screenItem.innerHTML =
    '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
  const first = images[0].src,
    last = images[l - 1].src;
  const imgItem = document.querySelector(".gg-image"),
    prevBtn = document.querySelector(".gg-prev"),
    nextBtn = document.querySelector(".gg-next"),
    close = document.querySelector(".gg-close");
  imgItem.innerHTML = '<img src="' + route + '">';

  if (l > 1) {
    if (route == first) {
      prevBtn.hidden = true;
      var prevImg = false;
      var nextImg = currentImg.nextElementSibling;
    } else if (route == last) {
      nextBtn.hidden = true;
      var nextImg = false;
      var prevImg = currentImg.previousElementSibling;
    } else {
      var prevImg = currentImg.previousElementSibling;
      var nextImg = currentImg.nextElementSibling;
    }
  } else {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
  }

  screenItem.addEventListener("click", function (e) {
    if (e.target == this || e.target == close) hide();
  });

  root.addEventListener("keydown", function (e) {
    if (e.keyCode == 37 || e.keyCode == 38) prev();
    if (e.keyCode == 39 || e.keyCode == 40) next();
    if (e.keyCode == 27) hide();
  });

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  function prev() {
    prevImg = currentImg.previousElementSibling;
    imgItem.innerHTML = '<img src="' + prevImg.src + '">';
    currentImg = currentImg.previousElementSibling;
    var mainImg = document.querySelector(".gg-image > img").src;
    nextBtn.hidden = false;
    prevBtn.hidden = mainImg === first;
  }

  function next() {
    nextImg = currentImg.nextElementSibling;
    imgItem.innerHTML = '<img src="' + nextImg.src + '">';
    currentImg = currentImg.nextElementSibling;
    var mainImg = document.querySelector(".gg-image > img").src;
    prevBtn.hidden = false;
    nextBtn.hidden = mainImg === last;
  }

  function hide() {
    root.style.overflow = "auto";
    screenItem.remove();
  }
}

function gridGallery(options) {
  if (options.selector) selector = document.querySelector(options.selector);
  if (options.darkMode) selector.setAttribute("data-theme", "dark");
  if (options.layout == "horizontal" || options.layout == "square")
    selector.setAttribute("data-layout", options.layout);
  if (options.gaplength)
    selector.style.setProperty("--gap-length", options.gaplength + "px");
  if (options.rowHeight)
    selector.style.setProperty("--row-height", options.rowHeight + "px");
  if (options.columnWidth)
    selector.style.setProperty("--column-width", options.columnWidth + "px");
}
