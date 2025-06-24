import React, { HTMLProps } from "react";

const ar = 1.17073171;

export const PaypalIcon = ({ size, ...props }: HTMLProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={typeof size === "number" ? size : "41"}
            height={typeof size === "number" ? size * ar : "48"}
            viewBox={"0 0 41 48"}
            id="paypal"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M34.912 3.62C32.671 1.086 28.622 0 23.44 0H8.405a2.15 2.15 0 0 0-2.128 1.801L.017 41.194a1.284 1.284 0 0 0 1.275 1.48h9.282l2.332-14.67-.073.46a2.143 2.143 0 0 1 2.12-1.802h4.41c8.668 0 15.452-3.492 17.434-13.593.06-.3.154-.874.154-.874.563-3.738-.004-6.275-2.04-8.576zm4.389 10.488c-2.156 9.945-9.03 15.208-19.937 15.208h-3.956L12.458 48h6.416a1.88 1.88 0 0 0 1.86-1.576l.075-.396 1.476-9.273.095-.512a1.877 1.877 0 0 1 1.858-1.576h1.172c7.58 0 13.516-3.056 15.25-11.89.696-3.547.362-6.52-1.359-8.669z"
            ></path>
        </svg>
    );
};

PaypalIcon.displayName = "PaypalIcon";
