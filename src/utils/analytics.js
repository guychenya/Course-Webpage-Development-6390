// Analytics utility functions
export const trackEvent = (eventName, properties = {}) => {
  // In production, this would integrate with analytics services like Google Analytics, Mixpanel, etc.
  const event = {
    name: eventName,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('userId'),
      sessionId: getSessionId(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }
  };
  
  // Store locally for demo purposes
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  events.push(event);
  localStorage.setItem('analytics_events', JSON.stringify(events));
  
  console.log('Analytics Event:', event);
};

export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export const getAnalyticsData = () => {
  return JSON.parse(localStorage.getItem('analytics_events') || '[]');
};

export const clearAnalyticsData = () => {
  localStorage.removeItem('analytics_events');
};

// Course progress tracking
export const trackCourseProgress = (moduleId, lessonId, progress) => {
  trackEvent('course_progress', {
    moduleId,
    lessonId,
    progress,
    category: 'learning'
  });
};

// User engagement tracking
export const trackEngagement = (action, element, duration = null) => {
  trackEvent('user_engagement', {
    action,
    element,
    duration,
    category: 'engagement'
  });
};

// Performance tracking
export const trackPerformance = (metric, value, context = {}) => {
  trackEvent('performance', {
    metric,
    value,
    context,
    category: 'performance'
  });
};