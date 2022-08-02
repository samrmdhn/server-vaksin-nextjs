const Footer = () => {
  return (
    <>
      <hr />
      <div className="container mt-5" style={{fontFamily: "Nimbus Sans L"}}>
        <footer className="row row-cols-5">
          <div className="col-lg-4 col-sm-12 col-12">
            <div className="">
              <div className="heading-proses" style={{ margin: 0 }}>
                LAPORVAKSINBDG
              </div>
              <div className="descriptionn-proses">Laporvaksinbdg adalah aplikasi sederhana berbasis web untuk melaporkan keluhan pasca vaksinasi yang dibuat berdasarkan nomor handphone.</div>
              <p className="text-muted">© 2021</p>
            </div>
          </div>
          <div className="col"></div>
          <div className="col-12 col-lg col-sm-6">
            <div className="heading-proses" style={{margin: 0}}>Navigasi</div>
            <div className="descriptionn-proses">Beranda</div>
            <div className="descriptionn-proses">Lapor Keluhan</div>
          </div>
          <div className="col-12 col-lg col-sm-6">
          <div className="heading-proses" style={{margin: 0}}>Laporan Keluhan</div>
          <div className="descriptionn-proses">Buat Laporan</div>
            <div className="descriptionn-proses">Cari Laporan</div>
          </div>
          
        </footer>
      </div>
    </>
  );
};

export default Footer;
