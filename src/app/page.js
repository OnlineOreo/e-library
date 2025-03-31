"use client";

import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstituteId } from "./../redux/slices/instituteSlice";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./Component/landing-page/Navbar";
import '../../public/landingPageAsset/css/style2.css';
import '../../public/landingPageAsset/css/header.css';
import Banner from "./Component/landing-page/Banner";
import Publisher from "./Component/landing-page/Publisher";
import NoticeBoard from "./Component/landing-page/NoticeBoard";
import AboutUs from "./Component/landing-page/AboutUs";
import TrendingBook from "./Component/landing-page/TrendingBook";
import StaffPick from "./Component/landing-page/StaffPick";
import Download from "./Component/landing-page/Download";
import TopUser from "./Component/landing-page/TopUser";
import Footer from "./Component/landing-page/Footer";
import Headline from "./Component/landing-page/(Headlines)/Headline";

export default function Home() {
  const dispatch = useDispatch();
  const instituteId = useSelector((state) => state.institute.instituteId);
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const status = useSelector((state) => state.institute.status);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInstituteId());
    }else{
      setLoading(false);
    }
  }, [dispatch, status]);

  if(loading){
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#fffbfb78",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur eaque consequatur repellat voluptas, similique maiores sequi quos facere aliquid reprehenderit nesciunt nobis? Corporis consequuntur eveniet animi, autem, ipsam facere mollitia reprehenderit ducimus commodi deleniti ratione impedit ad, molestias deserunt? Voluptate, cumque molestias sed, omnis neque magni doloribus, porro quod recusandae dignissimos similique quibusdam nobis enim? Voluptatibus sunt, ducimus molestiae nesciunt incidunt ab optio ullam corrupti maxime similique repellat accusamus dolor nulla facere, eveniet quas dolore sed. Eum ex, nihil soluta vero reiciendis dicta iure similique perspiciatis impedit id non, quibusdam ullam. Consequuntur, officiis? Cupiditate sit laboriosam quia nemo possimus nihil quaerat ea molestiae doloribus voluptatem deleniti eius voluptatibus iure pariatur unde molestias odio, culpa, sapiente a. Ipsa mollitia ex natus adipisci, maiores doloribus accusamus non sint consectetur porro quas ipsam tempora quia, nulla dolor saepe nesciunt unde ab, repudiandae earum similique quidem assumenda. Voluptates at omnis, deserunt aperiam, adipisci nostrum temporibus fugiat optio aliquid repellat illum, minima ipsa. Dolorum, nostrum aut temporibus ratione earum totam unde recusandae ullam impedit mollitia voluptatum molestias, nemo non repudiandae molestiae corporis veritatis? Aliquid tempore modi nihil, sint libero accusantium atque voluptates ipsam, hic exercitationem iste, consequuntur reprehenderit illum rerum eos aperiam tenetur nulla officiis....</span>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.page}>
      <div id="main_widget_section">
        <Navbar/>
        <Banner bannerData={landingPageData?.instituteId?.configurations[0]} />
        <Publisher /> 
        <NoticeBoard />
        {/* <AboutUs /> */}
        <TrendingBook />
        <StaffPick />
        <Headline/>
        <Download />
        <TopUser />
        <Footer />
      </div>
    </div>
  );
}
