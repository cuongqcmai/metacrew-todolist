import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: 861 });
  const isMobile = useMediaQuery({ maxWidth: 860 });

  return { isMobile, isDesktop };
};

export default useResponsive;
