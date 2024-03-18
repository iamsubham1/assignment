import React from 'react';
import Isotope from 'isotope-layout';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';

const ProjectIsotop = ({ projects }) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState('*');

  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope('.works-items', {
        itemSelector: '.works-col',
        percentPosition: true,
        masonry: {
          columnWidth: '.works-col',
        },
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false,
        },
      });
    }, 1000);
    // return () => isotope.current.destroy();
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === '*'
        ? isotope.current.arrange({ filter: '*' })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? 'active' : '');



  const router = useRouter();

  const sendProps = (project) => {
    router.push({
      pathname: "/work-single",
      query: { project: JSON.stringify(project) }
    });
  };

  console.log(projects);

  return (
    <Fragment>
      <div className="works-box">
        <div className="filter-links">
          <a className={`c-pointer ${activeBtn('*')}`} onClick={handleFilterKeyChange('*')} data-href=".works-col">
            All
          </a>
          {/* <a
            className={`c-pointer ${activeBtn('sorting-ui-ux-design')}`}
            onClick={handleFilterKeyChange('sorting-ui-ux-design')}
            data-href=".sorting-ui-ux-design"
          >
            UI UX Design
          </a>
          <a
            className={`c-pointer ${activeBtn('sorting-photo')}`}
            onClick={handleFilterKeyChange('sorting-photo')}
            data-href=".sorting-photo"
          >
            Photography
          </a> */}
          <a
            className={`c-pointer ${activeBtn('sorting-development')}`}
            onClick={handleFilterKeyChange('next')}
            data-href=".next"
          >
            Next.js          </a>
          <a
            className={`c-pointer ${activeBtn('sorting-branding')}`}
            onClick={handleFilterKeyChange('mern')}
            data-href=".mern"
          >
            MERN
          </a>
        </div>
        <div className="works-items works-list-items row">
          {projects.slice().reverse().map((project, index) => {
            const filter = index % 2 === 0 ? 'mern' : 'next';

            return (
              <div key={index} className={`works-col col-xs-12 col-sm-6 col-md-6 col-lg-6 ${filter}`}>
                <div className="works-item">
                  <a href={`/work-single/?project=${encodeURIComponent(JSON.stringify(project))}`} onClick={() => sendProps(project)}>
                    <span className="image" style={{ width: "100%" }}>
                      <span className="img">
                        <img src={project.image.url} alt={project.title} style={{ objectFit: "contain" }} />
                        <span className="overlay" />
                      </span>
                      <h1 className='projectTitle'>{project.title}</h1>
                      <div style={{ display: "flex", gap: "3%", }}>
                        {project.techStack.map((tech, index) => (
                          <h5 key={index} style={{ fontFamily: "sans-serif", marginTop: "-5%", fontWeight: "500", color: "#FF8059", fontSize: ".9rem" }}>{tech}</h5>

                        ))}
                      </div>
                    </span>

                  </a>


                </div>
              </div>
            )
          })}
        </div>


      </div>
    </Fragment>
  );
};

export default ProjectIsotop;
