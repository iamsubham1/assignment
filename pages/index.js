import dynamic from "next/dynamic";
import Link from "next/link";
import ContactForm from "../src/components/ContactForm";
import TestimonialSlider from "../src/components/TestimonialSlider";
import Layout from "../src/layout/Layout";
import { getUserInfoById } from "./api/getUserInfo";
import { useState, useEffect } from "react";

const ProjectIsotop = dynamic(() => import("../src/components/ProjectIsotop"), {
  ssr: false,
});
const Index = () => {


  //state variables
  const [userInfo, setUserInfo] = useState(null);
  const [userskills, setUserSkills] = useState(null);
  const [services, setServices] = useState(null);
  const [experience, setExperience] = useState(null);
  const [projects, setprojects] = useState(null);
  const [testimonials, setTestimonials] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);



  let sentences = [];

  // Fetch user info 
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfoById();
        setUserInfo(response.user.about);
        setUserSkills(response.user.skills)
        setServices(response.user.services);
        setExperience(response.user.timeline);
        setprojects(response.user.projects);
        setTestimonials(response.user.testimonials);
        setSocialLinks(response.user.social_handles);
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      }
    };

    fetchUserInfo();
  }, []);


  const userAbout = userInfo || {};
  const allSkills = userskills || [];
  const allServices = services || [];
  const allexperience = experience || [];
  const allProjects = projects || [];
  const allTestimonials = testimonials || [];
  const allSocialLinks = socialLinks || []



  // Split description into sentences
  if (userAbout && userAbout.description) {
    sentences = userAbout.description.split(". ");
  }
  const sortedExperienceTimeline = allexperience.sort((a, b) => a.sequence - b.sequence);

  return (
    <Layout>
      <section className="section section-started">
        <div className="container">
          {/* Hero Started */}
          <div className="hero-started">
            <div
              className="slide"
            >
              <img
                src={userAbout.avatar ? userAbout.avatar.url : "assets/images/profile.png"}
                alt="profile pic"
                style={{
                  WebkitFilter: "blur(.2px)",
                  maskImage: 'radial-gradient( black 0%, black 55%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient( black 0%, ,black 55%,transparent 100%)',
                  objectPosition: "bottom"
                }}

              />

            </div>
            <div className="content">
              <div className="titles">
                <div
                  className="subtitle"
                >
                  {userAbout.title}
                </div>
                <h2
                  className="title"
                >
                  {userAbout.name}                </h2>
              </div>
              <div
                className="description"
              >
                <p>
                  {userAbout.subTitle}
                </p>
                <div className="social-links" style={{ display: "flex", width: "60%" }}>
                  {allSocialLinks.map((socialLink, index) => (
                    socialLink.enabled && (
                      <a key={index} target="_blank" rel="noreferrer" href={socialLink.url}>
                        <img src={socialLink.image.url} alt={socialLink.platform} />
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
            <div className="info-list">
              <ul>
                <li>
                  Born in <strong>{userAbout.address}</strong>
                </li>
                <li>
                  Experience <strong>{userAbout.exp_year}</strong>
                </li>
                <li>
                  Date of Birth <strong>27 June 1992</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg section-parallax section-parallax-1"
        id="about-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              About Me
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-right">
              {/* Section numbers */}
              <div className="numbers-items">
                <div
                  className="numbers-item"
                >
                  <div className="icon">
                    <i aria-hidden="true" className="far fa-check-circle" />
                  </div>
                  <div className="num">124</div>
                  <div className="title">
                    Completed <br />
                    Project
                  </div>
                </div>
                <div
                  className="numbers-item"
                >
                  <div className="icon">
                    <i aria-hidden="true" className="far fa-smile-beam" />
                  </div>
                  <div className="num">65</div>
                  <div className="title">
                    Happy <br />
                    Clients
                  </div>
                </div>
                <div
                  className="numbers-item"
                >
                  <div className="icon">
                    <i aria-hidden="true" className="far fa-gem" />
                  </div>
                  <div className="num">18</div>
                  <div className="title">
                    Awards <br />
                    Won
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Section Profile */}
              <div className="profile-box">
                <div
                  className="text"
                >

                  {sentences.map((sentence, index) => (
                    <p key={index}>{sentence}</p>
                  ))}

                  <a
                    href="#contact-section"
                    className="btn"
                  >
                    <span>Contact Me</span>
                  </a>
                  <div
                    className="signature"
                  >
                    <img src="assets/images/signature.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-parallax section-parallax-2"
        id="resume-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              My Resume
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div
                className="text"
              >
                <p>
                  {userAbout.description}
                </p>
              </div>
              {/* Skills */}
              <div className="skills-items">
                <div
                  className="p-title"
                >
                  SKILLS
                </div>


                {allSkills.map((skill, index) => (
                  <div className="skills-item" key={index} style={{ display: 'flex', justifyContent: "space-around", alignItems: "center", }}>

                    <img src={skill.image.url} style={{ width: "5%", marginRight: "1%" }} />  <div className="name">{skill.name}
                    </div>
                    <div className={`dots dots-${skill.percentage}`}>
                      <div className="dots-row">
                        {[...Array(10)].map((_, dotIndex) => (
                          <div className="dot" key={dotIndex} />
                        ))}
                      </div>
                    </div>
                    <div className="value">
                      <span className="num">{skill.percentage}%</span>
                    </div>
                  </div>
                ))}



              </div>
              {/* Services */}


              <div
                className="p-title"
              >
                SERVICES
              </div>


              <div className="services-items">



                {allServices.map(service => (
                  <div className="services-col">
                    <div className="services-item" key={service._id} >
                      <div className="icon">
                        <img src={service.image.url} />
                      </div>

                      <div className="title">{service.name}</div>
                      <div className="text">
                        <p>{service.desc}</p>
                      </div>
                      <div className="price" style={{ fontWeight: "600", marginTop: "5%" }}>{service.charge}</div>
                      <a href="#contact-section" className="lnk">
                        order now
                      </a>
                    </div>

                  </div>
                ))}
              </div>





              {/* History */}
              <div className="history-left">
                <div className="history-items">
                  <div
                    className="p-title"
                  >
                    EDUCATION
                  </div>

                  {sortedExperienceTimeline.map(item => {
                    if (item.forEducation) {
                      return (
                        <div className="history-item" key={`${item.startDate}-${item.endDate}`}>
                          <div className="date">{item.startDate.slice(0, 4)} - {item.endDate.slice(0, 4)}</div>
                          <div className="name">{item.jobTitle}</div>
                          <div className="subname">{item.company_name}</div>
                        </div>
                      );
                    }
                    return null; // If it's not an education item, return null
                  })}

                </div>
                <div className="history-items">
                  <div
                    className="p-title"
                  >
                    AWARDS
                  </div>
                  <div
                    className="history-item"
                  >
                    <div className="date">2016 - awwwards</div>
                    <div className="name">Site of the Day</div>
                    <div className="text">
                      <p>
                        Euismod vel bibendum ultrices, fringilla vel eros, donec
                        euismod leo lectus.
                      </p>
                    </div>
                  </div>
                  <div
                    className="history-item"
                  >
                    <div className="date">2015 - designnominees</div>
                    <div className="name">Site of the Week</div>
                    <div className="text">
                      <p>
                        Euismod vel bibendum ultrices, fringilla vel eros, donec
                        euismod leo lectus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="history-right">
                <div className="history-items">
                  <div
                    className="p-title"
                  >
                    EXPERIENCE
                  </div>

                  {sortedExperienceTimeline.map(item => {
                    if (item.forEducation) {

                      return null; // We return null for items with forEducation=true to avoid rendering them here
                    } else {
                      return (
                        <div className="history-item" key={item.sequence}>
                          <div className="date" style={{ color: "#FF8059" }}>
                            {item.startDate.slice(8, 10)}/{item.startDate.slice(5, 7)}/{item.startDate.slice(0, 4)} - {item.endDate ? item.endDate.slice(8, 10) + '/' + item.endDate.slice(5, 7) + '/' + item.endDate.slice(0, 4) : 'Present'}
                          </div>
                          <div className="name">{item.company_name}</div>
                          <p style={{ marginTop: "1%", fontWeight: "500" }}>Job Title: {item.jobTitle} <br /> Location: {item.jobLocation}</p>
                          <div className="subname" style={{ marginTop: "-6%" }}>{item.summary}</div>
                        </div>
                      );
                    }
                  })}

                </div>
              </div>
              <div className="clear" />
              {/* Button CV */}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://bslthemes.site/ober/wp-content/uploads/2021/12/Jacky-Smith-Resume.pdf"
                className="btn"
              >
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg section-parallax section-parallax-5"
        id="works-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              My Projects
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div
                className="text"
              >
                <p>
                  A Collection of my favorites project I’ve designed recently.
                  Feeling great while sharing here.
                </p>
              </div>
            </div>
          </div>
          {/* Works */}
          <ProjectIsotop projects={allProjects} />
        </div>
      </section>
      <section className="section" id="pricing-section">
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              Pricing Plans
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div
                className="text"
              >
                <p>
                  Are you interested to work with me ? Here are my price list
                  for design related work. Lets talk about project !
                </p>
              </div>
            </div>
          </div>
          {/* Pricing */}
          <div className="pricing-items row">
            <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
              <div
                className="pricing-item"
              >
                <div className="title">Full Time</div>
                <div className="subtitle">Available for Full Time</div>
                <div className="price">$1200</div>
                <div className="text">
                  <ul>
                    <li>Brand Design</li>
                    <li>Advertising</li>
                    <li>Web Development</li>
                    <li>Photography</li>
                  </ul>
                </div>
                <a href="#contact-section" className="btn">
                  <span>Hire Me</span>
                </a>
              </div>
            </div>
            <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
              <div
                className="pricing-item"
              >
                <div className="title">Project Wise</div>
                <div className="subtitle">Available for Freelancing</div>
                <div className="price">$400</div>
                <div className="text">
                  <ul>
                    <li>Brand Design</li>
                    <li>Advertising</li>
                    <li>Web Development</li>
                    <li>Photography</li>
                  </ul>
                </div>
                <a href="#contact-section" className="btn">
                  <span>Hire Me</span>
                </a>
              </div>
            </div>
            <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
              <div
                className="pricing-item"
              >
                <div className="title">Hourley</div>
                <div className="subtitle">Available for Hourley Basis</div>
                <div className="price">$60</div>
                <div className="text">
                  <ul>
                    <li>Brand Design</li> <li>Advertising</li>
                    <li>Web Development</li> <li>Photography</li>
                  </ul>
                </div>
                <a href="#contact-section" className="btn">
                  <span>Hire Me</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section no-padding-top section-parallax section-parallax-4">
        <div className="container">
          {/* Testimonials */}
          <TestimonialSlider testimonials={allTestimonials} />
        </div>
      </section>
      <section className="section section-bg" id="blog-section">
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              My Blog
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div
                className="text"
              >
                <p>
                  Suspendisse potenti. Sed egestas eros eu libero posuere
                  ultrices. Nullam ut aliquet felis, sit amet imperdiet felis.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Blog */}
        <div className="blog-items">
          <div className="archive-item">
            <div className="image">
              <Link href="/blog-single">
                <a>
                  <img
                    src="assets/images/blog4.jpg"
                    alt="Usability Secrets to Create Better User Interfaces"
                  />
                </a>
              </Link>
            </div>
            <div className="desc">
              <div
                className="category"
              >
                UI Design
                <br />
                <span>November 28, 2021</span>
              </div>
              <h3
                className="title"
              >
                <Link href="/blog-single">
                  <a>Usability Secrets to Create Better User Interfaces</a>
                </Link>
              </h3>
              <div
                className="text"
              >
                <p>
                  Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                  mattis. Aliquam vel sem vel velit efficitur malesuada. Donec
                  arcu lacus, ornare eget…{" "}
                </p>
                <div className="readmore">
                  <Link href="/blog-single">
                    <a className="lnk">Read more</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="archive-item">
            <div className="image">
              <Link href="/blog-single">
                <a>
                  <img
                    src="assets/images/blog3.jpg"
                    alt="Three Ways To Level Up Your Photography"
                  />
                </a>
              </Link>
            </div>
            <div className="desc">
              <div
                className="category"
              >
                Branding
                <br />
                <span>November 28, 2021</span>
              </div>
              <h3
                className="title"
              >
                <Link href="/blog-single">
                  <a>Three Ways To Level Up Your Photography</a>
                </Link>
              </h3>
              <div
                className="text"
              >
                <p>
                  Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                  mattis. Aliquam vel sem vel velit efficitur malesuada. Donec
                  arcu lacus, ornare eget…{" "}
                </p>
                <div className="readmore">
                  <Link href="/blog-single">
                    <a className="lnk">Read more</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="archive-item">
            <div className="image">
              <Link href="/blog-single">
                <a>
                  <img
                    src="assets/images/single7.jpg"
                    alt="10 Useful Tips to Improve Your UI Designs"
                  />
                </a>
              </Link>
            </div>
            <div className="desc">
              <div
                className="category"
              >
                Photography
                <br />
                <span>November 28, 2021</span>
              </div>
              <h3
                className="title"
              >
                <Link href="/blog-single">
                  <a>10 Useful Tips to Improve Your UI Designs</a>
                </Link>
              </h3>
              <div
                className="text"
              >
                <p>
                  Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                  mattis. Aliquam vel sem vel velit efficitur malesuada. Donec
                  arcu lacus, ornare eget…
                </p>
                <div className="readmore">
                  <Link href="/blog-single">
                    <a className="lnk">Read more</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-more-link">
          <Link href="/blog">
            <a
              className="btn"
            >
              <span>View Blog</span>
            </a>
          </Link>
        </div>
      </section>
      <section className="section section-parallax section-parallax-5">
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              My Clients
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div
                className="text"
              >
                <p>
                  Suspendisse potenti. Sed egestas eros eu libero posuere
                  ultrices. Nullam ut aliquet felis, sit amet imperdiet felis.
                </p>
              </div>
            </div>
          </div>
          <div className="row clients-items">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img src="assets/images/brand1.png" alt="" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img src="assets/images/brand2.png" alt="" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img src="assets/images/brand3.png" alt="" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img src="assets/images/brand4.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </Layout>
  );
};
export default Index;
