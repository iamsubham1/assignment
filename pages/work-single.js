import Layout from "../src/layout/Layout";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const WorkSingleIsotope = dynamic(
  () => import("../src/components/WorkSingleIsotope"),
  {
    ssr: false,
  }
);

const WorkSingle = () => {

  const router = useRouter();
  const { project } = router.query;

  let clickedProject = null;
  try {
    if (project) {
      clickedProject = JSON.parse(decodeURIComponent(project));
    }
  } catch (error) {
    console.error("Error parsing project JSON:", error);
  }

  console.log("Clicked Project:", clickedProject);
  console.log("Router query:", router.query);


  const {
    title = "",
    description = "",
    techStack = [],
    image = {},
    githuburl = "",
    year = "",
    categories = "",
    liveurl = ""
  } = clickedProject || {};


  const [videoToggle, setVideoToggle] = useState(false);
  return (
    <Layout extraWrapClass={"project-single"}>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* titles */}
              <div className="h-titles">
                <h1
                  className="h-title"
                >
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Details */}
      <section className="section section-inner details">
        <div className="container">
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              <div className="m-details">
                <div className="details-label">
                  <span>Year</span>
                  <strong>{year ? year : "xx-xx-xx"}</strong>
                </div>
                <div className="details-label">
                  <span>Technology</span>
                  <strong>{techStack}</strong>
                </div>
                <div className="details-label">
                  <span>Categories</span>
                  <strong>
                    {categories ? categories : "Unknown"}
                  </strong>
                </div>
                <div className="details-label">
                  <span>Github-url</span>
                  <strong>
                    {githuburl ? githuburl : "Unknown"}
                  </strong>
                </div>
                <div className="details-label">
                  <span>Live-url</span>
                  <strong>
                    {liveurl ? liveurl : "Unknown"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Image Large */}
      <section
        className="m-image-large"
      >
        <div className="image">
          <div
            className="img js-parallax"
            style={{ backgroundImage: `url(${image.url})` }}
          />
        </div>
      </section>
      {/* Description */}
      <section className="section section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div
                className="p-title"
              >
                Project Goal
              </div>
              <div
                className="text"
              >
                {description ? description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Gallery */}
      <section className="section section-inner">
        <div className="container">
          <WorkSingleIsotope />
        </div>
      </section>
      {/* Description */}
      <section className="section section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div
                className="p-title"
              >
                Project Goal
              </div>
              <div
                className="text"
              >
                <p>
                  Aliquam a sapien diam. Phasellus pulvinar tellus aliquam
                  eleifend consectetur. Sed bibendum leo quis rutrum
                  aliquetmorbi.
                </p>
                <p>
                  Donec imperdiet risus at tortor consequat maximus et eget
                  magna. Cras ornare sagittis augue, id sollicitudin justo
                  tristique ut. Nullam ex enim, euismod vel bibendum ultrices,
                  fringilla vel eros. Donec euismod leo lectus, et euismod metus
                  euismod sed. Quisque quis suscipit ipsum, at pellentesque
                  velit. Duis a congue sem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video */}
      <section className="m-video-large">
        <div className={`video ${videoToggle ? "active" : ""}`}>
          <div
            className="img js-parallax"
            style={{ backgroundImage: "url(assets/images/blog9.jpg)" }}
          />
          <iframe
            className="js-video-iframe"
            src="https://www.youtube.com/embed/Gu6z6kIukgg?showinfo=0&rel=0&autoplay=0"
          />
          <div className="play" onClick={() => setVideoToggle(true)} />
        </div>
      </section>
      {/* Navigation */}
      <section className="m-page-navigation">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles h-navs">
                <Link href="/work-single">
                  <a>
                    <span
                      className="nav-arrow"
                    >
                      Next Project
                    </span>
                    <span
                      className="h-title"
                    >
                      Kana
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default WorkSingle;
