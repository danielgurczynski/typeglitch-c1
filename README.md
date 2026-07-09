# TypeGlitch

> A TypeScript-first chaos engineering library for mocking unpredictable API behaviors.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-active-brightgreen)](#roadmap)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](./CONTRIBUTING.md)
[![Built in public](https://img.shields.io/badge/built%20in%20public-90%20day%20cycle-8a2be2)](#roadmap)

TypeGlitch is a development-time proxy and interceptor that introduces managed volatility into your network layer. It allows developers to define 'chaos schemas' that simulate race conditions, partial payloads, and latency spikes specifically tailored to their existing TypeScript types.

<!-- progress -->
_Day 20/90 — Introduces a 'Silent Fail' glitch mode. When enabled, this mode has a configurable probability of returning a `200 OK` status with an empty response body, simulating APIs that succeed at the transport layer but fail to provide data._
<!-- /progress -->

## Table of contents

- [The problem](#the-problem)
- [Why now](#why-now)
- [The solution](#the-solution)
- [What makes it different](#what-makes-it-different)
- [Who it's for](#who-its-for)
- [Use cases](#use-cases)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Roadmap](#roadmap)
- [Success metrics](#success-metrics)
- [Get involved](#get-involved)
- [License](#license)

## The problem

While tools like MSW handle static mocking and AWS Fault Injection Simulator handles production infrastructure, there is a gap in the local development workflow for simulating 'unhappy paths' at the application logic level. Developers often write code for perfect network conditions, leading to UI crashes when real-world APIs return 400ms lag, out-of-order responses, or payloads that technically match the interface but contain edge-case data. Current solutions require manual, repetitive code changes to test these failure states.

## Why now

Modern web applications have become increasingly dependent on complex microservices and third-party APIs, yet developer environments remain dangerously idealized. As we shift toward TypeScript-heavy architectures, there is a false sense of security provided by static typing that does not account for runtime volatility such as high-latency backends or inconsistent payload delivery. Current reliability engineering tools are often trapped in the production phase, making the cost of fixing architectural oversights significantly higher than if they were caught during initial development cycles.

## The solution

TypeGlitch provides a comprehensive local resilience framework by bridging the gap between static type definitions and unpredictable network realities. It functions as a declarative chaos layer that sits between your frontend application and its data source. By utilizing Mock Service Worker (MSW) under the hood, it intercepts outgoing requests and applies 'chaos schemas'—programmable disruptions that mimic real-world instability. This allows developers to toggle between stable, unstable, and catastrophic network states with a single click in a localized dashboard, ensuring that error boundaries and loading states are not just implemented, but rigorously tested against logical edge cases.

Furthermore, TypeGlitch leverages Zod-powered introspection to inject subtle logical corruption into response bodies. Unlike generic failure tools that simply drop packets or return 500 errors, TypeGlitch can return payloads that are technically valid according to your TypeScript interfaces but semantically problematic, such as unexpected nulls, maximum-length strings, or out-of-order array elements. This ensures your application is resilient to the nuances of data integrity software, moving beyond binary success/failure testing into the realm of true runtime reliability.

## What makes it different

Unlike standard mock servers, TypeGlitch uses TypeScript introspection to automatically generate 'logical corruption'—data that remains valid to the type system but breaks application assumptions (e.g., an empty string where a name is expected, or an unconventional date format). It integrates as a Vite plugin or a Node.js wrapper to toggle chaos modes via a browser-based dashboard without restarting the dev server.

**Compared to existing tools:**

- Type-Aware Data Corruption: Unlike generic proxies, it uses TypeScript metadata to create valid but logically challenging edge-case data.
- No-Restart Hot Swapping: Use a browser dashboard to change network conditions instantly without refreshing the page or restarting Vite.
- Semantic Fault Injection: Focuses on application-layer logic errors rather than just transport-layer infrastructure failures.
- Zero-Configuration Discovery: Automatically identifies existing MSW handlers and enhances them with chaos capabilities.

## Who it's for

- Frontend Engineers looking to verify the robustness of their UI error boundaries and skeleton loaders.
- Full-stack Developers who need to simulate backend race conditions without modifying database state.
- QA Engineers performing exploratory testing on client-side state management systems under stress.
- Architects designing high-availability web applications that must remain functional during partial service outages.

## Use cases

### Skeleton State Validation

Simulate a 5-second variable latency on a specific API endpoint to ensure UI loaders display correctly and do not flicker.

### Race Condition Debugging

Configure the interceptor to return the second of two rapid API calls before the first to test asynchronous state handling.

### Semantic Edge Case Testing

Automatically populate required string fields with 5,000 characters to test layout overflow and text-wrapping logic.

## Architecture

The TypeGlitch architecture is built on a decoupled, three-tier system: the Interceptor Core, the Chaos Engine, and the Orchestration Dashboard. The Interceptor Core utilizes the MSW library to capture network traffic at the service worker level, preventing the need for complex proxy configurations. Once a request is intercepted, it is handed off to the Chaos Engine, which consults the active chaos schema. This engine uses a combination of custom middleware and Zod schema synthesis to apply transformations. It calculates latency based on a probability distribution and mutates response payloads using TypeScript-aware generators that ensure the output still technically satisfies the user's interface definitions while maximizing logical stress. 

Control of these disruptions is managed through a lightweight React-based dashboard that communicates with a Node.js sidecar process via WebSockets. This enables hot-swapping chaos configurations—such as shifting from a 'Mobile 3G Latency' profile to a 'Server Overload' profile—without requiring a rebuild or a refresh of the host application. The entire stack is optimized for the Vite ecosystem, acting as a plugin that seamlessly injects the necessary hooks into the development environment while remaining completely absent from the production build, maintaining a zero-footprint impact on end-user performance.

## Tech stack

- TypeScript
- Node.js
- Zod
- MSW (Mock Service Worker)
- React
- Zustand
- Vite

## Roadmap

A 12-week build cycle, shipped one small commit at a time, fully in public.

### Week 1 — Project Scaffold & Interceptor Core

- [ ] Initialize mono-repo
- [ ] Set up basic MSW-based network interceptor
- [ ] Define the core 'ChaosSchema' interface

### Week 2 — Latency & Jitter Engines

- [ ] Implement programmable delay logic
- [ ] Create jitter algorithms (Gaussian/Uniform distributions)
- [ ] Add support for 'Hanging connections'

### Week 3 — Status Code Randomizer

- [ ] Build probability-based HTTP status error injection
- [ ] Implement 'Silent Fail' mode (200 OK with empty body)

### Week 4 — Type-Safe Data Corruption

- [ ] Integrate Zod for payload inspection
- [ ] Create 'fuzzing' generators that respect TS interfaces

### Week 5 — The Control Dashboard (UI)

- [ ] Build a lightweight React-based floating dev-tool UI
- [ ] Connect UI to the interceptor via WebSockets

### Week 6 — Middleware Integration

- [ ] Create Express/Koa middleware wrappers
- [ ] Build a Vite plugin for seamless frontend auto-injection

### Week 7 — Scenario Persistance

- [ ] Implement JSON-based 'Chaos Profiles'
- [ ] Enable sharing of failure scenarios via URL/Config files

### Week 8 — Race Condition Simulator

- [ ] Implement response re-ordering logic
- [ ] Create 'Rapid Fire' mode to test idempotency

### Week 9 — Stateful Failures

- [ ] Add 'n-th request' failure triggers
- [ ] Create 'Circuit Breaker' simulation mode

### Week 10 — Documentation & Recipes

- [ ] Write comprehensive documentation
- [ ] Create a 'Gallery of Disasters' (preset common API failures)

### Week 11 — Performance Tuning & Logging

- [ ] Minimize interceptor overhead
- [ ] Add 'Chaos Logs' to track which mutations were applied

### Week 12 — V1.0 Launch

- [ ] Finalize NPM package packaging
- [ ] Publish landing page
- [ ] Gather initial community feedback

## Success metrics

- 30% reduction in production 'Undefined' type errors caused by unexpected API payload shapes.
- Consistent adoption within development teams, measured by a 50% increase in unit tests covering 'unhappy path' scenarios.
- Significant decrease in mean-time-to-detection (MTTD) for network-related UI bugs during the local development phase.
- Zero reported instances of chaos-related code leaking into production bundles due to the Vite-specific build-time stripping.

## Get involved

This project is built in public, one small commit a day. The community is the point.

- Browse [`good first issue`](https://github.com/danielgurczynski/typeglitch-c1/labels/good%20first%20issue) for scoped starter tasks
- Browse [`help wanted`](https://github.com/danielgurczynski/typeglitch-c1/labels/help%20wanted) for bigger pieces
- Open an issue with the **Proposal** template to discuss new ideas before writing code
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) before your first PR

## License

MIT © 2026 danielgurczynski
