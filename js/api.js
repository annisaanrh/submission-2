var base_url = "https://api.football-data.org/v2";
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

// HALAMAN 1 //
var request = new Request(base_url + "/v2/competitions/2002/standings", {
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
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    data.standings["0"].table.forEach(function(item){
        articlesHTML += `
        <table style="font-size:16px center;">
        <thead>
            <tr> 
                <th>Team</th>
                <th></th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Goal Difference</th>
                <th>Goal Against</th>  
                <th>Played Games</th>  
                <th>Points</th>
                <th>Position</th>  
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${item.team.name}</td>
                <td style><img style="width:50px;" src="${item.team.crestUrI}"></td>
                <td>${item.won}</td>    
                <td>${item.draw}</td>
                <td>${item.lost}</td>
                <td>${item.goalDifference}</td>
                <td>${item.goalsAgainst}</td>
                <td>${item.goalsFor}</td>
                <td>${item.playedGames}</td>
                <td>${item.points}</td>
                <td>${item.position}</td>
        
            </tr>
        </tbody>
        </table>
            `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(err => {
        console.log(err)
});
}

// HALAMAN 2 //
var request = new Request(base_url + "/matches", {
    headers: new Headers({
        'X-Auth-Token' : '37209e11774845f298285ae0df906655'
    })
});
// Blok kode untuk melakukan request data json
function getArticles() {
    fetch(request)
        .then(status)
        .then(json)
        .then(function(data){
        console.log(data);
        // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
    var articlesMatches = "";
    data.matches.forEach(function(item){
        articlesMatches += `
        <table style="font-size:16px center;">
        <thead>
            <tr> 
                <th>Team</th>
                <th>Date From</th>
                <th>Date To</th>
                <th>Matches</th>
        </thead>
        <tbody>
            <tr>
                <td>${item.dateFrom}</td>
                <td>${item.dateTo}</td>            
            </tr>
        </tbody>
        </table>
            `;
      });
     // Sisipkan komponen card ke dalam elemen dengan id #content
     document.getElementById("articles").innerHTML = articlesMatches;
    })   
}