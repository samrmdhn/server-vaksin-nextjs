import React from "react";const AlurProses = ({ judul, deskripsi, icon }) => {
  return (
    <>
      <div className="col-lg-4 col-md-12 col-sm-12 col-12 container-proses">
        <div className="icon">{icon}</div>
        <div className="heading-proses">{judul}</div>
        <div className="descriptionn-proses">{deskripsi}</div>
      </div>
    </>
  );
};

export default AlurProses;
