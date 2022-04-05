import React, { useEffect, useRef } from "react";

function Card(props) {
  // dom 요소에 직접 접근하기 위해 useRef hooks 사용
  const imgRef = useRef(null);

  //observing을 최초 한 번만 실행
  useEffect(() => {
    const options = {};

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        //화면 안에 이 요소의 값이 들어와있는가, 아닌가를 판단
        if (entry.isIntersecting) {
          console.log("is intersecting");
          entry.target.src = entry.target.dataset.src;
          entry.target.previousSibling.srcset =
            entry.target.previousSibling.dataset.srcset;

          //이미지가 들어갔는지 한 번 감지를 했으니 이제 필요없음. unobserve 해주기
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imgRef.current);
  }, []);

  return (
    <div className="Card text-center">
      <picture>
        <source data-srcset={props.webp} type="image/webp" />
        <img data-src={props.image} ref={imgRef} />
      </picture>
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
