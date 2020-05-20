import React, { Fragment, useEffect, useState } from "react";

export default function StudyCardFront({ id, side }) {
    const [attachment, setAttachment] = useState(null);
    const [imageExpanded, expandImage] = useState(false);

    useEffect(() => {
        let src = "";
        let srcType = "";

        if (side.attachment) {
            const { blob, url, type } = side.attachment;
            srcType = blob ? "blob": "url";
            src = blob ? URL.createObjectURL(blob) : url;

            setAttachment({
                id,
                src,
                mediaType: type,
                type: srcType
            });
        }
        else {
            setAttachment(null);
        }

        return () => {
            if (srcType === "blob") {
                URL.revokeObjectURL(src);
            }
        };
    }, [id]);

    function renderAttachment() {
        if (!attachment || attachment.id !== id) {
            return null;
        }
        const { mediaType, src } = attachment;

        if (mediaType === "image") {
            return <img src={src} alt="" className="study-image" onClick={showImage}/>;
        }
        else if (mediaType === "audio") {
            return <audio src={src} className="study-audio" controls></audio>;
        }
        else if (mediaType === "video") {
            return <video src={src} className="study-video" crossOrigin="anonymous" autoPlay controls></video>;
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
            {renderAttachment()}
            {side.text && (
                <div className="study-front-text" style={{ fontSize: `${side.textSize}px` }}>{side.text}</div>
            )}
            {imageExpanded && (
                <div className="mask study-expaned-image-mask" onClick={hideImage}>
                    <img src={attachment.src} className="study-expaned-image" alt=""/>
                </div>
            )}
        </Fragment>
    );
}
