import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "@mui/material/Button";
import Link from "next/link";

function Navbars() {
  return (
    <Navbar style={{ padding: 10, marginTop: 20 }} collapseOnSelect expand="lg">
      <Container style={{ fontFamily: "Nimbus Sans L", fontWeight: "bolder" }}>
        <Link href={"/"}>
          <Nav.Link style={{ color: "#102865" }} href="/">
            LAPORVAKSINBDG
          </Nav.Link>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="d-flex justify-content-end align-items-center">
            <Link href={"/laporan_keluhan/buat"}>
              <Nav.Link href="/laporan_keluhan/buat">Buat Laporan</Nav.Link>
            </Link>
            <Link href={"/laporan_keluhan/cari"}>
              <Nav.Link href="/laporan_keluhan/cari">Cari Laporan</Nav.Link>
            </Link>
            <Link href={"#"}>
              <Nav.Link href="#">
                <Button
                  style={{
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    padding: "10px 20px 10px 20px",
                    fontWeight: "bolder",
                  }}
                  variant="contained"
                  size="small"
                >
                  Login
                </Button>
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
