import "./banner.css";
import { useEffect, useState } from "react";

export default function Banners({ banners, tipo }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const bannerFiltrado = banners.find(b => b.tipo === tipo);
  if (!bannerFiltrado) return null;

  const imagem =
    isMobile && bannerFiltrado.banner_mobile
      ? bannerFiltrado.banner_mobile
      : bannerFiltrado.banner;

  return (
    <div className={`container-banners ${tipo}`}>
      <img
        src={imagem}
        alt={`Banner ${tipo}`}
        loading="lazy"
      />
    </div>
  );
}
