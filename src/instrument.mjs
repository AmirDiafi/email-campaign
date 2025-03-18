// @ts-ignore
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: 'https://44a739a4beb0cdda4fce0e6ce7b830a2@o4506302895292416.ingest.us.sentry.io/4508998974308352',
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
