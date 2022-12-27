import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import * as S from "./style";

function Category({ select, setSelect }) {
  const categoryList = [
    "치킨",
    "중식",
    "패스트푸드",
    "양식",
    "돈까스",
    "회",
    "고기",
    "분식",
    "카페",
  ];
  const selectCategory = (e) => {
    setSelect(e.target.textContent);
  };
  return (
    <S.CategoryCon>
      <h2 className="ir">카테고리</h2>
      <Swiper slidesPerView={6} spaceBetween={0}>
        {categoryList.map((category, i) => (
          <SwiperSlide key={i}>
            <S.CategorySpan
              onClick={selectCategory}
              changeColor={select === category ? true : false}
            >
              {category}
            </S.CategorySpan>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.CategoryCon>
  );
}
export default Category;
