// src/components/Page.js
import React from 'react';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="bg-white border shadow-md" ref={ref}>
            <div className="p-8">
                {props.children}
            </div>
        </div>
    );
});

export default Page;