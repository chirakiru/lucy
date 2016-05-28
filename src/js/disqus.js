var url = 'unrespiroamiciudad.com';
var identifier = window.location.href.split('/')[6];
console.log(identifier);
var disqus_config = function () {
    this.page.url = url;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = identifier; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
(function() {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');

    s.src = '//unrespiroamiciudad.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();