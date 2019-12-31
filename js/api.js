var base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
var request = new Request(base_url + "competitions/2015/standings", {
    headers: new Headers({
        'X-Auth-Token' : '37209e11774845f298285ae0df906655'
    })
});
// Blok kode untuk melakukan request data json
function getArticles() {
fetch(base_url, {
    headers: {
        'X-Auth-Token' : '37209e11774845f298285ae0df906655'
    }
})
    .then(res => {
      if (res.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText))
        } else {
            return Promise.resolve(res)
  }
})
    .then(res => res.json())
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.result.forEach(function(team) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.name}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${team.shortName}</span>
                  <p>${team.address}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(err => {
        console.log(err)
});
}