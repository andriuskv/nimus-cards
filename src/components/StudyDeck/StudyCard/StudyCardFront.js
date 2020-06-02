import React, { useEffect, useState, useRef } from "react";
import Icon from "../../Icon";

export default function StudyCardFront({ id, attachementId, side }) {
  const [attachment, setAttachment] = useState(null);
  const [imageExpanded, expandImage] = useState(false);
  const audioElementRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    let src = "";
    let srcType = "";

    if (side.attachment) {
      const { blob, url, type } = side.attachment;
      srcType = blob ? "blob": "url";
      src = blob ? URL.createObjectURL(blob) : url;

      setAttachment({
        src,
        attachementId,
        mediaType: type
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
  }, [id, attachementId]);

  function handleAudio() {
    audioElementRef.current.currentTime = 0;
    audioElementRef.current.play();
  }

  function handleVideo() {
    videoElementRef.current.currentTime = 0;
    videoElementRef.current.play();
  }

  function renderAttachment() {
    const { mediaType, src, attachementId } = attachment;

    if (mediaType === "image") {
      return (
        <button className="btn btn-icon study-image-btn" onClick={showImage}>
          <img src={src} alt="" className="study-image"/>
        </button>
      );
    }
    else if (mediaType === "audio") {
      return (
        <button className="btn study-audio-btn" onClick={handleAudio}>
          <Icon name="volume"/>
          <audio src={src} ref={audioElementRef} key={attachementId} autoPlay></audio>
        </button>
      );
    }
    else if (mediaType === "video") {
      return (
        <button className="btn btn-icon study-video-btn" onClick={handleVideo}>
          <video src={src} className="study-video" crossOrigin="anonymous" ref={videoElementRef} key={attachementId} autoPlay></video>
        </button>
      );
    }
    return null;
  }

  function showImage() {
    expandImage(!imageExpanded);
  }

  function hideImage() {
    expandImage(false);
  }

  return (
    <>
      {attachment && renderAttachment()}
      {side.text && (
        <div className="study-front-text" style={{ fontSize: `${side.textSize}px` }}>{side.text}</div>
      )}
      {imageExpanded && (
        <div className="study-expaned-image-mask" onClick={hideImage}>
          <img src={attachment.src} className="study-expaned-image" alt=""/>
        </div>
      )}
    </>
  );
}
