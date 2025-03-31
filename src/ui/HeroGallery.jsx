import { useEffect, useState } from "react";

const images = [
  "../car_left_side.jpg",
  "../car_left_angle.jpg",
  "../car_str.jpg",
  "../car_right_angle.jpg",
  "../car_right_side.jpg",
];

const HeroGallery = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getImageIndex = (position) => (index + position) % images.length;

  return (
    <>
      <div className="relative my-10 hidden w-full max-w-7xl items-center justify-center overflow-hidden md:flex">
        {/* Background images */}
        <img
          src={images[getImageIndex(1)]}
          alt="Background 1"
          className="absolute top-1/4 mr-[55%] aspect-[4/3] h-[200px] rotate-6 transform object-cover opacity-60 blur-sm transition-all duration-1000"
        />
        <img
          src={images[getImageIndex(2)]}
          alt="Background 2"
          className="absolute top-1/4 ml-[55%] aspect-[4/3] h-[200px] -rotate-6 transform object-cover opacity-60 blur-sm transition-all duration-1000"
        />

        {/* Semi-transparent side images */}
        <img
          src={images[getImageIndex(0)]}
          alt="Left Side"
          className="absolute top-1/2 mr-[30%] aspect-[4/3] h-[300px] w-1/3 -translate-y-1/2 rotate-3 transform rounded-lg object-cover opacity-90 blur-[1px] transition-all duration-1000"
        />
        <img
          src={images[getImageIndex(3)]}
          alt="Right Side"
          className="absolute top-1/2 ml-[30%] aspect-[4/3] h-[300px] w-1/3 -translate-y-1/2 -rotate-3 transform rounded-lg object-cover opacity-90 blur-[1px] transition-all duration-1000"
        />

        {/* Main central image */}
        <div className="relative z-[5] aspect-[16/11] h-[350px] transform rounded-md bg-gradient-to-br from-mirage to-swamp-300 object-cover p-[2px] shadow-2xl transition-all duration-1000">
          <img
            src={images[getImageIndex(4)]}
            alt="Main Image"
            className="h-full w-full rounded-[4px] object-cover"
          />
        </div>
      </div>
      <div className="relative my-10 flex w-full items-center justify-center overflow-hidden px-4 md:hidden">
        {/* Background images */}
        <img
          src={images[getImageIndex(1)]}
          alt="Background 1"
          className="absolute top-1/2 mr-[35%] aspect-[4/3] h-[125px] -translate-y-1/2 rotate-6 transform rounded-md object-cover opacity-60 blur-sm transition-all duration-1000"
        />
        <img
          src={images[getImageIndex(2)]}
          alt="Background 2"
          className="absolute top-1/2 ml-[35%] aspect-[4/3] h-[125px] -translate-y-1/2 -rotate-6 transform rounded-md object-cover opacity-60 blur-sm transition-all duration-1000"
        />

        {/* Semi-transparent side images */}
        <img
          src={images[getImageIndex(0)]}
          alt="Left Side"
          className="absolute top-1/2 mr-[20%] aspect-[4/3] h-[150px] -translate-y-1/2 rotate-3 transform rounded-md object-cover opacity-90 blur-[1px] transition-all duration-1000"
        />
        <img
          src={images[getImageIndex(3)]}
          alt="Right Side"
          className="absolute top-1/2 ml-[20%] aspect-[4/3] h-[150px] -translate-y-1/2 -rotate-3 transform rounded-md object-cover opacity-90 blur-[1px] transition-all duration-1000"
        />

        {/* Main central image */}
        <div className="relative z-[5] aspect-[4/3] h-[175px] transform rounded-md bg-gradient-to-br from-mirage to-swamp-300 object-cover p-[2px] transition-all duration-1000">
          <img
            src={images[getImageIndex(4)]}
            alt="Main Image"
            className="h-full w-full rounded-[4px] object-cover"
          />
        </div>
      </div>
      {/* <div className="relative my-5 flex w-full items-center justify-center overflow-hidden px-4 md:hidden">
        
        <img
          src={images[getImageIndex(1)]}
          alt="Background 1"
          className="absolute mb-[20%] aspect-[4/3] w-[65%] max-w-[400px] transform rounded-md object-cover opacity-60 blur-[1px] transition-all duration-1000"
        />
        <img
          src={images[getImageIndex(2)]}
          alt="Background 2"
          className="absolute mt-[20%] aspect-[4/3] w-[65%] max-w-[400px] transform rounded-md object-cover opacity-60 blur-[1px] transition-all duration-1000"
        />

        
        <img
          src={images[getImageIndex(0)]}
          alt="Left Side"
          className="absolute mb-[12%] aspect-[4/3] w-[70%] max-w-[450px] transform rounded-md object-cover blur-[1px] transition-all duration-1000"
        />
        <img
          src={images[getImageIndex(3)]}
          alt="Right Side"
          className="absolute mt-[12%] aspect-[4/3] w-[70%] max-w-[450px] transform rounded-md object-cover blur-[1px] transition-all duration-1000"
        />

       
        <div className="relative z-[5] my-[10%] aspect-[4/3] w-[85%] max-w-[500px] transform rounded-md bg-gradient-to-br from-mirage to-swamp-300 p-[2px] transition-all duration-1000">
          <img
            src={images[getImageIndex(4)]}
            alt="Main Image"
            className="h-full w-full rounded-[4px] object-cover"
          />
        </div>
      </div> */}
    </>
  );
};

export default HeroGallery;
