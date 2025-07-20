---
title: File Type Tool
type: default
sidebar:
  exclude: true
---

<style>
.container {
    width: 100%;
    max-width: 680px; /* 800 */
    text-align: center;
    margin: 0 auto;
}

.dropzone {
    border: 2px dashed #ccc;
    font-size: 1.25rem; /* 20 */
    position: relative;
    padding: 100px 20px;
    cursor: pointer;
}

.box__icon {
    width: 100%;
    height: 80px;
    display: block;
    margin-bottom: 40px;
}
</style>

## Description

TODO

#### Tool:

<div class="container">
    <div class="dropzone" id="dropzone">
        <img
            class="box__icon"
            src="./OOjs_UI_icon_upload-progressive.svg"
            width="50"
            height="43"
            viewBox="0 0 50 43"
        />
        <p id="dropzone-label">Choose or drag & drop some files.</p>
    </div>
    <input type="file" multiple name="files" id="fileInput" style="display: none" />
</div>

**Results:**

| File | Mime Type | Description |
| :--- | :-------- | :---------- |

#### Sources:

- [WASMagic](https://github.com/moshen/wasmagic)
- Upload Icon -
  [OOjs UI Team and other contributors](https://phabricator.wikimedia.org/diffusion/GOJU/browse/master/AUTHORS.txt")
  ([MIT license](http://opensource.org/licenses/mit-license.php))
  ([source](https://commons.wikimedia.org/w/index.php?curid=55044854))
- Insipration - CSS Tricks
  [Drag & Drop File Uploading](https://css-tricks.com/drag-and-drop-file-uploading/)

<script type="module" src="main.js"></script>
