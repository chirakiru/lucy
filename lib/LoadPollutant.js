var fs = require('fs');

function LoadPollutant() {
  FetchPollutantInfo();
}

function JoinReferences(obj){
  return obj.map(function(item) { return `<li><a href='${item.link}'>${item.title}</a></li>`}).join('')
}

function BuildContent(obj){
  template = fs.readFileSync('./src/pollutants/pollutant_template.html', 'utf8')

  content = `<div class='pollutant'>
    <div class='container' style='margin-bottom: 50px;'> 
      <div class='col-md-12 description'> 
        <h1>¿Qué es?</h1> 
        <p>${obj.description}</p> 
      </div> 
      <div class='col-md-6 origin'> 
        <h1>Origen</h1> 
        <p>${obj.origin}</p> 
      </div> 
      <div class='col-md-6 health'> 
        <h1>Efectos en la salud</h1> 
        <p>${obj.health}</p> 
      </div>
      <div class='col-md-12 references'>
        <h1>Referencias</h1>
        <ul>
          ${JoinReferences(obj.references)}
        </ul>
      </div>
    </div> 
  </div>`;
  template = template.replace("<!-- TITLE POLLUTANT -->", `<h2 style='font-size: 4em;'>${obj.pollutant}</h2>`);
  template = template.replace("<!-- POLLUTANT CONTENT -->", content);
  return template;
}

function FetchPollutantInfo() {
  // Load pollutant.json
  pollutants = JSON.parse(fs.readFileSync('./src/data/pollutants.json', 'utf8'));
  pollutants.map(function(obj){
    // Create pollutants html files
    fs.writeFile("./src/pollutants/" + obj.shortcut + ".html", BuildContent(obj), function(err) {
      if(err) {
          return console.log(err);
      }
    });
  }); 
};

module.exports = LoadPollutant