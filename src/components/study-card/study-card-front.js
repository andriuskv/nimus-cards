import React, { Fragment, useEffect, useState } from "react";

export default function StudyCardFront({ id, side }) {
    const [url, setAttachmentUrl] = useState(null);
    const [imageExpanded, expandImage] = useState(false);
    const { attachment, text, textSize } = side;

    useEffect(() => {
        if (attachment) {
            const { file } = attachment;

            setAttachmentUrl(typeof file === "string" ? file : URL.createObjectURL(file));
        }
    }, [id]);

    function renderAttachment() {
        const { type } = attachment;

        if (type === "image") {
            return <img src={url} alt="" className="study-image" onClick={showImage}/>;
        }
        else if (type === "audio") {
            return <audio src={url} className="study-audio" controls></audio>;
        }
        return null;
    }

    function showImage() {
        expandImage(true);
    }

    function hideImage() {
        expandImage(false);
    }

    return (
        <Fragment>
            {attachment && renderAttachment()}
            {text && (
                <div className="study-front-text" style={{ fontSize: `${textSize}px` }}>{text}</div>
            )}
            {imageExpanded && (
                <div className="mask" onClick={hideImage}>
                    <img src={url} className="study-expaned-image" alt="" />
                </div>
            )}
        </Fragment>
    );
}
