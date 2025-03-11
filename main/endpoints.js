const endpoints = {
  features: {
    contents: {
      urls: {
        contenstCreate: "/contents",
        contenstL: "/contents?fullType=L&searchBy",
        contentsDES: "/contents?fullType=DES&lDestiny={destiniId}",
        contentsListEXTRA: "/contents?fullType=EXTRA",
        CotensLike: "/contents",
      },
    },
    surveys: {
      urls: {
        surveysAnswers: "/answers",
        surveysCreate: "/surveys",
        surveysL: "/surveys?fullType=L",
        surveysDES: "/surveys?fullType=DES&lDestiny={destiniId}",
        surveysExtra: "/surveys?fullType=EXTRA",
        surveysDET: `/surveys?page=1&perPage=1&searchBy=17&fullType=DET&extraData=1&metric=1&soption_id&squestion_id=23`,
        surveysUpdate: "/surveys/1",
      },
    },
    events: {
      urls: {
        eventsCreate: "/events",
        eventsList: "/events?fullType=L&perPage=-1",
        eventsCE: "/events?perPage=-1&fullType=CE",
        eventsExtra: "/events?fullType=EXTRA&perPage=-1&page=1",
        eventProcessMedal: "/events-processMedal",
        eventDET: "/events?searchBy=1&fullType=DET",
      },
    },
    activitys: {
      urls: {
        activitysCreate: "/activities",
        activitiesL: "/activities?fullType=L",
      },
    },
    affiliate : {
      urls: {
        affiliatePreregisterRed:"/pre-register",
        affiliatesLogin:"/aff-login"
      }
    }
  },
};

export default endpoints;
