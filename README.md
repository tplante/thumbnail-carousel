# thumbnail-carousel
A lightweight carousel that scrolls through tiled images

![screenshot from 2017-08-22 16-07-19](https://user-images.githubusercontent.com/8583137/29591583-31d076d6-8754-11e7-9c4c-adad71a4e6b6.png)

## Instructions
1. include files from the dist folder in your project
2. link to *thumbnail-carousel.css* and *thumbnail-carousel.min.js* on a page where you would like to include a carousel
3. create a container for your carousel using a block-style html element (e.g., div or section)
4. create an instance of the ThumbnailCarousel object between script tags or in a separate js file, like so:

```javascript
    let carousel = new ThumbnailCarousel({
        data: ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg','img/11.jpg'],
        container: '#container',
        columns: 5,
        rows: 1
    });
```

## Example
If you run into any problems, try downloading *sample.html* and opening it in your browser. You'll also need the /img directory and /dist directory, as it references files there

## Carousel parameters
* **data**: the data argument takes an array of images, which can be local files in your project or images from the web
* **container**: the class or id of your carousel container element
* **columns** (optional, default 4): the number of thumbnails you want in each row of your carousel
* **rows** (optional, default 2): the number of thumbnails you want in each column of your carousel

## Customization
If you want to edit this plugin, install the project dependencies found in package.json (you can do this by running npm install in your project directory). Run 'gulp' in your project directory to compile typescript and sass, minify javascript, and watch for changes.
