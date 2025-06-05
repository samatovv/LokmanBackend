// frontend/next-seo.config.ts
const defaultSEO = {
    title: 'SigmaMed — Онлайн магащин для медицинских оборудований',
    description: 'Широкий выбор медицинского оборудования: тонометры, ингаляторы, стерилизаторы и др. в SigmaMed',
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: 'https://sigmamedtrade.kg/',
      site_name: 'SigmaMed',
      images: [
        {
          url: 'https://sigmamedtrade.kg/og-image.jpg',
          width: 800,
          height: 600,
          alt: 'SigmaMed',
        },
      ],
    },
  };
  
  export default defaultSEO;
  