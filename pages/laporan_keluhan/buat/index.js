import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import CustomSelect from "../../../components/CustomSelect";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ErrorNotif from "../../../components/ErrorNotif";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Hero from "../../../components/Hero";
import Navbars from "../../../components/Navbars";
import Badge from "react-bootstrap/Badge";
import PersonIcon from "@mui/icons-material/Person";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../../components/Footer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

const signInSchema = Yup.object().shape({
  nohp: Yup.string().min(8).required("Nomor hp harus diisi"),
  nama: Yup.string().required("Nama lengkap harus diisi"),
  jenisKelamin: Yup.string().required("Jenis kelamin harus diisi"),
  usia: Yup.string().required("Usia harus diisi"),
  tglvaksin1: Yup.string().required("Tanggal vaksin 1 harus diisi"),
  categoryId1: Yup.string().required("Kategori vaksin 1 harus diisi"),
  tmptvaksin1: Yup.string().required("Tempat vaksin 1 harus diisi"),
  about1: Yup.string().required("Keluhan vaksin 1 harus diisi"),
  tglvaksin2: Yup.string().required("Tanggal vaksin 2 harus diisi"),
  categoryId2: Yup.string().required("Kategori vaksin 2 harus diisi"),
  tmptvaksin2: Yup.string().required("Tempat vaksin 2 harus diisi"),
  about2: Yup.string().required("Keluhan vaksin 2 harus diisi"),
  about: Yup.string().required("Keluhan tambahan harus diisi"),
});

const initialValues = {
  nohp: "",
  nama: "",
  jenisKelamin: "",
  usia: "",
  tglvaksin1: "",
  categoryId1: "",
  tmptvaksin1: "",
  about1: "",
  tglvaksin2: "",
  categoryId2: "",
  tmptvaksin2: "",
  about2: "",
  about: "",
};

const PERHATIAN = [
  {
    text: "Pastikan data yang akan diinput benar dan sesuai dengan data vaksinasi Anda.",
  },
  {
    text: "Nomor handphone yang diinput adalah nomor handphone yang Anda daftarkan pada saat melakukan vaksinasi. ",
  },
  {
    text: "Pada bagian Detail Keluhan, jelaskan lebih rinci keluhan yang Anda alami pasca vaksinasi agar respon yang diberikan sesuai dengan apa yang Anda keluhkan.",
  },
  {
    text: "Respon laporan keluhan dibalas minimal 3x24 jam.",
  },
];

const HERO = {
  imageSrc: "/hero-hero2.png",
  text1: "Buat Laporan Keluhan",
  text2: "Pasca Vaksinasi",
  description:
    "Jika ada beberapa efek samping pasca vaksinasi, silahkan tekan tombol tekan buat laporan dibawah ini. Pastikan nomor handphone yang dimasukkan adalah nomor handphone yang diregistrasi pada saat melakukan vaksinasi, selain itu pastikan data yang dimasukkan telah benar dan sesuai.",
};

export default function Buat() {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [errorSelect, setErrorSelect] = useState(false);
  const [errorSelect2, setErrorSelect2] = useState(false);
  const [data, setData] = useState(false);
  console.log(data);

  const getCategory = async () => {
    const res = await fetch("/api/category");
    const category = await res.json();
    setCategory(category.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const options = [];

  const filteredCategory = category.map((ctg) => {
    return options.push({
      key: `${ctg._id}`,
      value: `${ctg._id}`,
      label: `${ctg.name}`,
    });
  });

  const handleSubmit = async (values) => {
    const res = await axios
      .post("/api/pelapor/add", values)
      .then(function (response) {
        console.log(response.data.data);
      });
    setOpen(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{ fontFamily: "Nimbus Sans L" }}>
      <Head>
        <title>Buat Laporan Keluhan</title>
      </Head>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Laporan Berhasil Dibuat
        </Alert>
      </Snackbar>
      <Navbars />
      <Hero
        text1={HERO.text1}
        text2={HERO.text2}
        imageSrc={HERO.imageSrc}
        description={HERO.description}
      />
      <div className="container">
        <Button
          style={{
            borderRadius: "20px",
            textTransform: "capitalize",
            padding: "10px 20px 10px 20px",
            fontWeight: "bolder",
          }}
          variant="contained"
          size="small"
          type="submit"
          onClick={() => setShowForm(!showForm)}
        >
          <AddIcon />
          &nbsp; Buat Laporan Keluhan
        </Button>
      </div>
      <div className="container p-4">
        {showForm ? (
          <>
            <div className="row">
              <div className="col-lg-12 p-4 card">
                <Formik
                  initialValues={initialValues}
                  validationSchema={signInSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm({ values: "" });
                    Router.push("/laporan_keluhan/cari");
                  }}
                >
                  {(formik) => {
                    const {
                      errors,
                      setFieldValue,
                      setFieldTouched,
                      touched,
                      isValid,
                      dirty,
                    } = formik;
                    return (
                      <Form>
                        <div className="container">
                          <div className="label-field text-center">
                            FORM LAPORAN KELUHAN <br /> PASCA VAKSINASI
                          </div>
                          <hr />
                          <Badge
                            bg=" mt-4 mb-2"
                            style={{ backgroundColor: "#102865" }}
                          >
                            <PersonIcon fontSize="sm" /> DATA DIRI
                          </Badge>

                          <div className="row">
                            <div className="col-lg-6">
                              <div>
                                <div className="label-field">
                                  Nomor Handphone
                                </div>
                                <Field
                                  name="nohp"
                                  as={TextField}
                                  sx={{
                                    "& label.Mui-focused": {
                                      display: "none",
                                    },
                                    "& legend": {
                                      display: "none",
                                    },
                                  }}
                                  id="outlined-size-small"
                                  defaultValue="Small"
                                  size="small"
                                  placeholder="08XX"
                                  variant="outlined"
                                  style={{
                                    margin: "10px 0px 10px 0px",
                                    width: "100%",
                                  }}
                                  error={
                                    Boolean(errors.nohp) &&
                                    Boolean(touched.nohp)
                                  }
                                  helperText={
                                    Boolean(touched.nohp) && errors.nohp
                                  }
                                />
                              </div>

                              <div>
                                <div className="label-field">Nama Lengkap</div>
                                <Field
                                  size="small"
                                  name="nama"
                                  as={TextField}
                                  sx={{
                                    "& label.Mui-focused": {
                                      display: "none",
                                    },
                                    "& legend": {
                                      display: "none",
                                    },
                                  }}
                                  placeholder="Syams Syair Ramadhan"
                                  variant="outlined"
                                  style={{
                                    margin: "10px 0px 10px 0",
                                    width: "100%",
                                  }}
                                  error={
                                    Boolean(errors.nama) &&
                                    Boolean(touched.nama)
                                  }
                                  helperText={
                                    Boolean(touched.nama) && errors.nama
                                  }
                                />
                              </div>

                              <div style={{ margin: "0px 0px 10px 0" }}>
                                <div className="label-field">Jenis Kelamin</div>
                                <RadioGroup
                                  margin="normal"
                                  row
                                  onChange={formik.handleChange}
                                  name="jenisKelamin"
                                  value={formik.values.inCompliance}
                                >
                                  <FormControlLabel
                                    value="Laki-laki"
                                    name="jenisKelamin"
                                    control={<Radio />}
                                    label="Laki-laki"
                                  />
                                  <FormControlLabel
                                    value="Perempuan"
                                    name="jenisKelamin"
                                    control={<Radio />}
                                    label="Perempuan"
                                  />
                                </RadioGroup>
                                <ErrorMessage
                                  name="jenisKelamin"
                                  render={(msg) => (
                                    <>
                                      <ErrorNotif text={msg} />
                                    </>
                                  )}
                                />
                              </div>

                              <div style={{ margin: "0px 0px 10px 0" }}>
                                <div className="label-field">Usia</div>
                                <Field
                                  name="usia"
                                  id="usia"
                                  as={TextField}
                                  sx={{
                                    "& label.Mui-focused": {
                                      display: "none",
                                    },
                                    "& legend": {
                                      display: "none",
                                    },
                                  }}
                                  size="small"
                                  placeholder="22"
                                  variant="outlined"
                                  style={{
                                    margin: "10px 0px 10px 0",
                                    width: "100%",
                                  }}
                                  error={
                                    Boolean(errors.usia) &&
                                    Boolean(touched.usia)
                                  }
                                  helperText={
                                    Boolean(touched.usia) && errors.usia
                                  }
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        tahun
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="container">
                          <Badge
                            bg="mt-4 mb-2"
                            style={{ backgroundColor: "#102865" }}
                          >
                            <VaccinesIcon fontSize="sm" /> DATA VAKSINASI
                          </Badge>
                          <div className="row">
                            <div className="col-lg-6 col-sm-12 col-md-12">
                              <div className="label-field">
                                Tanggal Vaksinasi Dosis 1
                              </div>
                              <Field
                                style={{
                                  margin: "10px 0px 10px 0",
                                  width: "100%",
                                }}
                                type="date"
                                name="tglvaksin1"
                                id="tglvaksin1"
                                as={TextField}
                                size="small"
                                variant="outlined"
                                error={
                                  Boolean(errors.tglvaksin1) &&
                                  Boolean(touched.tglvaksin1)
                                }
                                helperText={
                                  Boolean(touched.tglvaksin1) &&
                                  errors.tglvaksin1
                                }
                                sx={{
                                  "& label.Mui-focused": {
                                    display: "none",
                                  },
                                  "& legend": {
                                    display: "none",
                                  },
                                }}
                              />

                              <div className="label-field">
                                Jenis Vaksin Dosis 1
                              </div>

                              <div
                                className={
                                  errorSelect ? `error-select` : "normal-select"
                                }
                              >
                                <CustomSelect
                                  name="categoryId1"
                                  value={"categoryId1"}
                                  options={options}
                                  onChange={(selectedOptions) => {
                                    if (!selectedOptions) {
                                      setErrorSelect(true);
                                    } else {
                                      setFieldTouched("categoryId1", true);
                                      setFieldValue(
                                        "categoryId1",
                                        selectedOptions.value
                                      );
                                    }
                                  }}
                                />
                              </div>

                              {errors.categoryId1 && touched.categoryId1
                                ? setErrorSelect(true)
                                : setErrorSelect(false)}

                              <ErrorMessage
                                name="categoryId1"
                                render={(msg) => (
                                  <>
                                    <ErrorNotif text={msg} />
                                  </>
                                )}
                              />

                              <div className="label-field">
                                Tempat Vaksin Dosis 1
                              </div>
                              <Field
                                size="small"
                                name="tmptvaksin1"
                                as={TextField}
                                sx={{
                                  "& label.Mui-focused": {
                                    display: "none",
                                  },
                                  "& legend": {
                                    display: "none",
                                  },
                                }}
                                placeholder="UPT Puskesmas Cibuntu"
                                variant="outlined"
                                style={{
                                  margin: "10px 0px 10px 0",
                                  width: "100%",
                                }}
                                error={
                                  Boolean(errors.tmptvaksin1) &&
                                  Boolean(touched.tmptvaksin1)
                                }
                                helperText={
                                  Boolean(touched.tmptvaksin1) &&
                                  errors.tmptvaksin1
                                }
                              />

                              <div className="label-field">
                                Keluhan Vaksin Dosis 1
                              </div>
                              <Field
                                multiline
                                size="small"
                                name="about1"
                                as={TextField}
                                rows={4}
                                sx={{
                                  "& label.Mui-focused": {
                                    display: "none",
                                  },
                                  "& legend": {
                                    display: "none",
                                  },
                                }}
                                placeholder="Contoh: Nyeri Sendi"
                                variant="outlined"
                                style={{
                                  margin: "10px 0px 10px 0",
                                  width: "100%",
                                }}
                                error={
                                  Boolean(errors.about1) &&
                                  Boolean(touched.about1)
                                }
                                helperText={
                                  Boolean(touched.about1) && errors.about1
                                }
                              />
                              <br />
                            </div>
                            <div className="col-lg-6 col-sm-12 col-md-12">
                              <div className="label-field">
                                Tanggal Vaksinasi Dosis 2
                              </div>
                              <Field
                                style={{
                                  margin: "10px 0px 10px 0",
                                  width: "100%",
                                }}
                                type="date"
                                name="tglvaksin2"
                                id="tglvaksin2"
                                as={TextField}
                                size="small"
                                variant="outlined"
                                error={
                                  Boolean(errors.tglvaksin2) &&
                                  Boolean(touched.tglvaksin2)
                                }
                                helperText={
                                  Boolean(touched.tglvaksin2) &&
                                  errors.tglvaksin2
                                }
                                sx={{
                                  "& label.Mui-focused": {
                                    display: "none",
                                  },
                                  "& legend": {
                                    display: "none",
                                  },
                                }}
                              />

                              <div className="label-field">
                                Jenis Vaksin Dosis 2
                              </div>
                              <div
                                className={
                                  errorSelect2
                                    ? `error-select`
                                    : "normal-select"
                                }
                              >
                                <CustomSelect
                                  name="categoryId2"
                                  value={"categoryId2"}
                                  options={options}
                                  onChange={(selectedOptions2) => {
                                    if (!selectedOptions2) {
                                      setErrorSelect2(true);
                                    } else {
                                      setFieldTouched("categoryId2", true);
                                      setFieldValue(
                                        "categoryId2",
                                        selectedOptions2.value
                                      );
                                    }
                                  }}
                                />
                              </div>

                              {errors.categoryId2 && touched.categoryId2
                                ? setErrorSelect2(true)
                                : setErrorSelect2(false)}

                              <ErrorMessage
                                name="categoryId2"
                                render={(msg) => (
                                  <>
                                    <ErrorNotif text={msg} />
                                  </>
                                )}
                              />

                              <div className="label-field">
                                Tempat Vaksin Dosis 2
                              </div>
                              <Field
                                size="small"
                                name="tmptvaksin2"
                                as={TextField}
                                sx={{
                                  "& label.Mui-focused": {
                                    display: "none",
                                  },
                                  "& legend": {
                                    display: "none",
                                  },
                                }}
                                placeholder="UPT Puskesmas Cibuntu"
                                variant="outlined"
                                style={{
                                  margin: "10px 0px 10px 0",
                                  width: "100%",
                                }}
                                error={
                                  Boolean(errors.tmptvaksin2) &&
                                  Boolean(touched.tmptvaksin2)
                                }
                                helperText={
                                  Boolean(touched.tmptvaksin2) &&
                                  errors.tmptvaksin2
                                }
                              />

                              <div className="label-field">
                                Keluhan Vaksin Dosis 2
                              </div>
                              <Field
                                multiline
                                size="small"
                                name="about2"
                                as={TextField}
                                rows={4}
                                sx={{
                                  "& label.Mui-focused": {
                                    display: "none",
                                  },
                                  "& legend": {
                                    display: "none",
                                  },
                                }}
                                placeholder="Contoh: Flu"
                                variant="outlined"
                                style={{
                                  margin: "10px 0px 10px 0",
                                  width: "100%",
                                }}
                                error={
                                  Boolean(errors.about2) &&
                                  Boolean(touched.about2)
                                }
                                helperText={
                                  Boolean(touched.about2) && errors.about2
                                }
                              />
                              <br />
                            </div>
                            <div className="label-field">Detail keluhan</div>
                            <Field
                              multiline
                              size="small"
                              name="about"
                              as={TextField}
                              rows={4}
                              sx={{
                                "& label.Mui-focused": {
                                  display: "none",
                                },
                                "& legend": {
                                  display: "none",
                                },
                              }}
                              placeholder="Contoh: Nyeri sendi pada bagian tangan pada saat dosis 1 selama ..."
                              variant="outlined"
                              style={{
                                margin: "10px 0px 10px 0",
                                width: "100%",
                              }}
                              error={
                                Boolean(errors.about) && Boolean(touched.about)
                              }
                              helperText={
                                Boolean(touched.about) && errors.about
                              }
                            />
                            <Button
                              style={{
                                borderRadius: "20px",
                                textTransform: "capitalize",
                                padding: "10px 20px 10px 20px",
                                margin: "30px auto",
                                fontWeight: "bolder",
                                width: "100px",
                              }}
                              variant="contained"
                              size="small"
                              type="submit"
                            >
                              Kirim
                            </Button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card p-4">
              <div style={{ fontWeight: "bolder" }}>
                <ErrorOutlineIcon /> Perhatian
              </div>
              <ol>
                {PERHATIAN.map((pht, index) => {
                  return (
                    <>
                      <li key={pht.index} className="descriptionn-proses">
                        {pht.text}
                      </li>
                    </>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
