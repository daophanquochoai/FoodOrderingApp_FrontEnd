import { Col, Row } from "antd";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { BannerProps } from "./type";

const GenericBanner: React.FC<BannerProps> = ({
  image,
  imageHeight = "50.25vw",
  layout = "right",
  wrapperClass = "",
  contentWrapperClass = "",
  hoverEffect = false,
  title,
  subTitle,
  subTitle2,
  descriptionPrice,
  price,
  description,
  button,
  iconButtonStyleExtra,
}) => {
  return (
    <div className={`relative overflow-hidden ${wrapperClass}`}>
      <div
        className={`w-full ${
          hoverEffect
            ? "transition-transform duration-1000 ease-in-out transform group-hover:scale-105"
            : ""
        }`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: imageHeight,
        }}
      ></div>

      <div className="absolute inset-0 p-2 h-full z-10">
        <Row className="h-full">
          <Col
            span={24}
            className={`flex ${
              layout === "left" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`w-full text-white flex flex-col items-start justify-center h-full ${contentWrapperClass}`}
            >
              <h2 className={title.className}>{title.text}</h2>

              {subTitle && (
                <p className={subTitle.className}>{subTitle.text}</p>
              )}

              {subTitle2 && (
                <p className={subTitle2.className}>{subTitle2.text}</p>
              )}

              {descriptionPrice ? (
                price ? (
                  <p className={descriptionPrice.className}>
                    {descriptionPrice.text}{" "}
                    <span className={price.className}>{price.text}</span>
                  </p>
                ) : (
                  <p className={descriptionPrice.className}>
                    {descriptionPrice.text}
                  </p>
                )
              ) : price ? (
                <p className={price.className}>Only ${price.text}</p>
              ) : null}

              {description && (
                <p className={description.className}>{description.text}</p>
              )}

              {button && (
                <button className={`group ${button.className}`}>
                  {button.text}
                  <FaArrowRightLong
                    className={`inline ${iconButtonStyleExtra} transition-transform duration-300 ${
                      button.hoverGroup ?? "group-hover"
                    }:translate-x-1`}
                  />
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GenericBanner;
