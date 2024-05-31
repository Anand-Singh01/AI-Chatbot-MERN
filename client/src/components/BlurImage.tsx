import { useState } from "react";
import "../App.css";
interface blurEffect {
  src: string;
  placeholder: string;
}
const BlurImage = ({ src, placeholder }: blurEffect) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };
  
  return (
    <div className="image-container">
      <img loading="lazy" src={placeholder} className={`image ${loaded ? 'image-hidden' : 'image-blur'}`} alt="" />
      <img loading="lazy" src={src} className={`image ${loaded ? 'image-shown' : 'image-hidden'}`} onLoad={handleImageLoad} alt="" />
    </div>
  );
};

export default BlurImage;
