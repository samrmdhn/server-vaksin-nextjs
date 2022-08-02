import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import AlurProses from "../components/AlurProses";
import Image from "next/image";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "@mui/material/Button";
import axios from "axios";
import { NextURL } from "next/dist/server/web/next-url";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import Head from 'next/head'
import Router from 'next/router'
const ALUR_PROSES = [
  {
    icon: <NoteAddIcon />,
    judul: "Buat Laporan",
    deskripsi:
      "Pertama, buat laporan keluhan sesuai dengan apa yang dirasakan setelah mendapatkan vaksin.",
  },
  {
    icon: <AccessTimeIcon />,
    judul: "Tunggu Respon",
    deskripsi:
      "Kedua, setelah melaporkan operator akan merespon sesuai dengan apa yang anda keluhkan. Proses ini akan memakan waktu, harap bersabar.",
  },
  {
    icon: <SearchIcon />,
    judul: "Cek Status Laporan",
    deskripsi:
      "Terakhir, cek status laporan yang anda kirim dengan memasukkan nomor Handphone.",
  },
];

const INFORMASI_VAKSIN = [
  {
    isShow: "true",
    name: "JENIS VAKSIN",
    text: "Berikut jenis-jenis vaksin yang didata:",
  },
  {
    isShow: "false",
    name: "LAPORAN DITERIMA",
    text: "Laporan yang diterima berjumlah ",
  },
];

export default function Home() {
  const getDatas = async () => {
    const res = await axios.get("/api/all");

  setDatas(res.data.data.category);
  setDataPelapor(res.data.data.pelapor);
  console.log(res)
  };

  useEffect(() => {
    getDatas();
  }, []);

 const [datas, setDatas] = useState([]);
 const [dataPelapor, setDataPelapor] = useState([])
 // console.log(datas.length);

  const [currentInformation, setCurrentInformation] = useState(
    INFORMASI_VAKSIN[0].text
  );

  const filterLaporan = () =>{
    const filteredLaporan = dataPelapor.filter((data)=>{
      return data.jenisKelamin == "Laki-laki"
    })
    return filteredLaporan.length;
  }

  const filterLaporan2 = () =>{
    const filteredLaporan = dataPelapor.filter((data)=>{
      return data.jenisKelamin == "Perempuan"
    })
    return filteredLaporan.length;
  }
  

  

  return (
    <div>
      <Navbars />
      <Head>
        <title>Lapor Keluhan
Pasca Vaksinasi</title>
      </Head>
      <div  style={{ fontFamily: "Nimbus Sans L" }}>
        <div className="container p-5 ">
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 p-2 gy-5">
              <div className="heading">
                Lapor Keluhan <br />
                Pasca Vaksinasi
              </div>
              <br />
              <div className="descriptionn">
                Laporkan keluhan pasca vaksinasi dengan cepat dan mudah yang
                akan diproses berdasarkan
                <span style={{ fontWeight: "bolder" }}>
                  {" "}
                  Nomor Handphone
                </span>{" "}
                yang dikirim.
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  padding: "10px 20px 10px 20px",
                  margin: "0px 10px 0px 0px",
                  fontWeight: "bolder",
                }}
                variant="contained"
                size="small"
                onClick={()=>Router.push('laporan_keluhan/cari')}
              >
                Buat Laporan
              </Button>
              {/* 
            <Button
              className="bg bg-light"
              style={{
                borderRadius: "20px",
                textTransform: "capitalize",
                padding: "10px 20px 10px 20px",
                color: "#102865",
              }}
              variant="contained"
              size="small"
            >
              Cek Status
            </Button>
            */}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 p-2 d-flex justify-content-center gy-5">
              <div className="position-relative">
                <div
                  className="position-absolute top-0 start-0 translate-middle bg bg-light"
                  style={{
                    zIndex: 1,
                    width: "170px",
                    padding: 10,
                    border: "1px solid #9c9c9c",
                    borderRadius: 10,
                  }}
                >
                  <div className="heading-proses-2">
                    <div className="row d-flex align-items-center">
                      <div className="col-lg-1">
                        <NoteAddIcon fontSize="small" />
                      </div>
                      <div className="col">Buat Laporan Keluhan</div>
                    </div>
                  </div>
                  <div className="descriptionn-proses-2">
                    Laporkan keluhan sesuai dengan apa yang dirasakan setelah
                    vaksinasi
                  </div>
                </div>

                <div
                  className="position-absolute top-100 start-100 translate-middle bg bg-light"
                  style={{
                    zIndex: 1,
                    width: "170px",

                    padding: 10,
                    border: "1px solid #9c9c9c",
                    borderRadius: 10,
                  }}
                >
                  <div className="heading-proses-2">
                    <div className="row d-flex align-items-center">
                      <div className="col-lg-1">
                        <SearchIcon fontSize="small" />
                      </div>
                      <div className="col">Cek Respon Laporan</div>
                    </div>
                  </div>

                  <div className="descriptionn-proses-2">
                    Cek status laporan yang dikirim dengan nomor handphone
                  </div>
                </div>
                <Image src="/hero2.png" height="350" width="250" />
              </div>
            </div>
          </div>
        </div>

        <div className="container p-5">
          <div className="heading d-flex justify-content-center">
            Alur Lapor Keluhan
          </div>
          <div
            className="descriptionn-proses d-flex justify-content-center"
            style={{ marginBottom: "50px" }}
          >
            Penyampaian laporan keluhan akan melalui beberapa tahapan, berikut
            tahapan-tahapan tersebut.
          </div>
          <div className="row g-3 ">
            {ALUR_PROSES.map((alur) => {
              return (
                <>
                  <AlurProses
                    judul={alur.judul}
                    deskripsi={alur.deskripsi}
                    icon={alur.icon}
                  />
                </>
              );
            })}
          </div>
        </div>

        <div className="container p-5">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-2 ">
              <Image src="/vaksin.png" height="350" width="250" />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 p-2 ">
              <div className="heading">
                Informasi Tentang Laporan <br /> Keluhan Vaksinasi
              </div>

              <div className="row" style={{ marginTop: 20 }}>
                <div className="col-lg-2 col-5 col-sm-3">
                  <div
                    className={`heading-proses-2 d-flex justify-content-center ${
                      INFORMASI_VAKSIN[0].text === currentInformation
                        ? "jenis-active text-light "
                        : "jenis"
                    } `}
                    onClick={() => {
                      setCurrentInformation(INFORMASI_VAKSIN[0].text);
                    }}
                  >
                    JENIS VAKSIN
                  </div>
                </div>
                <div className="col-lg-3 col-7 col-sm-5">
                  <div
                    className={`heading-proses-2 d-flex justify-content-center ${
                      INFORMASI_VAKSIN[1].text === currentInformation
                        ? "jenis-active text-light"
                        : "jenis"
                    } `}
                    onClick={() => {
                      setCurrentInformation(INFORMASI_VAKSIN[1].text);
                    }}
                  >
                    LAPORAN DITERIMA
                  </div>
                </div>
              </div>
              <div className="descriptionn-proses" style={{ marginTop: 20 }}>
                {INFORMASI_VAKSIN[0].text === currentInformation ? (
                  <>
                    <div className="descriptionn">{currentInformation}</div>{" "}
          
                    {datas.map((data, i) => {
                      return i === datas.length - 1 ? (
                        <> {data.name}.</>
                      ) : (
                        <> {data.name},</>
                      );
                    })}
                  
                  </>
                ) : (
                  <><div className="descriptionn">{currentInformation} <span style={{fontWeight: "bolder"}}>{dataPelapor?.length} laporan</span> <br /><br/>Laki - laki: <span style={{fontWeight: "bolder"}}>{filterLaporan()}  laporan</span> <br/> Perempuan:  <span style={{fontWeight: "bolder"}}>{filterLaporan2()} laporan</span></div>
                  
                  
                  </>
                  
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
