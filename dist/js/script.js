/* ----_____----****&&&&****&&&&----_____---- */

document.querySelector(".bottom").style.display = "none";
const btmbtns = document.querySelectorAll(".bottom .btns");
const aside = document.querySelector("aside .desc");
const main = document.querySelector("main ul");
const rated = document.querySelector("main .container ul li .desc .rated");

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
btmbtns.forEach((btn) => {
  // console.log(btn);
  btn.addEventListener("click", (e) => {
    btmbtns.forEach((btx) => btx.classList.remove("active"));
    e.target.classList.add("active");

    mainCall(e.target.dataset.category);
  });
});

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
mainCall("latest");
function mainCall(category) {
  fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=d6f048ecd2cf70348aa05876daef5ff8`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      /* ----_____----****&&&&****&&&&----_____---- */
      /* ----_____----****&&&&****&&&&----_____---- */

      let html = "";
      let firstID = data.results[0].id;
      sidebar(firstID);
      setTimeout(() => {
        pcmp(firstID);
      }, 200);

      if (data.results)
        data.results.map((movie) => {
          let rate = movie.vote_average * 10;

          /* ----_____----****&&&&****&&&&----_____---- */
          /* ----_____----****&&&&****&&&&----_____---- */

          html += `
      <li
      class="
      not-focus
      "
      data-id="${movie.id}">
      <div
      class="
      movie 
      ${movie.adult ? "adult" : "not-adult"}
      ">
      <div class="active"><div>&rarr;</div></div>
      <div class="img">
      <img src="https://image.tmdb.org/t/p/original/${
        movie.backdrop_path
      }" alt="" />
      </div>
      <div class="desc">
      <div class="adult">18</div>
      <h3>${movie.original_title}</h3>
      <div class="released small-title">Released: <span>${
        movie.release_date
      }</span></div>
      <div class="rated small-title">
    <div>Rated:</div>
    <div class="stars"><span class="span" 
    style=" background:linear-gradient( 90deg, rgb(236, 255, 67) ${rate}%, hsl(0, 0%, 55%) ${
            100 - rate
          }% );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent"
  >*****</span></div>
  <div>(${movie.vote_count})</div>
  </div>
  </div>
  </div>
  </li>
  `;
          main.innerHTML = html;

          document.querySelector("main ul li").classList.remove("not-focus");
        });
    })
    .catch(() => {
      noInternet();
    });
}

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */

function sidebar(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d6f048ecd2cf70348aa05876daef5ff8`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      /* ----_____----****&&&&****&&&&----_____---- */
      /* ----_____----****&&&&****&&&&----_____---- */
      /* ----_____----****&&&&****&&&&----_____---- */
      /* ----_____----****&&&&****&&&&----_____---- */

      let rate = data.vote_average * 10;
      aside.innerHTML = `
      <h2>${data.original_title}</h2>
      <h3>${data.tagline}</h3>
      <div class="rated small-title"><div>Rated:</div>
      <div class="stars">
            <span class="span" style=" background:linear-gradient( 90deg, hsl(66, 100%, 63%) ${rate}%, hsl(0, 0%, 55%) ${
        100 - rate
      }% ); 
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent">*****</span></div>
        <div>(${data.vote_count})</div></div>
        <div class="released small-title">Released: <span>${
          data.release_date
        }</span></div>
        <div class="small-title">Budjet: <span>${parseFloat(
          data.budget
        ).toLocaleString("en")}</span></div>
          <div class="small-title">Revenue: <span>${parseFloat(
            data.revenue
          ).toLocaleString("en")}</span></div>
          <div class="small-title pcmp">
          Production companies:
          <ul>
          </ul>
          </div>
          <div class="detail">
          
          </div>
          description: <br />
          <p>
          ${data.overview}
          </p>
          </div>`;
    });
}

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */

const movies = document.querySelectorAll("main ul li .movie img");
movies.forEach((movie) => {
  movie.addEventListener("click", (e) => {
    if (e.target === img) console.log("movie");
  });
});

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */

setTimeout(() => {
  main.addEventListener("click", (e) => {
    const mainli = document.querySelectorAll("main ul li");
    mainli.forEach((li) => {
      li.classList.add("not-focus");
    });

    const li = e.target.closest("li");
    li.classList.remove("not-focus");

    /* ----_____----****&&&&****&&&&----_____---- */
    /* ----_____----****&&&&****&&&&----_____---- */

    sidebar(li.dataset.id);
    setTimeout(() => {
      pcmp(li.dataset.id);
    }, 200);
  });
}, 2000);

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */

function pcmp(id) {
  let pcm = document.querySelector(".pcmp ul");
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d6f048ecd2cf70348aa05876daef5ff8`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.production_companies.map((proC) => {
        pcm.innerHTML += `<li>${proC.name}</li>`;
      });
    });
}

/* ----_____----****&&&&****&&&&----_____---- */
/* ----_____----****&&&&****&&&&----_____---- */
function noInternet() {
  setTimeout(() => {
    main.innerHTML = `<h2 style="margin-left:20px;">Please connect to internet!<h2>`;
  }, 100);
}
