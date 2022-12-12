let frames_per_second = 60;
let frame_interval = 1000 / frames_per_second;

let previousTime = performance.now();
let delta = 1;

let browserWidth;
let browserHeight;

class Snowflake {
    constructor(element, speed, xPos, yPos) {
        // set initial snowflake properties
        this.element = element;
        this.speed = speed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = 1;

        // declare variables used for snowflake's motion
        this.counter = 0;
        this.sign = Math.random() < 0.5 ? 1 : -1;

        // setting an initial opacity and size for our snowflake
        this.element.style.opacity = (0.1 + Math.random()) / 3;
    }

    // The function responsible for actually moving our snowflake
    update(delta) {
        // using some trigonometry to determine our x and y position
        this.counter += (this.speed / 5000) * delta;
        this.xPos +=
            (this.sign * delta * this.speed * Math.cos(this.counter)) / 40;
        this.yPos += Math.sin(this.counter) / 40 + (this.speed * delta) / 30;
        this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);

        // setting our snowflake's position
        this.setTransform(
            Math.round(this.xPos),
            Math.round(this.yPos),
            this.scale,
            this.element
        );

        // if snowflake goes below the browser window, move it back to the top
        if (this.yPos > window.innerHeight) {
            this.yPos = -50;
        }
    }

    setTransform(xPos, yPos, scale, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
    }
}

export class Snow {
    constructor(count) {
        this.count = count;
        this.snowflakes = [];
        this.resetPosition = false;
        this.generateSnowflakes = this.generateSnowflakes.bind(this);
        this.moveSnowflakes = this.moveSnowflakes.bind(this);
        this.getPosition = this.getPosition.bind(this);
    }

    setup() {
        window.addEventListener(
            "DOMContentLoaded",
            this.generateSnowflakes(),
            false
        );
        window.addEventListener("resize", this.resetSnow(), false);
    }

    generateSnowflakes() {
        // get our snowflake element from the DOM and store it
        let originalSnowflake = document.querySelector(".snowflake");

        // access our snowflake element's parent container
        let snowflakeContainer = originalSnowflake.parentNode;
        snowflakeContainer.style.display = "block";

        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;

        // create each individual snowflake
        for (let i = 0; i < this.count; i++) {
            // clone our original snowflake and add it to snowflakeContainer
            let snowflakeClone = originalSnowflake.cloneNode(true);
            snowflakeContainer.appendChild(snowflakeClone);

            // set our snowflake's initial position and related properties
            let initialXPos = this.getPosition(50, browserWidth);
            let initialYPos = this.getPosition(50, browserHeight);
            let speed = (5 + Math.random() * 40) * delta;

            // create our Snowflake object
            let snowflakeObject = new Snowflake(
                snowflakeClone,
                speed,
                initialXPos,
                initialYPos
            );
            this.snowflakes.push(snowflakeObject);
        }

        // remove the original snowflake because we no longer need it visible
        snowflakeContainer.removeChild(originalSnowflake);

        requestAnimationFrame(this.moveSnowflakes);
    }

    getPosition(offset, size) {
        return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
    }

    moveSnowflakes(currentTime) {
        delta = (currentTime - previousTime) / frame_interval;

        for (let i = 0; i < this.snowflakes.length; i++) {
            let snowflake = this.snowflakes[i];
            snowflake.update(delta);
        }

        previousTime = currentTime;

        // Reset the position of all the snowflakes to a new value
        if (this.resetPosition) {
            browserWidth = document.documentElement.clientWidth;
            browserHeight = document.documentElement.clientHeight;

            for (let i = 0; i < this.snowflakes.length; i++) {
                let snowflake = this.snowflakes[i];

                snowflake.xPos = this.getPosition(50, browserWidth);
                snowflake.yPos = this.getPosition(50, browserHeight);
            }

            this.resetPosition = false;
        }

        requestAnimationFrame(this.moveSnowflakes);
    }

    resetSnow() {
        this.resetPosition = true;
    }
}
