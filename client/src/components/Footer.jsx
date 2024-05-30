import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <div className="p-2 flex flex-col  justify-center items-center text-white bg-slate-600 ">
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row ">
        <div className="flex  p-5">
          <FontAwesomeIcon
            icon={faFacebook}
            className="h-[30px] w-[30px] pr-2"
          />
          <a href="#">Facebook</a>
        </div>
        <div className="flex p-5">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="h-[30px] w-[30px] pr-2"
          />
          <a>balaramhaths@gmail.com</a>
        </div>
        <div className="flex p-5">
          <FontAwesomeIcon
            icon={faPhoneVolume}
            className="h-[30px] w-[30px] pr-2"
          />
          <a >017XXXXXXXXX</a>
        </div>
      </div>
      <h1>Copyright ©2024 Masud All.Rights Reserved</h1>
    </div>
  );
};

export default Footer;
