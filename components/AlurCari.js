const AlurCari = ({ judul, text, icon}) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12 p-4">
        <div className="icon">{icon}</div>
        <div className="heading-proses">{judul}</div>
        <div className="descriptionn-proses">{text}</div>
      </div>
    </>
  );
};

export default AlurCari;
