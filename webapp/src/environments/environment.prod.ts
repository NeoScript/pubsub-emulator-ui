import 'angular-server-side-configuration/process';

export const environment = {
  production: true,
  pubsubEmulatorHost: process.env['PUBSUB_EMULATOR_HOST'] ?? "http://localhost:8681"
};
