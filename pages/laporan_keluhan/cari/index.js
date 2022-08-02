import react, { useState } from "react";
import Router from "next/router";
import Navbars from "../../../components/Navbars";
import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "../../../components/Hero";
import SearchIcon from "@mui/icons-material/Search";
import AlurCari from "../../../components/AlurCari";
import Image from "next/image";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Footer from "../../../components/Footer";
import Head from "next/head";
const HERO = {
  imageSrc: "/hero-hero4.png",
  text1: "Cari Laporan Keluhan",
  text2: "Pasca Vaksinasi",
  description:
    "Cari laporan keluhan vaksinasi yang telah Anda buat berdasarkan nomor handphone",
};

const ALUR_CARI = [
  {
    icon: <PhoneIphoneIcon />,
    judul: "Masukkan Nomor Handphone",
    text: "Cari laporan data keluhan Anda berdasarkan nomor handphone yang dikirim. Pastikan nomor handphone benar dan sesuai.",
  },
  {
    icon: <AccessTimeIcon />,
    judul: "Tunggu Proses Pencarian",
    text: "Tunggu hasil pencarian yang dilakukan oleh sistem yang nantinya akan memunculkan hasil respon data laporan keluhan Anda",
  },
  {
    icon: <AssignmentIcon />,
    judul: "Hasil Respon Laporan Keluhan",
    text: "Sistem menampilkan hasil respon laporan keluhan Anda. Ikuti panduan apa saja yang harus dilakukan berdasarkan apa yang Anda keluhkan.",
  },
];

export default function CariLaporanKeluhanIndex() {
  const [noHp, setNoHp] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(noHp);
    Router.push(`cari/${noHp}`);
  };

  return (
    <>
      <Navbars />
      <Head>
        <title>Cari Laporan Keluhan</title>
      </Head>
      <Hero imageSrc={HERO.imageSrc} text1={HERO.text1} text2={HERO.text2} />
      <div className="container mb-5" style={{ fontFamily: "Nimbus Sans L" }}>
        <div className="p-4 card">
          <div className="heading text-center mb-3">Cari Laporan Keluhan</div>
          <div className="row" style={{ margin: "0 auto" }}>
            <div className="col-lg-12">
              <form onSubmit={submitHandler}>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nomor Handphone"
                    onChange={(e) => {
                      setNoHp(e.target.value);
                    }}
                  />
                  <button className="btn btn-primary" type="submit">
                    <SearchIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="row mt-5">
            {ALUR_CARI.map((alur) => {
              return (
                <AlurCari
                  judul={alur.judul}
                  text={alur.text}
                  icon={alur.icon}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
