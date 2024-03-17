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


  return (
    <Fragment>
      <div className="works-box">
        <div className="filter-links">
          <a className={`c-pointer ${activeBtn('*')}`} onClick={handleFilterKeyChange('*')} data-href=".works-col">
            All
          </a>
          <a
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
          </a>
          <a
            className={`c-pointer ${activeBtn('sorting-development')}`}
            onClick={handleFilterKeyChange('sorting-development')}
            data-href=".sorting-development"
          >
            Development
          </a>
          <a
            className={`c-pointer ${activeBtn('sorting-branding')}`}
            onClick={handleFilterKeyChange('sorting-branding')}
            data-href=".sorting-branding"
          >
            Branding
          </a>
        </div>
        <div className="works-items works-list-items row">
          {projects.slice().reverse().map((project, index) => (
            <div key={index} className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${project.category}`}>
              <div className="works-item">
                <a href={`/work-single/?project=${encodeURIComponent(JSON.stringify(project))}`} onClick={() => sendProps(project)}>
                  <a>
                    <span className="image">
                      <span className="img">
                        <img src={project.image.url} alt={project.title} />
                        <span className="overlay" />
                      </span>
                    </span>
                    <span className="desc">
                      <span className="name">{project.title}</span>
                      <span className="category">{project.category}</span>
                    </span>
                  </a>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectIsotop;
