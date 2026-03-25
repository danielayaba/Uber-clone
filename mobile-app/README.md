# Mobile Apps Workspace

This directory contains the React Native + TypeScript apps for the ride-hailing platform.

## Structure 

- `/rider`: The rider application (React Native CLI/Expo setup)
- `/driver`: The driver application (React Native CLI/Expo setup)

Both apps connect to the NestJS backend via:
- REST APIs on `http://localhost:3000`
- Socket.IO WebSockets on `ws://localhost:3000` for real-time location.
