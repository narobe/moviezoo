/* ********************************************* */

const aside = document.querySelector("aside .desc");
// const pcm = document.querySelector("aside .production ul");
const main = document.querySelector("main ul");

const rated = document.querySelector("main .container ul li .desc .rated");

/* ********************************************* */
/* ********************************************* */
/* ********************************************* */
/* ********************************************* */

fetch("https://api.themoviedb.org/3/movie/popular?api_key=d6f048ecd2cf70348aa05876daef5ff8")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    /* ********************************************* */
    /* ********************************************* */

    let html = "";
    let firstID = data.results[0].id;
    sidebar(firstID);

    if (data.results)
      data.results.map((movie) => {
        let rate = movie.vote_average * 10;

        /* ********************************************* */
        /* ********************************************* */

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
      <div class="adult">18 <span>+</span></div>
      <h3>${movie.original_title}</h3>
      <div class="released">Released: <span>${movie.release_date}</span></div>
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
  });

/* ********************************************* */
/* ********************************************* */
/* ********************************************* */
/* ********************************************* */

function sidebar(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d6f048ecd2cf70348aa05876daef5ff8`
  )
    // fetch(`../detail${id}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      /* ********************************************* */
      /* ********************************************* */
      /* ********************************************* */
      /* ********************************************* */

      // console.log(data);
      // data.production_companies.forEach((proC) => {
      //   console.log(proC.name);
      //   pcm.innerHTML += "<li>" + proC.name + "<li/>";
      // pcm.innerHTML += "<li>" + proC.name + "<li/>";
      // });
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
        
        <div class="small-title">Budjet: <span>${parseFloat(
          data.budget
        ).toLocaleString("en")}</span></div>
          <div class="small-title">Revenue: <span>${parseFloat(
            data.revenue
          ).toLocaleString("en")}</span></div>
  <!--<div class="small-title">
          Production companies:
      <ul>
      </ul>
      </div>-->
      <div class="detail">
      
      </div>
      description: <br />
      <p>
        ${data.overview}
        </p>
        </div>`;
    });
}

// ${data.production_companies.map((proC) => {
//   pcm.innerHTML += `<li>${proC.name}</li>`;
// })}

/* ********************************************* */
/* ********************************************* */
/* ********************************************* */
/* ********************************************* */

const movies = document.querySelectorAll("main ul li .movie img");
movies.forEach((movie) => {
  movie.addEventListener("click", (e) => {
    if (e.target === img)
      // e.style.display = "none";
      console.log("movie");
    // movie.classList.remove("not-focus");
  });
});

/* ********************************************* */
/* ********************************************* */
/* ********************************************* */
/* ********************************************* */

setTimeout(() => {
  main.addEventListener("click", (e) => {
    const mainli = document.querySelectorAll("main ul li");
    mainli.forEach((li) => {
      li.classList.add("not-focus");
    });

    const li = e.target.closest("li");
    li.classList.remove("not-focus");

    /* ********************************************* */
    /* ********************************************* */

    sidebar(li.dataset.id);
  });
}, 2000);
