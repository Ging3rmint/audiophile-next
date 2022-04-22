import Head from "next/head";

import Header from "@/components/organisms/Header";
import Footer from "@/components//organisms/Footer";

interface PropTypes {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
  pathName?: string;
  dark?: boolean;
}

const BaseLayout: React.FC<PropTypes> = ({
  title,
  description,
  keywords,
  children,
  pathName,
  dark,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header pathName={pathName} darkMode={dark} />
      {children}
      <Footer pathName={pathName} />
    </div>
  );
};

export default BaseLayout;

BaseLayout.defaultProps = {
  title: "audiophile | Home",
  description: "Find the latest audio devices!",
  keywords: "headphones, earphones, audio, speakers",
};
