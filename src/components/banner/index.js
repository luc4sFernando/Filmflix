import React from "react";
import { useState, useEffect } from "react";
import {
  BannerButton,
  BannerContents,
  BannerTitle,
  ButtonsWrap,
  Header,
  BannerDescription,
  FadeBottom,
  FadeBanner,
} from "./styled";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import axios from "../../services/axios";
import requests from "../../services/requests";
import { useResponsiveComponent } from "../../hooks/useResponsiveComponent";

function Banner() {
  const [movie, setMovie] = useState([]);
  const innerWidth = useResponsiveComponent();
  
  useEffect(() => {
    async function requestData() {
      const response = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    
      return response;
    }

    requestData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > 100 ? string.substr(0, n - 1) + " ..." : string;
  };
  return (
    <>
    <FadeBanner />
      <Header
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <BannerContents>
          <BannerTitle>
            {movie?.name || movie?.title || movie?.original_name}
          </BannerTitle>
          
          <BannerDescription tru>
            {truncate(movie?.overview, 150)}
          </BannerDescription>
          <ButtonsWrap>
            <BannerButton flex={1} color={true}>
              <BsPlayFill
                style={{ marginRight: "04px", alignItems: "center" }}
              />
              Assistir
            </BannerButton>
            <BannerButton flex={1} color={false}>
              <AiOutlineInfoCircle
                style={{ marginRight: "04px", alignItems: "center" }}
              />
              Mais Informações
            </BannerButton>
          </ButtonsWrap>
        </BannerContents>
        <FadeBottom></FadeBottom>
      </Header>
    </>
  );
}

export default Banner;
