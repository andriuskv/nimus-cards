import { memo } from "react";

export default memo(({ attachment }) => {
  const { blob, url, type } = attachment;
  const src = blob ? URL.createObjectURL(blob) : url;

  if (type === "image") {
    return <img src={src} alt="" className="create-side-image"/>;
  }
  else if (type === "audio") {
    return <audio src={src} className="create-side-audio" controls></audio>;
  }
  else if (type === "video") {
    return <video src={src} className="create-side-video" crossOrigin="anonymous" controls></video>;
  }
  return null;
});
