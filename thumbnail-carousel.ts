class ThumbnailCarousel {
    constructor(args) {
        this.data = args.data;
        this.container = document.querySelector(args.container);
        
        if (args.columns) {
            this.columns = args.columns;
        } else {
            this.columns = 4;
        }

        if (args.rows) {
            this.rows = args.rows;
        } else {
            this.rows = 2;
        }

        // define constants for carousel
        this.containerWidth = this.container.offsetWidth;
        this.itemsPerGroup = this.rows * this.columns;
        this.leftPos = 0;
        this.index = 0;
        this.totalGroups = Math.ceil(this.data.length/this.itemsPerGroup);
        this.carouselWidth = this.totalItems * this.containerWidth;
        this.clickDisabled = false; // navigation flag, enable navigation by default

        this.carouselHtml();
        this.bindData();
        this.updateSize();
        this.carouselEvents();
    }

    carouselHtml() {
        // append carousel html
        this.container.innerHTML += `
            <div id="thumbnail-carousel-container">
                <div class="thumbnail-carousel-nav thumbnail-carousel-nav-left">
                    <i class="icon icon-chevron-left" aria-hidden="true"></i>
                </div>
                <div class="thumbnail-carousel-nav thumbnail-carousel-nav-right">
                    <i class="icon icon-chevron-right" aria-hidden="true"></i>
                </div>
                <div class="thumbnail-carousel" id="thumbnail-carousel-ajax"></div>
            </div>
        `;
    }

    bindData() {
        this.carousel = document.querySelector('#thumbnail-carousel-container .thumbnail-carousel');

        for (let i=0; i<this.totalGroups; i++) {
            this.carousel.innerHTML += `
                <div class="thumbnail-group thumbnail-group${i}">
                    <ul></ul>
                </div>
            `;

            for (let j=0; j<this.itemsPerGroup; j++) {
                let dataIndex = (this.itemsPerGroup * i) + j,
                    thisGroup = document.querySelector(`#thumbnail-carousel-container .thumbnail-group${i} ul`);

                if (dataIndex < this.data.length) {
                    thisGroup.innerHTML += `
                        <li>
                            <div class="thumbnail-img">
                                <img src="${this.data[dataIndex]}" />
                            </div>
                        </li>
                    `;
                }
            }
        }
    }

    updateSize() {
        // update container width and carousel width
        this.containerWidth = this.container.offsetWidth;
        // carousel is wider than sum of groups to prevent row break on window resize
        this.carouselWidth = (this.totalGroups + 1) * this.containerWidth;

        // select all thumbnail groups
        let groups = document.querySelectorAll('#thumbnail-carousel-container .thumbnail-group'),
            items = document.querySelectorAll('#thumbnail-carousel-container .thumbnail-group li'),
            thumbnail = document.querySelectorAll('#thumbnail-carousel-container .thumbnail-img'),
            groupPadding = 100,
            groupWidth = this.containerWidth - groupPadding,
            itemWidth = (90 / this.columns), // 90% of group width over number of cols
            itemMargin = (10 / (2 * this.columns)), // math for gutters
            thumbnailHeight = 0.9 * (groupWidth / this.columns);

        // update carousel width
        this.carousel.style.width = this.carouselWidth;
        // set carousel left position
        this.leftPos = -this.containerWidth * this.index;
        // update carousel position
        this.carousel.style.left = this.leftPos;

        // iterate over groups
        for (let i=0; i<groups.length; i++) {
            // match thumbnail group width to ibox width
            groups[i].style.width = groupWidth;
        }

        // iterate over items
        for (let i=0; i<items.length; i++) {
            items[i].style.width = `${itemWidth}%`;
            items[i].style.margin = `10px ${itemMargin}%`;

            thumbnail[i].style.height = `${thumbnailHeight}px`;
        }
    }

    navigate(el) {
        let navLeft = document.querySelector('#thumbnail-carousel-container .thumbnail-carousel-nav-left'),
            navRight = document.querySelector('#thumbnail-carousel-container .thumbnail-carousel-nav-right');

        // if flagged
        if (this.clickDisabled) {
            return; // prevent navigation
        } else {
            // if left arrow clicked and not first group
            if (el.classList.contains('thumbnail-carousel-nav-left') && this.index > 0) {
                // decrement page index
                this.index -= 1;
            } else if (el.classList.contains('thumbnail-carousel-nav-right') && this.index < (this.totalGroups - 1)) {
                // increment page index
                this.index += 1;
            }

            if (this.index === 0 && this.index < (this.totalGroups - 1)) {
                // blur left arrow
                navLeft.style.opacity = 0.1;
                navLeft.style.cursor = 'not-allowed';
                // show right arrow
                navRight.style.opacity = 1;
                navRight.style.cursor = 'pointer';
            // if last group
            } else if (this.index === (this.totalGroups - 1)) {
                // show left arrow
                navLeft.style.opacity = 1;
                navLeft.style.cursor = 'pointer';
                // blur right arrow
                navRight.style.opacity = 0.1;
                navRight.style.cursor = 'not-allowed';
            } else {
                // show both arrows
                navLeft.style.opacity = 1;
                navLeft.style.cursor = 'pointer';
                navRight.style.opacity = 1;
                navRight.style.cursor = 'pointer';
            }

            // set carousel left position
            this.leftPos = -this.containerWidth * this.index;

            // shift carousel
            this.carousel.style.left = this.leftPos;

            // disable navigation while transitioning
            this.clickDisabled = true;

            // re-enable navigation after transition
            setTimeout(function() {
                this.clickDisabled = false;
            }.bind(this), 800);
        }
    }

    carouselEvents() {
        let carouselNav = document.querySelectorAll('#thumbnail-carousel-container .thumbnail-carousel-nav');

        window.onresize = () => {
            this.updateSize();
        }

        // on L/R arrow click
        for (let i=0; i<carouselNav.length; i++) {
            carouselNav[i].addEventListener('click', () => {
                this.navigate(carouselNav[i]);
            });
        }
    }
}