class Snowflake {
    constructor(element, speed) {
        this.element = element;
        this.speed = speed;

        this.element.style.animationDelay = `${Math.random() * 2}s`;
        this.element.style.animationDuration = `${20 + Math.random() * speed}s`;
        this.element.style.left = `${Math.random() * window.innerWidth}px`;
        this.element.style.top = `-${
            Math.random() * window.innerHeight + 50
        }px`;
        this.element.style.opacity = (0.1 + Math.random()) / 2;
    }
}

export class Snow {
    constructor(count) {
        this.count = count;
        this.snowflakes = [];
        this.resetPosition = false;
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
        let originalSnowflake = document.querySelector(".snowflake");

        let snowflakeContainer = originalSnowflake.parentNode;
        snowflakeContainer.style.display = "block";

        for (let i = 0; i < this.count; i++) {
            let snowflakeClone = originalSnowflake.cloneNode(true);
            snowflakeContainer.appendChild(snowflakeClone);

            let speed = 5 + Math.random() * 40;

            let snowflakeObject = new Snowflake(snowflakeClone, speed);
            this.snowflakes.push(snowflakeObject);
        }

        snowflakeContainer.removeChild(originalSnowflake);
    }

    resetSnow() {
        this.resetPosition = true;
    }
}
