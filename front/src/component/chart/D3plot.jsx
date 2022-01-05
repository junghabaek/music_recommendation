import React from "react";

const D3plot = () => {
    const iframePart = () => {
        return {
            __html: '<iframe src="./pca.html" width="1600px" height="100%"></iframe>',
        };
    };

    return <div dangerouslySetInnerHTML={iframePart()} />;
};

export default D3plot;
