import react, { useEffect, useState } from "react";import { useRouter } from "next/router";
import Hero from "../../../components/Hero";
import Navbars from "../../../components/Navbars";
import Footer from "../../../components/Footer";
import Badge from "react-bootstrap/Badge";
import PersonIcon from "@mui/icons-material/Person";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Alert from '@mui/material/Alert';
import Head from 'next/head'

const HERO = {
  imageSrc: "/hero-hero5.png",
  text1: "Respon Laporan Keluhan",
  text2: "Pasca Vaksinasi",
  description:
    "Cari laporan keluhan vaksinasi yang telah Anda buat berdasarkan nomor handphone",
};

export default function CariKeluhan() {
  const [notificationError, setNotificationError] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  const getData = async () => {
    const res = await axios.get(`/api/pelapor/${id}`);
    if (res.data.data == null) setNotificationError(true);
    setData(res.data.data);
  };

  const getDate = (createdAt) => {
    const dates = new Date(createdAt);
    return dates.toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const replaceLine = (respon) =>{
    const newText = respon?.split('<br/>').map(str => <p>{str}</p>);
    return newText;
  }

  return (
    <>
      <Navbars />
      <Head>
        <title>{`Cari Laporan Keluhan: ${id}`}</title>
      </Head>
      <Hero imageSrc={HERO.imageSrc} text1={HERO.text1} text2={HERO.text2} />
      {notificationError ? (
        <>
          <div className="container mb-5">
            <div className="row">
              <div className="col">
                  <div className="card">
                <div className="p-4">
                <Alert severity="error">Data laporan keluhan tidak ditemukan</Alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="container p-4"
            style={{ fontFamily: "Nimbus Sans L" }}
          >
            <div className="row">
              <div className="col-lg-12 p-4 card">
                <div className="container">
                  <div className="label-field text-center">
                    FORM LAPORAN KELUHAN <br /> PASCA VAKSINASI
                  </div>
                  <hr />
                  <Badge bg="mb-3 mt-4" className="primaryy">
                    <PersonIcon fontSize="sm" /> DATA DIRI
                  </Badge>

                  <div className="row">
                    <div className="col-lg-6">
                      <div>
                        <div className="label-field">Nomor Handphone</div>
                        {data.nohp}
                      </div>

                      <div>
                        <div className="label-field">Nama Lengkap</div>
                        {data.nama}
                      </div>

                      <div style={{ margin: "0px 0px 10px 0" }}>
                        <div className="label-field">Jenis Kelamin</div>
                        {data.jenisKelamin}
                      </div>

                      <div style={{ margin: "0px 0px 10px 0" }}>
                        <div className="label-field">Usia</div>
                        {data.usia} tahun
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <Badge bg="mb-3 mt-4" className="primaryy">
                    <VaccinesIcon fontSize="sm" /> DATA VAKSINASI
                  </Badge>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-12">
                      <div className="label-field">Tanggal Vaksinasi 1</div>
                      {getDate(data.tglvaksin1)}

                      <div className="label-field">Jenis Vaksin 1</div>
                      {data.categoryId1 && data.categoryId1.name}

                      <div className="label-field">Tempat Vaksin 1</div>
                      {data.tmptvaksin1}

                      <div className="label-field">Keluhan Vaksin 1</div>
                      {data.about1}
                      <br />
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-12">
                      <div className="label-field">Tanggal Vaksinasi 2</div>
                      {getDate(data.tglvaksin2)}

                      <div className="label-field">Jenis Vaksin 2</div>
                      {data.categoryId2 && data.categoryId2.name}

                      <div className="label-field">Tempat Vaksin 2</div>
                      {data.tmptvaksin2}

                      <div className="label-field">Keluhan Vaksin 2</div>
                      {data.about2}
                      <br />
                    </div>
                  </div>
                  <div className="label-field">Detail keluhan</div>
                  {data.about}
                </div>
                

               
                <div className="container">
                  <Badge bg="mb-3 mt-4" className="primaryy">
                    <InsertCommentIcon fontSize="sm" /> LAPORAN KELUHAN
                  </Badge>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="label-field">Tanggal Laporan Keluhan</div>
                      {getDate(data.createdAt)}
                      <div className="label-field">Status Respon</div>
                      {data.statusRespon == 0 ? (
                        <Badge className="bg-warning">
                        <AccessTimeFilledIcon fontSize="sm"/> Sedang Diproses
                        </Badge>
                      ) : (
                        <>
                        <Badge className="bg-success">
                        <CheckCircleIcon fontSize="sm"/> Direspon
                        </Badge>
                        
                          <div className="label-field">
                            Respon Terkait Keluhan
                          </div>
                          <div className="container rounded text-light mt-2 p-4" style={{minHeight: "30vh", backgroundColor: "#102865"}}>
                          {replaceLine(data?.respon)}

                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
