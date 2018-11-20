var fs = require('fs')
var conversion = require("phantom-html-to-pdf")({
    phantomPath: require("phantomjs-prebuilt").path,
    timeout: 5000
});
conversion({ url: "http://127.0.0.1:8080/index.html" }, function (err, pdf) {
    var output = fs.createWriteStream('./output.pdf')
    console.log(pdf.logs);
    console.log(pdf.numberOfPages);
    // since pdf.stream is a node.js stream you can use it
    // to save the pdf to a file (like in this example) or to
    // respond an http request.
    pdf.stream.pipe(output);
});