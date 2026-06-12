# Architecture

## Overview

TypeGlitch provides a comprehensive local resilience framework by bridging the gap between static type definitions and unpredictable network realities. It functions as a declarative chaos layer that sits between your frontend application and its data source. By utilizing Mock Service Worker (MSW) under the hood, it intercepts outgoing requests and applies 'chaos schemas'—programmable disruptions that mimic real-world instability. This allows developers to toggle between stable, unstable, and catastrophic network states with a single click in a localized dashboard, ensuring that error boundaries and loading states are not just implemented, but rigorously tested against logical edge cases.

Furthermore, TypeGlitch leverages Zod-powered introspection to inject subtle logical corruption into response bodies. Unlike generic failure tools that simply drop packets or return 500 errors, TypeGlitch can return payloads that are technically valid according to your TypeScript interfaces but semantically problematic, such as unexpected nulls, maximum-length strings, or out-of-order array elements. This ensures your application is resilient to the nuances of data integrity software, moving beyond binary success/failure testing into the realm of true runtime reliability.

## System design

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

## Design principles

- **Small core, composable surface** — keep the default install lean; ship extensions as opt-in packages.
- **Type-safety end-to-end** — TypeScript on both sides, generated types where possible.
- **Built in public** — every architectural decision lands as a tracked issue or ADR before it ships.
- **Friendly to first-time contributors** — surface area for new contributors is treated as a first-class feature.

## Trade-offs and open questions

We track in-flight design decisions as GitHub issues labelled `proposal`. If you see something here that does not match the code, open an issue — the code is the source of truth, and docs lag are bugs.
