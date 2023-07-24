export const roots = {
  auth: {
    login: '/users/sign_in',
    signup: '/candidates/signup',
    uploadcv: '/candidates/uploadcv',
    upLoadImage: '/candidates/uploadimage',
    countries: '/countries',
    getUserData: '/get-user-data',
    forgetPassword: '/forget-password',
  },
  home: {
    globalBarSearch: '/users/global-bar-search',
    hiring_by_area: '/companys/hiring_by_area',
    job_recommended_for_you: '/job_offers/job_recommended_for_you',
    job_offers: '/job_offers',
    job_offers_search: '/job_offers/search',
    apply_for_job: '/job_applications/apply_for_job',
    profile: '/candidates/profile',
    resume: '/resumes/add_resume',
    edit_resume: '/resumes/update_resume',
    getResume: '/resumes/get_resume_by_candidate',
    interview: '/interviews/filter_interviews_by_candidate',
    detailsInterView: '/interviews/interview_detail',
    notification: '/notifications/mobile',
    applyJob: "/job_applications/apply_for_job",
    getListQuestionByJobOffer: "/job_offers/get_list_question_by_job_offer"
  },
  profile: {
    editProfile: '/candidates/update_profile',
    addEditEducation: '/educations',
    deleteEducation: '/educations',
    addCertification: '/certificates/by_candidate',
    editCertification: '/certificates',
    deleteCertification: '/certificates',
    addEditExperience: '/professional_experiences',
    deleteExperience: '/professional_experiences',
    addLanguage: '/languages/create_by_candidate',
    editLanguage: '/languages/updateLanguageByCandidate',
    byCandidate: '/by_candidate',
    deleteLanguage: '/languages/deleteLanguageByCandidate',
    getSkills: '/skills',
    getLanguages: '/languages/list',
    degreeNameEducation: '/degree_name_educations',
    // getLanguages: '/languages/list_languages',
    editResume: '/resumes/update_resume',
    getResume: '/resumes/get_resume_by_candidate',
    addResume: '/resumes/add_resume',
    getCompanies: '/companys',

  },
  scheduler: {
    events: '/events'
  }
}
