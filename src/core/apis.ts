const apis = {
  auth: {
    signIn: 'auth/sign-in',
    signUp: 'auth/sign-up',
  },
  date: {
    today: 'date/today',
    year: 'date/year',
    month: 'date/month',
    date: 'date/date',
  },
  common: {
    mediaSlider: {
      list: 'media-slider/list',
    },
    ourServices: {
      list: 'our-services/list',
    },
    contactUs: {
      post: 'contact-us/post',
    },
    businessPartner: {
      list: 'business-partner/list',
    },
    ourClients: {
      list: 'our-clients/list',
    },
    directorBoard: {
      list: 'director-board/list',
    },
    events: {
      list: 'events/list',
      get: 'events/get',
      join: 'events/join',
    },
    training: {
      annualUpcomingYear: 'training/annual-upcoming-year',
      loadAllSettings: 'training/load-all-settings',
    },
    courses: {
      list: 'courses/list',
      get: 'courses/get',
      join: 'courses/join',
    },
    prevSponsors: {
      list: 'prev-sponsors/list',
    },
    myaccount: {
      load: 'myaccount/load',
      save: 'myaccount/save',
      changePassword: 'myaccount/change-password',
    },
  },
};

export {
  apis,
};
