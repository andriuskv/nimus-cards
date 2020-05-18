import React, { Fragment, useEffect, useState } from "react";

export default function StudyCardFront({ id, side }) {
    const [attachment, setAttachment] = useState(null);
    const [imageExpanded, expandImage] = useState(false);

    useEffect(() => {
        let url = "";
        let fileType = "";

        if (side.attachment) {
            const { file, type } = side.attachment;
            fileType = typeof file === "string" ? "string": "blob";
            url = fileType === "string" ? file : URL.createObjectURL(file);

            setAttachment({
                id,
                url,
                mediaType: type,
                type: fileType
            });
        }
        else {
            setAttachment(null);
        }

        return () => {
            if (fileType === "blob") {
                URL.revokeObjectURL(url);
            }
        };
    }, [id]);

    function renderAttachment() {
        if (!attachment || attachment.id !== id) {
            return null;
        }
        const { mediaType, url } = attachment;

        if (mediaType === "image") {
            return <img src={url} alt="" className="study-image" onClick={showImage}/>;
        }
        else if (mediaType === "audio") {
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
            {renderAttachment()}
            {side.text && (
                <div className="study-front-text" style={{ fontSize: `${side.textSize}px` }}>{side.text}</div>
            )}
            {imageExpanded && (
                <div className="mask study-expaned-image-mask" onClick={hideImage}>
                    <img src={attachment.url} className="study-expaned-image" alt="" />
                </div>
            )}
        </Fragment>
    );
}
