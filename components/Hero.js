import Image from "next/image";
const Hero = ({ imageSrc, text1, text2, description }) => {
  return (
    <>
      <div className="container " style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col">
            <div
              className="d-flex align-items-center p-4"
              style={{
                height: "50vh",
                backgroundColor: "#102865",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", zIndex: "1" }}>
                <div className="heading-2 text-light">{text1}</div>
                <div className="heading-2 text-light">{text2}</div>
              </div>

              <Image src={imageSrc} layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="mb-4">{description}</div>
        </div>
      </div>
    </>
  );
};

export default Hero;
