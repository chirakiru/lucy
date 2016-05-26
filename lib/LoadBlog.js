var marked = require("marked"),
    fs = require('fs'),
    YAML = require('yamljs');

function BuildBlog(){
  return FetchBlogPosts(); 
}

function FetchBlogPosts(){
  var template = fs.readFileSync('./src/templates/blog.html', 'utf8')
  dirname = './src/posts/'
  fs.readdir(dirname, function(err, filenames) {
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (filename != '.DS_Store') {
          re = /^---\n([\s\S\n]*)\n---\n*([\s\S\n]*)$/m
          post = re.exec(content)
          template = BuildBlogIndex(template, post[1]);
          CreateIndex(template);
          BuildSingle(post[1], post[2]);
        }
      });
    });
  });
}

function BuildBlogIndex(template, item){
  frontMatter = YAML.parse(item)
  var dir = YearFolder(frontMatter.date)+"/"+MonthFolder(frontMatter.date)
  var blogItem = `<div class="col-md-6 blog-grids">
      <div class="blog-img">
        <a href="${dir}/${slug(frontMatter.title)}.html"> <img src="/images/${frontMatter.image}" class="img-responsive zoom-img" alt=""/></a>
      </div>
      <h4><a href="${dir}/${slug(frontMatter.title)}.html">${frontMatter.title}</a></h4>
      <p class="snglp">Creado por ${frontMatter.author}. Publicado el ${frontMatter.date.toLocaleDateString()} &nbsp;&nbsp;</p>
      <p>${frontMatter.description}</p>
      <div class="more more2">
        <a href="${dir}/${slug(frontMatter.title)}.html" class="button-pipaluk button--inverted"> Leer Más</a>
      </div>
    </div>
    <!-- BLOG ITEM -->`
  template = template.replace("<!-- BLOG ITEM -->", blogItem);
  return template;
}

function BuildSingle(frontMatter, content){
  frontMatter = YAML.parse(frontMatter)
  var post_template = fs.readFileSync('./src/templates/single-post.html', 'utf8')
  var title   = frontMatter.title
  var content = `<img class="img-responsive center-block" src="/images/${frontMatter.image}" alt=""/>
  ${marked(content)}`
  var author  = `<h5>Escrito por ${frontMatter.author}</h5>`
  var og_image = `<meta property="og:description" content="${frontMatter.description}" />
  <meta property="og:image" content="http://unrespiroamiciudad.com/images/${frontMatter.image}" />
  <meta property="og:image:width" content="600" />
  <meta property="og:image:height" content="375" />`

  post_template = post_template.replace("<!-- IMAGE IO-->", og_image);
  post_template = post_template.replace("<!-- POST TITLE -->", title);
  post_template = post_template.replace("<!-- POST CONTENT -->", content);
  post_template = post_template.replace("<!-- ADMIN CONTENT -->", author);

  var dir = "./src/blog/"+YearFolder(frontMatter.date)+"/"+MonthFolder(frontMatter.date)

  fs.writeFile(dir+"/"+slug(frontMatter.title)+".html", post_template, function(err) {
    if(err) {
      console.log(err)
    }
  });
}

function CreateIndex(blogIndex){
  fs.writeFile("./src/blog/index.html", blogIndex, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

function slug(title) { 
  return title.split(' ').map(function(w) { return w.replace(/\W/g, "").toLowerCase() }).join('-') 
}

function BlogFolder() {
  var dir = "./src/blog/"
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
  }
}

function YearFolder(time) { 
  BlogFolder();
  var year = time.getFullYear()
  var dir = "./src/blog/"+year
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
  }
  return year
}

function MonthFolder(time) { 
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var dir = "./src/blog/"+year+"/"+month
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
  }
  return month
}

module.exports = BuildBlog