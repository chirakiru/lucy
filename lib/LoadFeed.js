var fs = require('fs'),
  RSS = require('rss'),
  YAML = require('yamljs');

function BuildFeedXML(){
  var feed = LoadFeed();
  fs.writeFile("./src/blog/feed.xml", feed.xml(), function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

function LoadFeed(){
  var datetime = new Date();
  console.log(datetime);
  var feed = new RSS({
    title: 'Un Respiro a Mi Ciudad',
    description: 'Tenemos a nuestra ciudad sofocada por la contaminación, estamos a un paso de llegar a una contingencía ambiental, por ello queremos ayudar a entender el tema de la calidad del aire, y a través de campañas ayudar a mejorarla y así poder darnos un respiro de aire puro.',
    feed_url: 'http://unrespiroamiciudad.com/feed.xml',
    site_url: 'http://unrespiroamiciudad.com',
    image_url: 'http://unrespiroamiciudad.com/images/lucy_logo.png',
    docs: 'http://unrespiroamiciudad.com/rss/docs.html',
    managingEditor: 'Ciudadano M',
    webMaster: 'Ciudadano M',
    copyright: '2013 Un Respiro a Mi Ciudad',
    language: 'es',
    pubDate: datetime
  });
  /* loop over data and add to feed */
  dirname = './src/posts/'
  var files = fs.readdirSync(dirname);
  for (var i in files) {
    if (files[i] != '.DS_Store') {
      content = fs.readFileSync(dirname + files[i], 'utf-8')
      re = /^---\n([\s\S\n]*)\n---\n*([\s\S\n]*)$/m
      post = re.exec(content)
      frontMatter = YAML.parse(post[1])
      var dir = DirYear(frontMatter.date)+"/"+DirMonth(frontMatter.date)
      feed.item({
        title: frontMatter.title,
        description: frontMatter.description,
        url: `http://unrespiroamiciudad.com/${dir}/${slug(frontMatter.title)}.html`, // link to the item
        categories: frontMatter.tags, // optional - array of item categories
        author: frontMatter.author, // optional - defaults to feed author property
        date: `${frontMatter.date.toLocaleDateString()}` // any format that js Date can parse.
      });
    }
  }
  return feed
}

function slug(title) { 
  return title.split(' ').map(function(w) { return w.replace(/\W/g, "").toLowerCase() }).join('-') 
}

function DirYear(time) { 
  var year = time.getFullYear()
  return year
}

function DirMonth(time) { 
  var month = time.getMonth() + 1
  return month
}
module.exports = BuildFeedXML