import { Col, Row, Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Header() {
  const [logo, setLogo] = useState(null);
  const [allLogo, setAllLogo] = useState([]);
  const [preview, setPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [configId, setConfigId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState(null);
  const router = useRouter();
  const instituteId = useSelector((state) => state.institute.instituteId);

  const [eLibraryData, setElibraryData] = useState({
    font_style: "",
    font_size: "",
    font_weight: "",
    font_color: "",
  });

  const [colorThemeData, setColorThemeData] = useState({
    color1: "",
    color2: "",
    show_banner: false,
    upper_cover_image: "",
  });

  const [coverHeadlineData, setCoverHeadlineData] = useState({
    firstQuote: "",
    subHeadline: "",
    banner_font_size: "",
    background_color: "",
    banner_font_color: "",
    banner_text_color: "",
  });

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const LoadConfigData = async (instituteId) => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }
    
    if (!instituteId) {
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?institute_id=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        const mainData = response.data[0];

        const logos = mainData?.latest_logos || [];
        const activeLogoUrl = logos.find((logo) => logo.is_active)?.logo;

        setAllLogo(logos);
        setLogo(activeLogoUrl);

        setConfigId(mainData.conf_id);
        setElibraryData({
          font_style: mainData.font_style,
          font_size: mainData.font_size,
          font_weight: mainData.font_weight,
          font_color: mainData.font_color,
        });

        setColorThemeData({
          color1: mainData.color1 || "#ffffff",
          color2: mainData.color2 || "#000000",
          show_banner: mainData.so_banner || false,
          upper_cover_image: mainData.upper_cover_image || "",
        });

        setCoverImage(mainData.upper_cover_image);

        setCoverHeadlineData({
          firstQuote: mainData.cover_headline.firstQuote,
          subHeadline: mainData.cover_headline.subHeadline,
          banner_font_size: mainData.cover_headline.banner_font_size,
          background_color: mainData.cover_headline.background_color,
          banner_font_color: mainData.cover_headline.banner_font_color,
          banner_text_color: mainData.cover_headline.banner_text_color,
        });
      }
    } catch (error) {
      // console.error("Error fetching logo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    LoadConfigData(instituteId);
  }, [instituteId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setLogo(file);
    }
  };

  const handleSaveLogo = async (configId) => {
    if (!logo) {
      Swal.fire("Error", "Please select an image", "error");
      return;
    }
    
    if (!(logo instanceof File)) {
      Swal.fire("Error", "Please upload a valid logo file", "error");
      return;
    }    

    const token = getToken();
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("institute", instituteId);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logos?conf_id=${configId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire("Success", "Logo updated successfully!", "success");
        LoadConfigData();
      }
    } catch (error) {
      console.error("Error updating logo:", error);
      Swal.fire("Error", "Failed to update logo", "error");
    }
  };

  const handleActivateLogo = async(logo_id,instituteId)=>{
    const token = getToken();
    const formData = new FormData();
    formData.append("is_active", true);
    formData.append("institute", instituteId);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logos?logo_id=${logo_id}&institute_id=${instituteId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire("Success", "Logo activated successfully!", "success");
        // setAllLogo(allLogo.filter((logo) => !logo.is_active))
        LoadConfigData();
      }
    } catch (error) {
      console.error("Error updating logo:", error);
      Swal.fire("Error", "Failed to update logo", "error");
    }
  };
  

  // eLibrary Configuration

  const handleElibraryChange = (event) => {
    const { name, value, type } = event.target;
    setElibraryData((prevState) => ({
      ...prevState,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleElibrarySubmit = async (configId) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("font_style", eLibraryData.font_style);
    formData.append("font_size", eLibraryData.font_size);
    formData.append("font_weight", eLibraryData.font_weight);
    formData.append("font_color", eLibraryData.font_color);
    formData.append("institute", instituteId);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?conf_id=${configId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Success",
          "eLibrary Configuration updated successfully!",
          "success"
        );
        LoadConfigData();
      }
    } catch (error) {
      console.error("Error updating eLibrary :", error);
      Swal.fire("Error", "Failed to update eLibrary Configuration", "error");
    }
  };

  const handleColorThemeChange = (event) => {
    const { name, value, type, checked } = event.target;
    setColorThemeData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleColorThemeSubmit = async (configId) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("color1", colorThemeData.color1);
    formData.append("color2", colorThemeData.color2);
    formData.append("so_banner", colorThemeData.show_banner ? "true" : "false");
    formData.append("institute", instituteId);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?conf_id=${configId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Color theme updated successfully!", "success");
        LoadConfigData();
      }
    } catch (error) {
      console.error("Error updating color theme:", error);
      Swal.fire("Error", "Failed to update color theme", "error");
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setCoverImage(file);
    }
  };

  const handleSaveCoverImage = async (configId) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("upper_cover_image", coverImage);
    formData.append("institute", instituteId);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?conf_id=${configId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Success",
          "Upper cover image updated successfully!",
          "success"
        );
        LoadConfigData(); // Reload the image after upload
      }
    } catch (error) {
      Swal.fire(
        "Error",
        `${
          error?.response?.data.upper_cover_image[0] ||
          "Failed to update upper cover image"
        }`,
        "error"
      );
    }
  };

  const handleCoverHeadlineChange = (event) => {
    const { name, value } = event.target;
    if (name == "banner_font_size") {
      const numericValue = Number(value);
      if (numericValue > 18) {
        Swal.fire("Error", "You can't set font size above 18px", "error");
        return;
      }
    }
    setCoverHeadlineData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCoverHeadlineSubmit = async (configId) => {
    const token = getToken();
    const formData = new FormData();

    formData.append("cover_headline", JSON.stringify(coverHeadlineData));
    formData.append("institute", instituteId);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?conf_id=${configId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Success",
          "Cover Headline settings updated successfully!",
          "success"
        );
      }
    } catch (error) {
      console.error("Error updating Cover Headline settings:", error);
      Swal.fire("Error", "Failed to update Cover Headline settings", "error");
    }
  };

  return (
    <>
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Body className="p-0">
              <h5 className="p-2 bg-dark text-white rounded-top-3">Logo</h5>
              <Swiper
                modules={[Navigation]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                spaceBetween={30}
                slidesPerView={1}
                className="custom-swiper"
              >
                <SwiperSlide>
                  <Form>
                    <label
                      htmlFor="photo-upload"
                      className="custom-file-upload"
                    >
                      <div className="img-wrap img-upload">
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : (
                          <img
                            src={
                              preview ||
                              `${
                                allLogo.find((config) => config.is_active)?.logo
                              }` ||
                              allLogo.find((config) => config.is_active)
                                ?.logo ||
                              "/default-logo.png"
                            }
                            alt="Logo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <Row className="justify-content-center">
                      <Col md={10} className="text-center">
                        <Button
                          variant="primary"
                          size="sm"
                          className="mx-auto my-3"
                          onClick={() => handleSaveLogo(configId)}
                        >
                          Change Logo
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </SwiperSlide>
                {allLogo &&
                  allLogo
                    .filter((logo) => logo.is_active === false)
                    .map((logo, index) => (
                      <SwiperSlide key={index}>
                        <Form>
                          <div
                            className="custom-file-upload"
                          >
                            <div className="img-wrap">
                              {isLoading ? (
                                <p>Loading...</p>
                              ) : (
                                <img
                                  src={
                                    preview ||
                                    logo.logo ||
                                    "/default-logo.png"
                                  }
                                  alt="Logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                          <Row className="justify-content-center">
                            <Col md={10} className="text-center">
                              <Button
                                variant="primary"
                                size="sm"
                                className="mx-auto my-3"
                                onClick={() => handleActivateLogo(logo.logo_id,instituteId)}
                              >
                                Activate
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </Card.Body>
          </Card>
        </Col>

        {/* eLibrary Configuration */}
        <Col lg={4}>
          <Card>
            <Card.Body className="p-0">
              <h5 className="p-2 bg-dark text-white rounded-top-3">
                eLibrary Configuration
              </h5>
              <Form>
                <Row className="p-2">
                  {/* Font Style */}
                  <Col lg={12}>
                    <Row>
                      <Col lg={12} className="mb-2">
                        <label htmlFor="font_style">Font Style</label>
                      </Col>
                      <Col lg={12}>
                        <Form.Select
                          name="font_style"
                          value={eLibraryData.font_style}
                          onChange={handleElibraryChange}
                          style={{ padding: "5px", font_size: "12px" }}
                        >
                          <option value="roboto">Roboto</option>
                          <option value="railway">Railway</option>
                          <option value="heebo">Heebo</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Col>

                  <Col lg={12} className="mt-2">
                    <Row>
                      <Col lg={12} className="mb-2">
                        <label htmlFor="font_size">Font Size</label>
                      </Col>
                      <Col lg={12}>
                        <Form.Control
                          name="font_size"
                          value={eLibraryData.font_size}
                          type="number"
                          placeholder="Enter font size"
                          onChange={handleElibraryChange}
                          style={{ padding: "5px", font_size: "12px" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {/* <Col lg={12} className="mt-2 h-100">
                    <Row>
                      <Col lg={5}>
                        <label>Font Weight</label>
                      </Col>
                      <Col lg={7} className="d-flex justify-content-around">
                        <Form.Check
                          type="radio"
                          label="Normal"
                          id="normal"
                          name="font_weight"
                          value="normal"
                          checked={eLibraryData.font_weight === "normal"}
                          onChange={handleElibraryChange}
                        />
                        <Form.Check
                          type="radio"
                          label="Bold"
                          id="bold"
                          name="font_weight"
                          value="bold"
                          checked={eLibraryData.font_weight === "bold"}
                          onChange={handleElibraryChange}
                        />
                      </Col>
                    </Row>
                  </Col> */}
                  {/* <Col lg={12} className="mt-2">
                    <Row>
                      <Col lg={4}>
                        <label htmlFor="font_color">Font Color</label>
                      </Col>
                      <Col lg={8}>
                        <Form.Control
                          type="color"
                          name="font_color"
                          value={eLibraryData.font_color}
                          onChange={handleElibraryChange}
                          style={{ padding: "5px", font_size: "12px" }}
                        />
                      </Col>
                    </Row>
                  </Col> */}
                </Row>

                <Row className="justify-content-center">
                  <Col md={10} className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleElibrarySubmit(configId)}
                      className="mx-auto my-3"
                    >
                      Save Configuration
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body className="p-0">
              <h5 className="p-2 bg-dark text-white rounded-top-3">
                eLibrary Color Theme
              </h5>
              <Form>
                <Row className="p-2">
                  {/* Color Picker 1 */}
                  <Col lg={12} className="mt-2">
                    <Row className="align-items-center">
                      <Col lg={6}>
                        <label>Color Picker 1</label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="color"
                          name="color1"
                          value={colorThemeData.color1}
                          onChange={handleColorThemeChange}
                        />
                      </Col>
                    </Row>
                  </Col>

                  {/* Color Picker 2 */}
                  <Col lg={12} className="mt-2">
                    <Row className="align-items-center">
                      <Col lg={6}>
                        <label>Color Picker 2</label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="color"
                          name="color2"
                          value={colorThemeData.color2}
                          onChange={handleColorThemeChange}
                        />
                      </Col>
                    </Row>
                  </Col>

                  {/* Show Banner Checkbox */}
                  <Col lg={12} className="mt-2">
                    <Form.Check
                      type="checkbox"
                      id="showBannerCheckbox"
                      label="Show Banner"
                      name="show_banner"
                      checked={colorThemeData.show_banner}
                      onChange={handleColorThemeChange}
                    />
                  </Col>

                  {/* Banner Preview */}
                  {/* {colorThemeData.show_banner && colorThemeData.upper_cover_image && (
                <Col lg={12} className="mt-2 text-center">
                  <img src={colorThemeData.upper_cover_image} alt="Banner" style={{ width: "100%", borderRadius: "5px" }} />
                </Col>
              )} */}
                </Row>

                <Row className="justify-content-center">
                  <Col md={10} className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      className="mx-auto my-3"
                      onClick={() => handleColorThemeSubmit(configId)}
                    >
                      Save Color Theme
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12} className="mt-5">
          <Card>
            <Card.Body className="p-0">
              <h5 className="p-2 bg-dark text-white rounded-top-3">
                Upper Cover Image
              </h5>
              <Form>
                <label
                  htmlFor="cover-upload"
                  className="custom-file-upload w-100"
                >
                  <div className="img-wrap w-100 img-upload">
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <img
                        src={coverPreview || coverImage || "/default-cover.png"}
                        alt="Upper Cover Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                  />
                </label>
                <Row className="justify-content-center">
                  <Col md={10} className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      className="mx-auto my-3"
                      onClick={() => handleSaveCoverImage(configId)}
                    >
                      Save Upper Cover Image
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12} className="mt-5">
          <Card>
            <Card.Body className="p-0">
              <h5 className="p-2 bg-dark text-white rounded-top-3">
                Cover Headline Configuration
              </h5>
              <Form>
                <Row className="p-2">
                  {/* Quote Font Size */}
                  <Col lg={12} className="mt-2">
                    <Row>
                      <label>First quote of cover banner</label>
                      <Col lg={12} className="mt-2">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="firstQuote"
                          placeholder="Enter first quote"
                          value={coverHeadlineData.firstQuote || ""}
                          onChange={handleCoverHeadlineChange}
                        />
                      </Col>
                    </Row>
                  </Col>

                  {/* subHeadline Font Size */}
                  <Col lg={12} className="mt-2">
                    <Row>
                      <label>subHeadline</label>
                      <Col lg={12}>
                        <Form.Control
                          as="textarea"
                          name="subHeadline"
                          value={coverHeadlineData.subHeadline || ""}
                          onChange={handleCoverHeadlineChange}
                          placeholder="Enter subHeadline"
                          rows={3} // Adjust the number of rows as needed
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col lg={12} className="mt-2">
                    <Row>
                      <Col lg={6}>
                        <label>Paragraph Font Size (in px)</label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="number"
                          name="banner_font_size"
                          placeholder="Enter font size"
                          max={18}
                          value={coverHeadlineData.banner_font_size || ""}
                          onChange={handleCoverHeadlineChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={12} className="mt-2">
                    <Row>
                      <Col lg={6}>
                        <label>First Quote Font Color</label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="color"
                          name="banner_font_color"
                          value={coverHeadlineData.banner_font_color || ""}
                          onChange={handleCoverHeadlineChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={12} className="mt-2">
                    <Row>
                      <Col lg={6}>
                        <label>Background Color of paragraph</label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="color"
                          name="background_color"
                          value={coverHeadlineData?.background_color || ""}
                          onChange={handleCoverHeadlineChange}
                        />
                        {/* <Form.Control
                          type="color"
                          name="color1"
                          value={colorThemeData.color1}
                          onChange={handleColorThemeChange}
                        /> */}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={12} className="mt-2">
                    <Row>
                      <Col lg={6}>
                        <label>Paragraph Text Color</label>
                      </Col>
                      <Col lg={6}>
                        <Form.Control
                          type="color"
                          name="banner_text_color"
                          value={coverHeadlineData.banner_text_color || ""}
                          onChange={handleCoverHeadlineChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col md={10} className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      className="mx-auto my-3"
                      onClick={() => handleCoverHeadlineSubmit(configId)}
                    >
                      Save Cover Headline
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
