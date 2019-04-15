import React, { Fragment, useState } from "react";
import Attachment from "../attachment";

export default function StudyCardFront({ side }) {
    const [{ imageExpanded, imageSrc }, toggleImage] = useState({});
    const { attachment, text, textSize } = side;

    function showImage() {
        const { file, type } = attachment;

        if (type !== "image") {
            return;
        }
        toggleImage({
            imageExpanded: true,
            imageSrc: typeof file === "string" ? file : URL.createObjectURL(file)
        });
    }

    function hideImage() {
        toggleImage({ imageExpanded: false });
    }

    return (
        <Fragment>
            <div className="side-container">
                <div className="side">
                    <div className="study-side-content">
                        {attachment && (
                            <div className={`side-panel-container${text ? "" : " full"}`}
                                onClick={showImage}>
                                <Attachment {...attachment}></Attachment>
                            </div>
                        )}
                        {text && (
                            <div className="side-text study-side-text">
                                <div style={{ fontSize: `${textSize}px` }}>{text}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {imageExpanded && (
                <div className="mask" onClick={hideImage}>
                    <img src={imageSrc} className="study-expaned-image" alt="" />
                </div>
            )}
        </Fragment>
    );
}
