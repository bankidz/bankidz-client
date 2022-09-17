const queryKeys = {
  /** apple-controller */
  APPLE_LOGIN: '/apple/login',
  APPLE_REVOKE: '/apple/revoke',
  /** challenge-controller */
  WALKING_DONGILS: '/challenge/?status=walking', // CHALLENGE: '/challenge'
  PENDING_DONGILS: '/challenge/?status=pending', // CHALLENGE: '/challenge'
  CHALLENGE_ACHIEVED: '/challenge/achieved',
  CHALLENGE_KID: '/challenge/kid',
  CHALLENGE_KID_ACHIEVED: '/challenge/kid/achieved',
  CHALLENGE_KID_PROGRESS: '/challenge/kid/progress',
  KID_SUMMARY: '/challenge/progress', // CHALLENGE_PROGRESS: '/challenge/progress',
  /** family-controller */
  FAMILY: '/family',
  FAMILY_KID: '/family_kid',
  /** health-check-controller */
  HEALTH: '/health',
  /** notice-controller */
  NOTICE: '/notice',
  /** notification-controller */
  NOTIFICATION: '/notification',
  NOTIFICATION_IS_READ: '/notification_isRead',
  /** s-3-controller */
  S3_URL: '/s3/url',
  /** user-controller */
  USER: '/user',
  USER_OPTIN: '/user_optIn',
};

export default queryKeys;
