# React Native Manual (.mobi, .epub)

Current version of React Native in the docs: **0.25.1**

Based on the repo <https://github.com/zeMirco/nodejs-pdf-docs>

Non official.

## Create your own files

You need to have [pandoc](http://johnmacfarlane.net/pandoc/) installed on your system. All the markdown files from the
[node repository](https://github.com/joyent/node) should be placed inside the markdown folder.

### Create .epub

1. Run `node epub.js <version>` to create the file

### Create .mobi

The .mobi version is created from the .epub file which gives better results compared to converting the .pdf file.

1. Download `kindlegen` from this repository or directly from [Amazon](http://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000234621)
2. Run `node mobi.js` to create the file. The file is located inside the epub folder

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
