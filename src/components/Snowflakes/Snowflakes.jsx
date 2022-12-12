import React, { useLayoutEffect } from "react";
import { Snow } from "./Snow.utils";

import "./Snowflakes.css";

const Snowflakes = () => {
    useLayoutEffect(() => {
        const snow = new Snow(100);
        snow.setup();
    }, []);

    return (
        <div className="snow">
            <span className="snowflake" />
        </div>
    );
};

export default Snowflakes;
