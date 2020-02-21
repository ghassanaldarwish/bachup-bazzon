import React from 'react';
//import SeoManster from '../../SeoManster/SeoManster';
// import ErrorBound from '../../ErrorBound/ErrorBound';
// import Footer from '../../footer/Footer';
// import MainNavbar from '../../navbar/MainNavbar';
//import axios from 'axios';
//import Template from '../../template/Template';
//import { initGA, logPageView } from '../../googleAnalytics/googleAnalytics';

// import 'semantic-ui-css/semantic.min.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'react-quill/dist/quill.snow.css';
// import '../../globalStyles/styles.css';

const Index = ({ page }) => {
  // useEffect(() => {
  //     if (!window.GA_INITIALIZED) {
  //         initGA();
  //         window.GA_INITIALIZED = true;
  //     }
  //     logPageView();
  // }, []);

  console.log('page ==> ', page);
  return (
    <>
      <div>{page.title}</div>
      {/* {page && (
                <SeoManster
                    title={page.title}
                    description={page.description}
                    frontendURL={frontendURL}
                    asPath={asPath}
                />
            )} */}

      {/* <ErrorBound>
        <MainNavbar /> */}

      {/* <div className="divAppPage">
                    <main className="">
                        {!!page &&
                            !!page.options &&
                            page.options.map(
                                (template, index) =>
                                    !!template && !!template.template && <Template key={index} {...template} />,
                            )}
                    </main>
                </div> */}

      {/* <Footer />
      </ErrorBound> */}
    </>
  );
};

Index.getInitialProps = async function(context) {
  const { query } = context;
  let page = query;
  console.log('query ==> ', query);
  return { page };
};

export default Index;
